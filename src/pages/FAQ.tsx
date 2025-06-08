import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: '1',
      category: 'General',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, simply browse our course catalog, select the course you want, and click the "Enroll Now" button. You\'ll be guided through the payment process and will have immediate access to the course materials.'
    },
    {
      id: '2',
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for corporate bookings.'
    },
    {
      id: '3',
      category: 'Certificates',
      question: 'Will I receive a certificate upon completion?',
      answer: 'Yes, you will receive a digital certificate of completion for each course you successfully finish. Certificates can be downloaded from your dashboard and are recognized by industry professionals.'
    },
    {
      id: '4',
      category: 'Technical',
      question: 'What are the technical requirements?',
      answer: 'You need a stable internet connection and a modern web browser (Chrome, Firefox, Safari, or Edge). For some courses, you may need specific software which will be mentioned in the course requirements.'
    },
    {
      id: '5',
      category: 'Refunds',
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with a course, you can request a full refund within 30 days of purchase, provided you haven\'t completed more than 30% of the course content.'
    },
    {
      id: '6',
      category: 'Access',
      question: 'How long do I have access to the course?',
      answer: 'Once you enroll in a course, you have lifetime access to all course materials, including any future updates. You can learn at your own pace and revisit the content anytime.'
    },
    {
      id: '7',
      category: 'Support',
      question: 'How can I get help if I have questions during the course?',
      answer: 'You can reach out to our support team through the contact form, email, or live chat. We also have discussion forums for each course where you can interact with instructors and fellow students.'
    },
    {
      id: '8',
      category: 'Corporate',
      question: 'Do you offer corporate training?',
      answer: 'Yes, we offer customized corporate training solutions. Contact our sales team to discuss your organization\'s specific needs, group discounts, and custom course development.'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our courses, enrollment, and platform.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div>
                      <span className="text-sm text-blue-600 font-medium">{faq.category}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="space-x-4">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@raiseup.com"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;