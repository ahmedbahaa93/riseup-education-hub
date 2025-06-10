
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
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Get user profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Get user roles
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    // Determine the highest role (admin > instructor > student)
    let role = 'student';
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
      first_name: profile?.first_name,
      last_name: profile?.last_name,
    };
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
};
