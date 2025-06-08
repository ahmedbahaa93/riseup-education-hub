
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type BlogAuthor = {
  id: string;
  first_name: string | null;
  last_name: string | null;
};

type BlogTag = {
  id: string;
  name: string;
  slug: string;
};

type BlogPost = Tables<'blog_posts'> & {
  profiles: BlogAuthor | null;
  blog_post_tags: Array<{
    blog_tags: BlogTag;
  }>;
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      console.log('Fetching blog posts from Supabase...');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles (
            id,
            first_name,
            last_name
          ),
          blog_post_tags (
            blog_tags (
              id,
              name,
              slug
            )
          )
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      console.log('Blog posts fetched successfully:', data);
      return data || [];
    },
  });
};
