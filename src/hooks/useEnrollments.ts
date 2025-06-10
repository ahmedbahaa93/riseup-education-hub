
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
      // For now, return mock data until we have proper relationships set up
      const mockEnrollments: Enrollment[] = [
        {
          id: '1',
          user_id: 'user1',
          course_id: 'course1',
          status: 'active',
          enrolled_at: new Date().toISOString(),
          progress: 75,
          student_name: 'John Doe',
          course_title: 'Advanced Digital Marketing',
          amount_paid: 299,
        },
        {
          id: '2',
          user_id: 'user2',
          course_id: 'course2',
          status: 'completed',
          enrolled_at: new Date(Date.now() - 86400000).toISOString(),
          progress: 100,
          student_name: 'Jane Smith',
          course_title: 'Project Management Fundamentals',
          amount_paid: 199,
        },
      ];

      return mockEnrollments;
    },
  });
};
