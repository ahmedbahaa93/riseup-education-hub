import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, Users, BookOpen, ShoppingCart } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo/SEOHead';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: courses, isLoading } = useCourses();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const course = courses?.find(c => c.id === id);

  const handleAddToCart = () => {
    if (course) {
      addItem({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image_url
      });
      
      toast({
        title: "Added to cart!",
        description: `${course.title} has been added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <SEOHead title="Course Not Found - RaiseUP" />
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600">The course you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead 
        title={`${course.title} - RaiseUP`}
        description={course.description || `Learn ${course.title} with expert instruction and hands-on practice.`}
        image={course.image_url}
      />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src={course.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.categories?.name || 'Uncategorized'}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating || 0}</span>
                  <span className="text-gray-500">({course.student_count || 0} students)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{course.duration_hours} hours</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2>About This Course</h2>
                <p>{course.description}</p>
                
                <h3>Learning Objectives</h3>
                <ul>
                  <li>Master the fundamental concepts covered in this course</li>
                  <li>Apply practical skills in real-world scenarios</li>
                  <li>Gain industry-relevant knowledge and expertise</li>
                  <li>Develop hands-on experience through practical exercises</li>
                </ul>

                <h3>Course Prerequisites</h3>
                <p>Basic understanding of the subject area is recommended but not required. This course is designed to accommodate learners at the {course.level} level.</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Course Details</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">${course.price}</div>
                      {course.original_price && course.original_price > course.price && (
                        <div className="text-lg text-gray-400 line-through">${course.original_price}</div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration</span>
                      </span>
                      <span>{course.duration_hours} hours</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Students</span>
                      </span>
                      <span>{course.student_count || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Level</span>
                      </span>
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Instructor Info */}
                  {course.profiles && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Instructor</h4>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {course.profiles.first_name?.[0]}{course.profiles.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {course.profiles.first_name} {course.profiles.last_name}
                          </div>
                          <div className="text-sm text-gray-500">Professional Instructor</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
                    <p>✓ Lifetime access to course materials</p>
                    <p>✓ Certificate of completion</p>
                    <p>✓ 30-day money-back guarantee</p>
                    <p>✓ Mobile and desktop access</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Courses */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses?.slice(0, 3).map((relatedCourse) => (
                <Card key={relatedCourse.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <img 
                      src={relatedCourse.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                      alt={relatedCourse.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{relatedCourse.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{relatedCourse.rating || 0}</span>
                      </div>
                      <span className="font-bold text-blue-600">${relatedCourse.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;