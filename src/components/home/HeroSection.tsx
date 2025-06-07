
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Advance Your Career with
                <span className="text-blue-200"> Expert Training</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of professionals who have transformed their careers with our comprehensive training programs and industry-recognized certifications.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-blue-100">4.9/5 from 15,000+ students</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Free Consultation
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Courses Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-blue-200 text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Professional training"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Featured Course</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                </div>
                <h3 className="text-gray-900 font-semibold text-lg">Advanced Project Management</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">$299</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600 text-sm">4.8 (1,234)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
