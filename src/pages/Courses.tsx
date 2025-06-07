
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, Clock, Users } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "AWS Cloud Architect Certification",
      description: "Master cloud architecture with hands-on AWS training and real-world projects.",
      price: 399,
      originalPrice: 599,
      rating: 4.9,
      students: 2340,
      duration: "40 hours",
      level: "Advanced",
      category: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      description: "Complete digital marketing course covering SEO, PPC, social media, and analytics.",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      students: 5670,
      duration: "25 hours",
      level: "Intermediate",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      id: 3,
      title: "Agile Project Management",
      description: "Learn Scrum, Kanban, and other agile methodologies for modern project management.",
      price: 299,
      originalPrice: 399,
      rating: 4.7,
      students: 3450,
      duration: "30 hours",
      level: "Intermediate",
      category: "Project Management",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      description: "Learn Python, machine learning, and data analysis from industry experts.",
      price: 349,
      originalPrice: 499,
      rating: 4.8,
      students: 4120,
      duration: "35 hours",
      level: "Beginner",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 5,
      title: "Cybersecurity Essentials",
      description: "Comprehensive cybersecurity training covering threats, prevention, and response.",
      price: 279,
      originalPrice: 379,
      rating: 4.6,
      students: 2890,
      duration: "28 hours",
      level: "Intermediate",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      id: 6,
      title: "Leadership Excellence",
      description: "Develop leadership skills and management techniques for modern organizations.",
      price: 229,
      originalPrice: 329,
      rating: 4.7,
      students: 3760,
      duration: "22 hours",
      level: "Intermediate",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  const categories = [
    "All Categories",
    "Cloud Computing",
    "Marketing",
    "Project Management",
    "Data Science",
    "Cybersecurity",
    "Leadership"
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover professional training courses designed to advance your career and skills.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === "All Categories" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">Showing {courses.length} courses</p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({course.students} students)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-x-2">
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Courses
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
