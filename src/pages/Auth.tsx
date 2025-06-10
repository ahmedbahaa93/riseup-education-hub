
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { SEOHead } from '@/components/seo/SEOHead';
import { AuthTabs } from '@/components/auth/AuthTabs';

const Auth = () => {
  // All hooks must be declared at the top, before any conditional returns
  const { user } = useAuth();
  const location = useLocation();

  // Redirect if already logged in - AFTER all hooks are declared
  if (user) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <SEOHead 
        title="Sign In - RaiseUP"
        description="Sign in to your RaiseUP account to access your courses and continue your professional development journey."
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to RaiseUP</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your professional training platform
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign In to Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <AuthTabs />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
