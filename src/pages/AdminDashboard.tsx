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
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: courses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - would come from API in real implementation
  const stats = {
    totalUsers: 1250,
    totalCourses: 45,
    totalRevenue: 125000,
    monthlyGrowth: 12.5
  };

  const recentUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', joinDate: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', joinDate: '2024-01-14' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'student', joinDate: '2024-01-13' },
  ];

  const recentEnrollments = [
    { id: '1', studentName: 'Alice Brown', courseName: 'Digital Marketing', enrollDate: '2024-01-15', amount: 299 },
    { id: '2', studentName: 'Charlie Wilson', courseName: 'Project Management', enrollDate: '2024-01-14', amount: 399 },
    { id: '3', studentName: 'Diana Davis', courseName: 'AWS Certification', enrollDate: '2024-01-13', amount: 499 },
  ];

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
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                              <span className="text-xs text-gray-500">Joined {user.joinDate}</span>
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
                      {courses?.slice(0, 5).map((course) => (
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
                      {recentEnrollments.map((enrollment) => (
                        <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{enrollment.studentName}</h4>
                            <p className="text-sm text-gray-600">{enrollment.courseName}</p>
                            <span className="text-xs text-gray-500">Enrolled {enrollment.enrollDate}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${enrollment.amount}</p>
                            <Badge variant="default">Paid</Badge>
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
                          <span>This Month</span>
                          <span className="font-bold">$15,420</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Month</span>
                          <span className="font-bold">$12,350</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Growth</span>
                          <span className="font-bold text-green-600">+24.8%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Most Popular</span>
                          <span className="font-bold">Digital Marketing</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Highest Revenue</span>
                          <span className="font-bold">AWS Certification</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion Rate</span>
                          <span className="font-bold text-green-600">87%</span>
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