import React from 'react';
import { Link } from '../lib/router';
import { BrainCircuit, Heart, Shield, Users, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full border-[1.5px] border-orange-500 flex items-center justify-center text-sm font-bold text-gray-800 bg-white">
                <span className="text-orange-500">C</span>k
              </div>
              <div className="font-extrabold text-xl tracking-tight flex flex-col leading-none">
                <span className="text-gray-900">Calculate</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Karo</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">
              India's #1 AI-powered calculator platform. Precision tools for finance, health, and daily mathematics.
            </p>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-500" /> Legal & Terms
            </h4>
            <ul className="space-y-3">
              <li><Link to="/page/privacy-policy" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/page/terms" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/page/disclaimer" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" /> Company
            </h4>
            <ul className="space-y-3">
              <li><Link to="/page/about" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/page/authors-and-editors" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Authors & Editors</Link></li>
              <li><Link to="/blog" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Our Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" /> Support
            </h4>
            <ul className="space-y-3">
              <li><Link to="/page/contact-us" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/page/feedback" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Feedback</Link></li>
              <li><Link to="/page/suggestions" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Suggestions</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-gray-400">
            © {currentYear} CalculateKaro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 text-red-400" /> Made with love
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <BrainCircuit className="w-3.5 h-3.5 text-blue-500" /> AI Powered
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
