import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Award, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SEOHead } from '@/components/seo/SEOHead';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock data - would come from Supabase in real implementation
  const enrolledCourses = [
    {
      id: '1',
      title: 'Advanced Digital Marketing',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      instructor: 'Sarah Johnson',
      nextLesson: 'Email Campaign Optimization'
    },
    {
      id: '2', 
      title: 'Project Management Fundamentals',
      progress: 45,
      totalLessons: 15,
      completedLessons: 7,
      instructor: 'Michael Chen',
      nextLesson: 'Risk Management Strategies'
    }
  ];

  const certificates = [
    {
      id: '1',
      courseName: 'Digital Marketing Basics',
      issuedDate: '2024-01-15',
      certificateId: 'DM-001-2024'
    }
  ];

  const stats = {
    totalCourses: 2,
    completedCourses: 1,
    totalHours: 35,
    certificates: 1
  };

  return (
    <Layout>
      <SEOHead 
        title="My Dashboard - RaiseUP"
        description="Track your learning progress and manage your courses on RaiseUP."
      />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.first_name || 'Student'}!
            </h1>
            <p className="text-gray-600">Track your learning progress and manage your courses</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold">{stats.completedCourses}</p>
                  </div>
                  <Award className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Study Hours</p>
                    <p className="text-2xl font-bold">{stats.totalHours}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Certificates</p>
                    <p className="text-2xl font-bold">{stats.certificates}</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              <div className="grid gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0">
                          <Badge variant="outline">{course.progress}% Complete</Badge>
                          <Button size="sm">Continue Learning</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Progress</span>
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-4">
              <div className="grid gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.courseName}</h3>
                          <p className="text-sm text-gray-600">Certificate ID: {cert.certificateId}</p>
                          <p className="text-sm text-gray-600">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Completion</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">35</div>
                        <div className="text-sm text-gray-600">Hours Completed</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">16</div>
                        <div className="text-sm text-gray-600">Lessons Finished</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;