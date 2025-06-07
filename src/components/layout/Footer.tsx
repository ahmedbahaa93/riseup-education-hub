
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold">RaiseUP</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering professionals with world-class training and certification programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-gray-400 hover:text-white">All Courses</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses?category=it" className="text-gray-400 hover:text-white">IT & Technology</Link></li>
              <li><Link to="/courses?category=business" className="text-gray-400 hover:text-white">Business</Link></li>
              <li><Link to="/courses?category=project-management" className="text-gray-400 hover:text-white">Project Management</Link></li>
              <li><Link to="/courses?category=leadership" className="text-gray-400 hover:text-white">Leadership</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@raiseup.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Training St, Education City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 RaiseUP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
