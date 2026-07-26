import React, { useState } from 'react';
import { Calendar, Clock, Share2, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { findArticle, findCategory } from '../data/content';
import { Link } from '../lib/router';
import { useParams } from '../lib/router-hooks';
import NotFound from './NotFound';

const BlogPostTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = findArticle(slug);
  const category = findCategory(article?.categorySlug);
  const [shareStatus, setShareStatus] = useState('');

  if (!article || !category) return <NotFound />;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setShareStatus('Link copied.');
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <PageHeader
        eyebrow={`${category.title} guide`}
        title={article.title}
        description={article.excerpt}
        icon={<User className="w-5 h-5" />}
        stats={[
          { label: 'Author', value: article.author.replace('Calculate Karo ', '') },
          { label: 'Read time', value: article.readTime },
        ]}
      >
        <Link to="/blog" className="rounded-[14px] border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 smooth-control hover:border-orange-200 hover:text-[#f4510b]">
          Back to Blog
        </Link>
      </PageHeader>

      <div className="panel-surface overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-[260px] w-full object-cover md:h-[340px]"
        />
        <div className="flex flex-wrap items-center gap-4 border-t border-black/10 px-5 py-4 text-xs font-semibold text-black/45 md:px-7">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {article.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
        </div>
      </div>

      <div className="panel-surface p-6 md:p-8">
        <div className="max-w-none leading-7 text-black/65">
          <p className="text-lg font-semibold leading-8 text-black">
            {article.excerpt}
          </p>

          <h2 className="heading-section mt-10 mb-4">Why This Calculation Matters</h2>
          <p className="mb-4 text-sm font-semibold leading-7 text-black/60">
            Accurate calculations make decisions easier to explain and easier to repeat. A calculator should show the inputs, apply the right formula, and make the result clear enough to act on.
          </p>

          <h2 className="heading-section mt-10 mb-4">How to Use the Result</h2>
          <p className="mb-4 text-sm font-semibold leading-7 text-black/60">
            Start with realistic inputs, compare more than one scenario, and keep a note of the assumptions behind the number. For finance and health topics, treat results as planning guidance and confirm important decisions with a qualified professional.
          </p>

          <div className="my-8 rounded-lg border border-orange-100 border-l-4 border-l-[#f4510b] bg-orange-500/10 p-6">
            <p className="m-0 text-lg font-semibold leading-7 text-black">Good calculations are transparent: the formula should be as easy to trust as the final number.</p>
          </div>

          <h2 className="heading-section mt-10 mb-4">Recommended Calculator</h2>
          <p className="mb-4 text-sm font-semibold leading-7 text-black/60">
            Explore the <Link to={`/category/${category.slug}`} className="font-semibold text-[#f4510b] hover:text-orange-300">{category.title} calculators</Link> to apply this guide with the correct tool.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-black/10 px-6 py-6">
        <div>
          <div className="eyebrow">Share this article</div>
          {shareStatus && <div className="mt-1 text-xs font-semibold text-orange-400">{shareStatus}</div>}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-xs font-semibold text-black/50 smooth-control hover:border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white" aria-label="Share on X">X</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-xs font-semibold text-black/50 smooth-control hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white" aria-label="Share on LinkedIn">in</button>
          <button onClick={() => void handleShare()} className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-black/50 smooth-control hover:bg-black hover:text-white" aria-label="Copy article link"><Share2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </article>
  );
};

export default BlogPostTemplate;
