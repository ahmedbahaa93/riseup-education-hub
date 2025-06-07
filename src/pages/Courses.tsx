
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, Clock, Users, Loader2 } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useCategories } from '@/hooks/useCategories';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: courses, isLoading: coursesLoading, error: coursesError } = useCourses();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const isLoading = coursesLoading || categoriesLoading;

  // Filter courses based on selected category and search term
  const filteredCourses = courses?.filter(course => {
    const matchesCategory = selectedCategory === 'All Categories' || 
                           course.categories?.name === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  // Prepare categories list with "All Categories" option
  const categoryOptions = ['All Categories', ...(categories?.map(cat => cat.name) || [])];

  if (coursesError) {
    console.error('Error loading courses:', coursesError);
  }

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
                <Input 
                  placeholder="Search courses..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === selectedCategory ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          )}

          {/* Error state */}
          {coursesError && (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load courses. Please try again later.</p>
            </div>
          )}

          {/* Results count */}
          {!isLoading && (
            <div className="mb-6">
              <p className="text-gray-600">Showing {filteredCourses.length} courses</p>
            </div>
          )}

          {/* Course Grid */}
          {!isLoading && filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <img 
                      src={course.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{course.categories?.name || 'Uncategorized'}</Badge>
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

                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                        {course.original_price && course.original_price > course.price && (
                          <span className="text-lg text-gray-400 line-through">${course.original_price}</span>
                        )}
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No courses found */}
          {!isLoading && filteredCourses.length === 0 && !coursesError && (
            <div className="text-center py-12">
              <p className="text-gray-600">No courses found matching your criteria.</p>
            </div>
          )}

          {/* Load More - for future pagination */}
          {!isLoading && filteredCourses.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Courses
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
