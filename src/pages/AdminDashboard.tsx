
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Search,
  Edit,
  Trash2
} from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useUsers, useUpdateUserRole, useDeleteUser } from '@/hooks/useUsers';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: courses } = useCourses();
  const { data: users } = useUsers();
  const { data: enrollments } = useEnrollments();
  const updateUserRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics from real data
  const stats = {
    totalUsers: users?.length || 0,
    totalCourses: courses?.length || 0,
    totalRevenue: enrollments?.reduce((sum, enrollment) => sum + (enrollment.amount_paid || 0), 0) || 0,
    monthlyGrowth: 12.5 // This would need to be calculated based on time-series data
  };

  const filteredUsers = users?.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await updateUserRole.mutateAsync({ userId, role: newRole });
      toast({
        title: "Success",
        description: "User role updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser.mutateAsync(userId);
        toast({
          title: "Success",
          description: "User deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete user.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your platform and monitor performance</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold">{stats.totalCourses}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                      <p className="text-2xl font-bold">+{stats.monthlyGrowth}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
              <TabsList>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="courses">Course Management</TabsTrigger>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {filteredUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{user.first_name} {user.last_name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Joined {new Date(user.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const newRole = user.role === 'admin' ? 'student' : 'admin';
                                handleRoleUpdate(user.id, newRole);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Course Management</CardTitle>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses?.slice(0, 10).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-gray-600">{course.categories?.name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={course.is_published ? 'default' : 'secondary'}>
                                {course.is_published ? 'Published' : 'Draft'}
                              </Badge>
                              <span className="text-sm font-medium text-blue-600">${course.price}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="enrollments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrollments?.map((enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{enrollment.student_name}</h4>
                            <p className="text-sm text-gray-600">{enrollment.course_title}</p>
                            <span className="text-xs text-gray-500">
                              Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${enrollment.amount_paid}</p>
                            <Badge variant="default">{enrollment.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Revenue</span>
                          <span className="font-bold">${stats.totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Enrollments</span>
                          <span className="font-bold">{enrollments?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Courses</span>
                          <span className="font-bold text-green-600">
                            {courses?.filter(c => c.is_published).length || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Users</span>
                          <span className="font-bold">{stats.totalUsers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Courses</span>
                          <span className="font-bold">{stats.totalCourses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Admin Users</span>
                          <span className="font-bold text-purple-600">
                            {users?.filter(u => u.role === 'admin').length || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
