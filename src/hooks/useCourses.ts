
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Course = Tables<'courses'> & {
  categories: Tables<'categories'> | null;
  profiles: Tables<'profiles'> | null;
};

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<Course[]> => {
      console.log('Fetching courses from Supabase...');
      
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          profiles (
            id,
            first_name,
            last_name
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }

      console.log('Courses fetched successfully:', data);
      return data || [];
    },
  });
};
