
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: async (): Promise<Tables<'blog_tags'>[]> => {
      console.log('Fetching blog tags from Supabase...');
      
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching blog tags:', error);
        throw error;
      }

      console.log('Blog tags fetched successfully:', data);
      return data || [];
    },
  });
};
