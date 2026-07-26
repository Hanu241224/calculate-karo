import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, Share2 } from 'lucide-react';

// Custom icons for social media if not present in this version of lucide-react
const FacebookIcon = ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const TwitterIcon = ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const LinkedinIcon = ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

const BlogPostTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const title = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Blog Post';

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Article Header */}
      <div className="space-y-5 pt-4">
        <Link to="/blog" className="inline-flex items-center text-xs font-bold text-[#3635B8] hover:text-blue-800 transition-colors uppercase tracking-widest">
          ← Back to Blog
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">{title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest py-3 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
              <User className="w-3 h-3 text-gray-500" />
            </div>
            <span className="text-gray-900">Alex Financial</span>
          </div>
          <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Oct 24, 2024</div>
          <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 8 min read</div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 no-shadow">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
          alt="Featured article image"
          className="w-full h-[300px] object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-sm md:prose-base prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
        <p className="text-lg text-gray-800 font-bold leading-relaxed mb-6">
          Understanding the fundamentals of calculation is essential in today's fast-paced world. Whether you're dealing with personal finance or complex mathematical models, having the right tools makes all the difference.
        </p>

        <h2 className="text-xl font-black text-gray-900 mt-10 mb-4">The Importance of Accuracy</h2>
        <p className="mb-4">
          When dealing with numbers, small errors can compound into significant issues over time. This is why utilizing precise computational tools is better than relying on mental math or rudimentary methods.
        </p>

        <div className="my-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 border-l-4 border-l-[#3635B8]">
          <p className="text-lg font-bold text-gray-900 italic m-0">"The best investment you can make is in tools that save you time and prevent costly errors."</p>
        </div>

        <h2 className="text-xl font-black text-gray-900 mt-10 mb-4">Next Steps</h2>
        <p className="mb-4">
          Start utilizing our platform's calculators today to streamline your workflow. Explore the categories on the left to find exactly what you need.
        </p>
      </div>

      {/* Share Actions */}
      <div className="flex items-center justify-between py-6 border-t border-gray-200">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share this article</div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors no-shadow"><FacebookIcon className="w-3.5 h-3.5" /></button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors no-shadow"><TwitterIcon className="w-3.5 h-3.5" /></button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors no-shadow"><LinkedinIcon className="w-3.5 h-3.5" /></button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors no-shadow"><Share2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostTemplate;
