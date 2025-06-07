
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';

const FeaturedCourses = () => {
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
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses designed by industry experts to help you advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-x-2">
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Enroll Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
