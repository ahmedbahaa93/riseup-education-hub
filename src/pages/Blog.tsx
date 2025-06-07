
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User } from 'lucide-react';

// Mock blog data - this would come from Supabase in a real implementation
const mockPosts = [
  {
    id: '1',
    title: 'The Future of Digital Marketing: Trends to Watch in 2024',
    excerpt: 'Discover the latest trends shaping digital marketing and how they can transform your business strategy.',
    content: 'Full article content here...',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    category: 'Digital Marketing',
    tags: ['marketing', 'trends', 'digital'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  },
  {
    id: '2',
    title: 'Mastering Project Management: Essential Skills for Success',
    excerpt: 'Learn the key project management skills that every professional needs to advance their career.',
    content: 'Full article content here...',
    author: 'Michael Chen',
    publishedAt: '2024-01-12',
    category: 'Project Management',
    tags: ['project management', 'skills', 'career'],
    featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
  },
  {
    id: '3',
    title: 'Cloud Computing Essentials: A Beginner\'s Guide',
    excerpt: 'Everything you need to know to get started with cloud computing and advance your technical skills.',
    content: 'Full article content here...',
    author: 'David Rodriguez',
    publishedAt: '2024-01-10',
    category: 'Technology',
    tags: ['cloud computing', 'technology', 'beginners'],
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Digital Marketing', 'Project Management', 'Technology', 'Business'];

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              {categories.map((category) => (
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

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <img 
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span>By {post.author}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No posts found */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
