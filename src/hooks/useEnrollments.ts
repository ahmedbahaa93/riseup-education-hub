
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  enrolled_at: string;
  progress: number;
  student_name: string;
  course_title: string;
  amount_paid?: number;
}

export const useEnrollments = () => {
  return useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async (): Promise<Enrollment[]> => {
      console.log('Fetching enrollments from Supabase...');
      
      try {
        // Fetch enrollments with related data
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select(`
            *,
            profiles!enrollments_user_id_fkey(first_name, last_name),
            courses!enrollments_course_id_fkey(title, price)
          `)
          .order('enrolled_at', { ascending: false });

        if (enrollmentsError) {
          console.error('Error fetching enrollments:', enrollmentsError);
          throw enrollmentsError;
        }

        // Transform the data to match the expected interface
        const transformedEnrollments: Enrollment[] = enrollments?.map(enrollment => ({
          id: enrollment.id,
          user_id: enrollment.user_id,
          course_id: enrollment.course_id,
          status: enrollment.status || 'active',
          enrolled_at: enrollment.enrolled_at,
          progress: enrollment.progress || 0,
          student_name: enrollment.profiles 
            ? `${enrollment.profiles.first_name || ''} ${enrollment.profiles.last_name || ''}`.trim() 
            : 'Unknown Student',
          course_title: enrollment.courses?.title || 'Unknown Course',
          amount_paid: enrollment.courses?.price || 0,
        })) || [];

        console.log('Enrollments fetched successfully:', transformedEnrollments);
        return transformedEnrollments;
      } catch (error) {
        console.error('Error in useEnrollments:', error);
        // Return empty array on error to prevent loading state from hanging
        return [];
      }
    },
  });
};
