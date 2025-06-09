import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ReportData {
  revenue: {
    total: number;
    monthly: Array<{ month: string; amount: number }>;
    growth: number;
  };
  enrollments: {
    total: number;
    monthly: Array<{ month: string; count: number }>;
    byCategory: Array<{ category: string; count: number }>;
  };
  courses: {
    total: number;
    published: number;
    completionRates: Array<{ course: string; rate: number }>;
  };
  users: {
    total: number;
    active: number;
    monthly: Array<{ month: string; count: number }>;
  };
}

export const ReportsSection: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last-12-months');

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      // In a real implementation, you would fetch this data from your analytics API
      // For now, we'll use mock data
      const mockData: ReportData = {
        revenue: {
          total: 125000,
          monthly: [
            { month: 'Jan', amount: 8500 },
            { month: 'Feb', amount: 9200 },
            { month: 'Mar', amount: 10100 },
            { month: 'Apr', amount: 11500 },
            { month: 'May', amount: 12800 },
            { month: 'Jun', amount: 13200 },
            { month: 'Jul', amount: 14100 },
            { month: 'Aug', amount: 15300 },
            { month: 'Sep', amount: 16200 },
            { month: 'Oct', amount: 17100 },
            { month: 'Nov', amount: 18500 },
            { month: 'Dec', amount: 19200 }
          ],
          growth: 15.2
        },
        enrollments: {
          total: 1250,
          monthly: [
            { month: 'Jan', count: 85 },
            { month: 'Feb', count: 92 },
            { month: 'Mar', count: 108 },
            { month: 'Apr', count: 115 },
            { month: 'May', count: 128 },
            { month: 'Jun', count: 142 },
            { month: 'Jul', count: 156 },
            { month: 'Aug', count: 163 },
            { month: 'Sep', count: 171 },
            { month: 'Oct', count: 185 },
            { month: 'Nov', count: 192 },
            { month: 'Dec', count: 205 }
          ],
          byCategory: [
            { category: 'IT & Technology', count: 450 },
            { category: 'Business', count: 320 },
            { category: 'Project Management', count: 280 },
            { category: 'Leadership', count: 200 }
          ]
        },
        courses: {
          total: 45,
          published: 42,
          completionRates: [
            { course: 'Digital Marketing', rate: 87 },
            { course: 'AWS Certification', rate: 92 },
            { course: 'Project Management', rate: 78 },
            { course: 'Leadership Skills', rate: 85 },
            { course: 'Data Analytics', rate: 89 }
          ]
        },
        users: {
          total: 2150,
          active: 1890,
          monthly: [
            { month: 'Jan', count: 1650 },
            { month: 'Feb', count: 1720 },
            { month: 'Mar', count: 1780 },
            { month: 'Apr', count: 1850 },
            { month: 'May', count: 1920 },
            { month: 'Jun', count: 1980 },
            { month: 'Jul', count: 2040 },
            { month: 'Aug', count: 2100 },
            { month: 'Sep', count: 2150 },
            { month: 'Oct', count: 2200 },
            { month: 'Nov', count: 2250 },
            { month: 'Dec', count: 2300 }
          ]
        }
      };

      setReportData(mockData);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (type: 'pdf' | 'csv') => {
    // Implementation for exporting reports
    console.log(`Exporting ${type} report...`);
  };

  const COLORS = ['#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c'];

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!reportData) return null;

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-12-months">Last 12 Months</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => exportReport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${reportData.revenue.total.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{reportData.revenue.growth}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold">{reportData.enrollments.total.toLocaleString()}</p>
                <Badge variant="secondary" className="mt-1">Active</Badge>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Courses</p>
                <p className="text-2xl font-bold">{reportData.courses.published}</p>
                <p className="text-sm text-gray-500">of {reportData.courses.total} total</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{reportData.users.active.toLocaleString()}</p>
                <p className="text-sm text-gray-500">of {reportData.users.total.toLocaleString()} total</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData.revenue.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enrollments and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.enrollments.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrollments by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.enrollments.byCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {reportData.enrollments.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Completion Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Course Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.courses.completionRates} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="course" type="category" width={150} />
              <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
              <Bar dataKey="rate" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};