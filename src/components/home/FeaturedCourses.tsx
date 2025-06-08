import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const FeaturedCourses = () => {
  const { data: courses, isLoading } = useCourses();
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const featuredCourses = courses?.slice(0, 3) || [];

  const handleAddToCart = (course: any) => {
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
  };

  const handleViewDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (isLoading) {
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {featuredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={course.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                  alt={course.title}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleViewDetails(course.id)}
                />
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{course.categories?.name || 'Uncategorized'}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => handleViewDetails(course.id)}
                >
                  {course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration_hours} hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.student_count?.toLocaleString() || 0}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating || 0}</span>
                  </div>
                  <span className="text-sm text-gray-500">({course.student_count || 0} students)</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-x-2">
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      {course.original_price && course.original_price > course.price && (
                        <span className="text-lg text-gray-400 line-through">${course.original_price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAddToCart(course)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewDetails(course.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/courses')}
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;