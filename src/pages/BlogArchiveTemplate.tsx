import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';

const BlogArchiveTemplate: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="text-center max-w-2xl mx-auto py-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">Latest Insights</h1>
        <p className="text-gray-500 text-sm font-medium">Discover tips, tutorials, and expert knowledge on finance, health, and mathematics.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link to={`/blog/post-${i}`} key={i} className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 no-shadow">
            <div className="h-40 bg-gray-100 relative overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?auto=format&fit=crop&w=800&q=80`}
                alt="Blog cover"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a00000000%20text%20%7B%20fill%3A%23A3A3A3%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a00000000%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23F3F4F6%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22300%22%20y%3D%22220%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                }}
              />
              {i === 1 && (
                <div className="absolute top-3 left-3 z-20 bg-white border border-gray-200 text-[#3635B8] text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Popular
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                <span className="text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Finance</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
              </div>
              <h2 className="text-lg font-black text-gray-900 mb-2 group-hover:text-[#3635B8] transition-colors line-clamp-2 leading-tight">How to calculate your true net worth in 2024</h2>
              <p className="text-gray-500 text-xs font-medium leading-relaxed mb-5 line-clamp-2 flex-1">A comprehensive guide to understanding your assets, liabilities, and the hidden factors that affect your wealth over time.</p>
              <div className="flex items-center text-xs font-bold text-[#3635B8] group-hover:text-blue-800 transition-colors mt-auto">
                Read Article <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogArchiveTemplate;
