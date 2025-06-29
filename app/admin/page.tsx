import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import { getCurrentUser } from "@/lib/auth"

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}
