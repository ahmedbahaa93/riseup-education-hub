
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: "Students Trained", value: "50,000+" },
    { icon: Award, label: "Certifications Issued", value: "35,000+" },
    { icon: Globe, label: "Countries Served", value: "120+" },
    { icon: Target, label: "Success Rate", value: "98%" }
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Executive Officer",
      bio: "20+ years in corporate training and education technology.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "Former Google engineer with expertise in cloud architecture.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Lisa Chen",
      role: "Head of Curriculum",
      bio: "PhD in Education with focus on adult learning methodologies.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About RaiseUP
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              We're dedicated to empowering professionals worldwide with the skills and knowledge 
              they need to excel in today's rapidly evolving business landscape.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  To democratize access to high-quality professional training and enable individuals 
                  to achieve their career aspirations through expert-led courses and industry-recognized certifications.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that continuous learning is the key to professional success, and we're 
                  committed to making world-class training accessible to everyone, everywhere.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  To become the global leader in professional development, creating a world where 
                  every individual has the opportunity to reach their full potential through 
                  transformative learning experiences.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We envision a future where skills gaps are eliminated, careers are accelerated, 
                  and organizations thrive through the power of continuous learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-none shadow-lg">
                  <CardContent className="p-8">
                    <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our experienced team combines deep industry expertise with a passion for education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-none shadow-lg">
                  <CardContent className="p-8">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We deliver exceptional learning experiences through rigorous quality standards 
                  and continuous improvement.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
                <p className="text-gray-600">
                  We make high-quality education accessible to learners regardless of their 
                  background or location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We embrace new technologies and methodologies to enhance the learning 
                  experience and outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
