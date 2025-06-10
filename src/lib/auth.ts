import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: string;
  first_name?: string;
  last_name?: string;
}

export const auth = {
  async signUp(email: string, password: string, userData: { firstName: string; lastName: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        }
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error getting current user:', error);
        return null;
      }
      
      if (!user) return null;

      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        // Return user without profile data if profile fetch fails
        return {
          ...user,
          role: 'student',
          first_name: user.user_metadata?.first_name,
          last_name: user.user_metadata?.last_name,
        };
      }

      // Get user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
      }

      // Determine the highest role (admin > instructor > student)
      let role = profile?.role || 'student';
      if (userRoles && userRoles.length > 0) {
        if (userRoles.some(r => r.role === 'admin')) {
          role = 'admin';
        } else if (userRoles.some(r => r.role === 'instructor')) {
          role = 'instructor';
        }
      }

      return {
        ...user,
        role,
        first_name: profile?.first_name || user.user_metadata?.first_name,
        last_name: profile?.last_name || user.user_metadata?.last_name,
      };
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return null;
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          const user = await this.getCurrentUser();
          callback(user);
        } else {
          callback(null);
        }
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        callback(null);
      }
    });
  }
};