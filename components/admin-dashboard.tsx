"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Upload, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [stats] = useState({
    totalMovies: 339,
    totalUsers: 1250,
    totalViews: 45678,
    totalDownloads: 12345,
  })

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Movies</CardTitle>
            <BarChart3 className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalMovies}</div>
            <p className="text-xs text-gray-400">+12 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-400">+180 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-gray-400">+2.1k from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Downloads</CardTitle>
            <Upload className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-gray-400">+573 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="movies" className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-700">
          <TabsTrigger value="movies" className="data-[state=active]:bg-red-600">
            Movies
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-red-600">
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-red-600">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="movies" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Movie Management</h2>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Movie
            </Button>
          </div>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Movies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Skincare (2024)", status: "Published", views: "125K" },
                  { title: "Trap (2024)", status: "Published", views: "234K" },
                  { title: "Inside Out 2 (2024)", status: "Published", views: "456K" },
                ].map((movie, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-medium text-white">{movie.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="border-green-600 text-green-400">
                          {movie.status}
                        </Badge>
                        <span className="text-sm text-gray-400">{movie.views} views</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <p className="text-gray-400">User management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <p className="text-gray-400">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <p className="text-gray-400">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
