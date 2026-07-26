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
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Article Header */}
      <div className="space-y-6 pt-8">
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-[#3635B8] hover:text-blue-800 transition-colors">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">{title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 py-4 border-y border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="font-medium text-gray-900">Alex Financial</span>
          </div>
          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Oct 24, 2024</div>
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
          alt="Featured article image"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed">
        <p className="text-xl text-gray-800 font-medium leading-relaxed mb-8">
          Understanding the fundamentals of calculation is essential in today's fast-paced world. Whether you're dealing with personal finance or complex mathematical models, having the right tools makes all the difference.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Importance of Accuracy</h2>
        <p className="mb-6">
          When dealing with numbers, small errors can compound into significant issues over time. This is why utilizing precise computational tools is better than relying on mental math or rudimentary methods.
        </p>

        <div className="my-10 p-8 bg-blue-50/50 rounded-2xl border-l-4 border-[#3635B8]">
          <p className="text-xl font-medium text-gray-900 italic m-0">"The best investment you can make is in tools that save you time and prevent costly errors."</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Next Steps</h2>
        <p className="mb-6">
          Start utilizing our platform's calculators today to streamline your workflow. Explore the categories on the left to find exactly what you need.
        </p>
      </div>

      {/* Share Actions */}
      <div className="flex items-center justify-between py-8 border-t border-gray-100">
        <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Share this article</div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"><FacebookIcon className="w-4 h-4" /></button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"><TwitterIcon className="w-4 h-4" /></button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"><LinkedinIcon className="w-4 h-4" /></button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"><Share2 className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostTemplate;
