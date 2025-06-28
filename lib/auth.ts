import { supabase } from "./supabase"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
}

export async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    console.log("🚀 SIMPLE SIGNUP - NO EMAIL CONFIRMATION")

    const cleanEmail = email.toLowerCase().trim()
    const cleanName = name.trim()

    // Step 1: Try to create auth user (ignore email confirmation)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { name: cleanName },
      },
    })

    console.log("Auth signup result:", {
      hasUser: !!authData.user,
      hasSession: !!authData.session,
      error: authError?.message,
    })

    // If user already exists, try to sign them in instead
    if (authError?.message?.includes("already registered")) {
      console.log("User exists, trying to sign in...")
      return await signIn(cleanEmail, password)
    }

    if (authError) {
      console.error("Signup error:", authError.message)
      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      return { user: null, error: "Failed to create account" }
    }

    // Step 2: Create user profile immediately
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .upsert({
        id: authData.user.id,
        email: cleanEmail,
        name: cleanName,
        role: "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (profileError) {
      console.error("Profile creation error:", profileError.message)
      // Try to get existing profile
      const { data: existingProfile } = await supabase.from("users").select("*").eq("id", authData.user.id).single()

      if (existingProfile) {
        console.log("Using existing profile")
        const user: AuthUser = {
          id: existingProfile.id,
          name: existingProfile.name,
          email: existingProfile.email,
          role: existingProfile.role,
          avatar: existingProfile.avatar_url,
        }
        return { user, error: null }
      }
      return { user: null, error: "Failed to create profile" }
    }

    // Step 3: Force sign in immediately (bypass email confirmation)
    if (!authData.session) {
      console.log("No session, forcing immediate sign in...")
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })

      if (signInError) {
        console.log("Auto sign-in failed, but account created:", signInError.message)
      } else {
        console.log("Auto sign-in successful!")
      }
    }

    const user: AuthUser = {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      role: profileData.role,
      avatar: profileData.avatar_url,
    }

    console.log("✅ SIGNUP SUCCESS:", user.name)
    return { user, error: null }
  } catch (error: any) {
    console.error("💥 SIGNUP ERROR:", error.message)
    return { user: null, error: error.message || "Registration failed" }
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    console.log("🔐 SIMPLE LOGIN - NO EMAIL CONFIRMATION CHECK")

    const cleanEmail = email.toLowerCase().trim()

    // Step 1: Try normal sign in first
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

    console.log("Login attempt result:", {
      hasUser: !!authData.user,
      hasSession: !!authData.session,
      error: authError?.message,
    })

    // Handle email confirmation errors by ignoring them
    if (authError) {
      if (authError.message.includes("Email not confirmed") || authError.message.includes("email_not_confirmed")) {
        console.log("Email not confirmed - trying alternative approach...")

        // Try to sign up again (this will create session even if user exists)
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        })

        if (signUpData.user && !signUpError) {
          console.log("Alternative login successful!")
          // Get or create profile
          let { data: profileData } = await supabase.from("users").select("*").eq("email", cleanEmail).single()

          if (!profileData) {
            const { data: newProfile } = await supabase
              .from("users")
              .upsert({
                id: signUpData.user.id,
                email: cleanEmail,
                name: signUpData.user.user_metadata?.name || "User",
                role: "user",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .select()
              .single()
            profileData = newProfile
          }

          if (profileData) {
            const user: AuthUser = {
              id: profileData.id,
              name: profileData.name,
              email: profileData.email,
              role: profileData.role,
              avatar: profileData.avatar_url,
            }
            console.log("✅ LOGIN SUCCESS (alternative):", user.name)
            return { user, error: null }
          }
        }
      }

      // Handle other auth errors
      if (authError.message.includes("Invalid login credentials")) {
        return { user: null, error: "Invalid email or password" }
      }

      console.error("Login error:", authError.message)
      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      return { user: null, error: "Login failed" }
    }

    // Step 2: Get or create user profile
    let { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (profileError || !profileData) {
      console.log("Creating missing profile...")
      const { data: newProfile, error: createError } = await supabase
        .from("users")
        .upsert({
          id: authData.user.id,
          email: authData.user.email || cleanEmail,
          name: authData.user.user_metadata?.name || "User",
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (createError || !newProfile) {
        console.error("Failed to create profile:", createError?.message)
        return { user: null, error: "Failed to load profile" }
      }
      profileData = newProfile
    }

    // Update last login
    await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", authData.user.id)

    const user: AuthUser = {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      role: profileData.role,
      avatar: profileData.avatar_url,
    }

    console.log("✅ LOGIN SUCCESS:", user.name)
    return { user, error: null }
  } catch (error: any) {
    console.error("💥 LOGIN ERROR:", error.message)
    return { user: null, error: error.message || "Login failed" }
  }
}

export async function signOut(): Promise<void> {
  try {
    console.log("👋 Signing out...")
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    console.log("✅ Signed out successfully")
  } catch (error) {
    console.error("Signout error:", error)
    throw error
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    if (!authUser) return null

    const { data: userData, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

    if (error || !userData) return null

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar_url,
    }
  } catch (error) {
    return null
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const user = await getCurrentUser()
      callback(user)
    } else {
      callback(null)
    }
  })
}
