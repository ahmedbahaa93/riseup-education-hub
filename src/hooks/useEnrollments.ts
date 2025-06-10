
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
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          course_id,
          status,
          enrolled_at,
          progress,
          profiles!inner(first_name, last_name),
          courses!inner(title, price)
        `)
        .order('enrolled_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      return data?.map(enrollment => ({
        id: enrollment.id,
        user_id: enrollment.user_id,
        course_id: enrollment.course_id,
        status: enrollment.status,
        enrolled_at: enrollment.enrolled_at,
        progress: enrollment.progress || 0,
        student_name: `${enrollment.profiles.first_name} ${enrollment.profiles.last_name}`.trim(),
        course_title: enrollment.courses.title,
        amount_paid: enrollment.courses.price,
      })) || [];
    },
  });
};
