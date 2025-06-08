import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { SEOHead } from '@/components/seo/SEOHead';

const Index = () => {
  return (
    <Layout>
      <SEOHead />
      <HeroSection />
      <FeaturedCourses />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;