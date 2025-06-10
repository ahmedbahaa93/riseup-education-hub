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
  Trash2,
  AlertCircle,
  Loader2,
  UserPlus,
  BookPlus,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useUsers, useUpdateUserRole, useDeleteUser } from '@/hooks/useUsers';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useToast } from '@/hooks/use-toast';
import { ReportsSection } from '@/components/admin/ReportsSection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: courses, isLoading: coursesLoading, error: coursesError } = useCourses();
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: enrollments, isLoading: enrollmentsLoading, error: enrollmentsError } = useEnrollments();
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
    `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await updateUserRole.mutateAsync({ userId, role: newRole });
      toast({
        title: "Success",
        description: "User role updated successfully.",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
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
        console.error('Error deleting user:', error);
        toast({
          title: "Error",
          description: "Failed to delete user.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddUser = () => {
    toast({
      title: "Feature Coming Soon",
      description: "User creation functionality will be available soon.",
    });
  };

  const handleAddCourse = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Course creation functionality will be available soon.",
    });
  };

  // Show error state if any critical data failed to load
  if (coursesError || usersError || enrollmentsError) {
    return (
      <ProtectedRoute requiredRole="admin">
        <Layout>
          <div className="py-8 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Error Loading Dashboard</h3>
                    <p className="text-gray-600 mb-4">
                      There was an error loading the dashboard data. Please try refreshing the page.
                    </p>
                    <Button onClick={() => window.location.reload()}>
                      Refresh Page
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  // Show loading state
  const isLoading = coursesLoading || usersLoading || enrollmentsLoading;

  return (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <div className="py-8 lg:py-16">
          <div className="container mx-auto px-4">
            {/* Header - Responsive */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-sm lg:text-base text-gray-600">Manage your platform and monitor performance</p>
            </div>

            {/* Stats Overview - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-medium text-gray-600">Total Users</p>
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="w-3 h-3 lg:w-4 lg:h-4 animate-spin mr-2" />
                          <span className="text-xs lg:text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-lg lg:text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      )}
                    </div>
                    <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-medium text-gray-600">Total Courses</p>
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="w-3 h-3 lg:w-4 lg:h-4 animate-spin mr-2" />
                          <span className="text-xs lg:text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-lg lg:text-2xl font-bold">{stats.totalCourses}</p>
                      )}
                    </div>
                    <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-medium text-gray-600">Total Revenue</p>
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="w-3 h-3 lg:w-4 lg:h-4 animate-spin mr-2" />
                          <span className="text-xs lg:text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-lg lg:text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                      )}
                    </div>
                    <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm font-medium text-gray-600">Monthly Growth</p>
                      <p className="text-lg lg:text-2xl font-bold">+{stats.monthlyGrowth}%</p>
                    </div>
                    <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
              {/* Responsive Tabs */}
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="users" className="text-xs lg:text-sm">Users</TabsTrigger>
                <TabsTrigger value="courses" className="text-xs lg:text-sm">Courses</TabsTrigger>
                <TabsTrigger value="enrollments" className="text-xs lg:text-sm">Enrollments</TabsTrigger>
                <TabsTrigger value="reports" className="text-xs lg:text-sm">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <CardTitle className="text-lg lg:text-xl">User Management</CardTitle>
                      <Button onClick={handleAddUser} className="w-full lg:w-auto">
                        <UserPlus className="w-4 h-4 mr-2" />
                        <span className="hidden lg:inline">Add User</span>
                        <span className="lg:hidden">Add</span>
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
                    
                    {usersLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin mr-2" />
                        <span>Loading users...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredUsers.map((user) => (
                          <div key={user.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-4">
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {user.first_name || user.last_name 
                                  ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                                  : 'No Name'
                                }
                              </h4>
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
                                disabled={updateUserRole.isPending}
                                className="flex-1 lg:flex-none"
                              >
                                <Edit className="w-4 h-4 lg:mr-2" />
                                <span className="hidden lg:inline">Edit</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={deleteUser.isPending}
                                className="flex-1 lg:flex-none"
                              >
                                <Trash2 className="w-4 h-4 lg:mr-2" />
                                <span className="hidden lg:inline">Delete</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                        {filteredUsers.length === 0 && !usersLoading && (
                          <div className="text-center py-8 text-gray-500">
                            No users found.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <CardTitle className="text-lg lg:text-xl">Course Management</CardTitle>
                      <Button onClick={handleAddCourse} className="w-full lg:w-auto">
                        <BookPlus className="w-4 h-4 mr-2" />
                        <span className="hidden lg:inline">Add Course</span>
                        <span className="lg:hidden">Add</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {coursesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin mr-2" />
                        <span>Loading courses...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {courses?.slice(0, 10).map((course) => (
                          <div key={course.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-4">
                            <div className="flex-1">
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
                              <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                                <Edit className="w-4 h-4 lg:mr-2" />
                                <span className="hidden lg:inline">Edit</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        )) || (
                          <div className="text-center py-8 text-gray-500">
                            No courses found.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="enrollments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">Recent Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {enrollmentsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin mr-2" />
                        <span>Loading enrollments...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {enrollments?.map((enrollment) => (
                          <div key={enrollment.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-4">
                            <div className="flex-1">
                              <h4 className="font-medium">{enrollment.student_name}</h4>
                              <p className="text-sm text-gray-600">{enrollment.course_title}</p>
                              <span className="text-xs text-gray-500">
                                Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-left lg:text-right">
                              <p className="font-bold text-green-600">${enrollment.amount_paid}</p>
                              <Badge variant="default">{enrollment.status}</Badge>
                            </div>
                          </div>
                        )) || (
                          <div className="text-center py-8 text-gray-500">
                            No enrollments found.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <ReportsSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;