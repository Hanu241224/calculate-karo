import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '../data/content';
import { findCategory } from '../data/content';
import { Link } from '../lib/router';

type BlogCardsSectionProps = {
  articles: Article[];
  eyebrow: string;
  title: string;
  description: string;
  ctaTo?: string;
  ctaLabel?: string;
};

const BlogCardsSection: React.FC<BlogCardsSectionProps> = ({ articles, eyebrow, title, description, ctaTo = '/blog', ctaLabel = 'View all guides' }) => {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="heading-section mt-2">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-black/55">{description}</p>
        </div>
        <Link to={ctaTo} className="flex shrink-0 items-center text-sm font-semibold text-[#f4510b] smooth-control hover:text-orange-300">
          {ctaLabel} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => {
          const category = findCategory(article.categorySlug);

          return (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className={`group panel-surface overflow-hidden smooth-control hover:-translate-y-0.5 hover:border-orange-200 ${index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}
            >
              <div className="relative h-40 overflow-hidden bg-gray-800">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover smooth-control group-hover:scale-[1.03]" />
                <div className="absolute left-3 top-3 rounded-md bg-gray-950/95 px-2 py-1 text-[11px] font-semibold text-gray-200">
                  {category?.title ?? 'Guide'}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-black/45">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </div>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-black group-hover:text-[#f4510b]">{article.title}</h3>
                <p className="mt-2 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-black/50">{article.excerpt}</p>
                <div className="mt-5 flex items-center text-xs font-semibold text-[#f4510b]">
                  Read guide <ArrowRight className="ml-1 h-3.5 w-3.5 smooth-control group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BlogCardsSection;
