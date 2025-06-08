
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Calendar, User } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useBlogTags } from '@/hooks/useBlogTags';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: blogPosts = [], isLoading: postsLoading, error: postsError } = useBlogPosts();
  const { data: blogTags = [], isLoading: tagsLoading } = useBlogTags();

  // Create categories from tags
  const categories = ['All', ...blogTags.map(tag => tag.name)];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedCategory === 'All') return matchesSearch;
    
    // Check if post has the selected tag
    const hasTag = post.blog_post_tags.some(
      postTag => postTag.blog_tags.name === selectedCategory
    );
    
    return matchesSearch && hasTag;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };

  const getAuthorName = (author: any) => {
    if (!author) return 'Unknown Author';
    return `${author.first_name || ''} ${author.last_name || ''}`.trim() || 'Unknown Author';
  };

  const getPostTags = (postTags: any[]) => {
    return postTags.map(pt => pt.blog_tags.name);
  };

  if (postsError) {
    console.error('Error loading blog posts:', postsError);
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog & Insights
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest industry insights, tips, and trends in professional training and development.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {tagsLoading ? (
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant={category === selectedCategory ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))
              )}
            </div>
          </div>

          {/* Loading State */}
          {postsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Skeleton className="w-full h-48" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {postsError && (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading blog posts. Please try again later.</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!postsLoading && !postsError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <img 
                      src={post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {post.blog_post_tags.length > 0 && (
                        <Badge variant="secondary">
                          {post.blog_post_tags[0].blog_tags.name}
                        </Badge>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.published_at)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>By {getAuthorName(post.profiles)}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {getPostTags(post.blog_post_tags).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No posts found */}
          {!postsLoading && !postsError && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {blogPosts.length === 0 
                  ? 'No blog posts available yet.' 
                  : 'No articles found matching your criteria.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
