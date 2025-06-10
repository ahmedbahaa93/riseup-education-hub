
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at: string;
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          created_at,
          users!inner(email),
          user_roles(role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return profiles?.map(profile => ({
        id: profile.id,
        email: profile.users.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        role: profile.user_roles?.[0]?.role || 'student',
        created_at: profile.created_at,
      })) || [];
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      // First, remove existing roles for this user
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Then add the new role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      // Note: This will cascade delete from profiles and user_roles tables
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
