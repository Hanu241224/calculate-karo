import React from 'react';
import { ArrowRight, BookOpen, Clock, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { articles, categories, findCategory } from '../data/content';
import { Link } from '../lib/router';
import { useSearchParams } from '../lib/router-hooks';

const BlogArchiveTemplate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = findCategory(searchParams.get('category') ?? undefined);
  const visibleArticles = activeCategory
    ? articles.filter((article) => article.categorySlug === activeCategory.slug)
    : articles;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <PageHeader
        eyebrow={activeCategory ? `${activeCategory.title} editorial` : 'Editorial library'}
        title={activeCategory ? `${activeCategory.title} Guides` : 'Latest Calculation Insights'}
        description="Practical, professional guidance for using calculators confidently across finance, health, maths, and date planning."
        icon={<BookOpen className="w-5 h-5" />}
        align="center"
        stats={[
          { label: 'Articles', value: String(visibleArticles.length) },
          { label: 'Categories', value: String(categories.length) },
        ]}
      />

      <div className="flex flex-wrap justify-center gap-2">
        <FilterLink to="/blog" active={!activeCategory}>All</FilterLink>
        {categories.map((category) => (
          <FilterLink key={category.slug} to={`/blog?category=${category.slug}`} active={activeCategory?.slug === category.slug}>
            {category.title}
          </FilterLink>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleArticles.map((article, index) => {
          const category = findCategory(article.categorySlug);

          return (
            <Link to={`/blog/${article.slug}`} key={article.slug} className="group panel-surface flex flex-col overflow-hidden smooth-control hover:-translate-y-0.5 hover:border-orange-200">
              <div className="h-44 bg-gray-800 relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover smooth-control group-hover:scale-[1.03]"
                />
                {index === 0 && (
                  <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-md border border-gray-800 bg-gray-950 px-2 py-1 text-[10px] font-semibold uppercase text-[#f4510b]">
                    <TrendingUp className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold text-orange-400">{category?.title ?? 'Guide'}</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400"><Clock className="w-3 h-3" /> {article.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold leading-snug text-black smooth-control group-hover:text-[#f4510b]">{article.title}</h2>
                <p className="mt-2 line-clamp-2 flex-1 text-xs font-semibold leading-5 text-black/50">{article.excerpt}</p>
                <div className="mt-5 flex items-center text-xs font-semibold text-[#f4510b]">
                  Read Article <ArrowRight className="w-3.5 h-3.5 ml-1 smooth-control group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const FilterLink: React.FC<{ to: string; active?: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`rounded-[14px] border px-3 py-2 text-xs font-semibold smooth-control ${active ? 'border-[#f4510b] bg-orange-500/10 text-[#f4510b]' : 'border-black/10 bg-white text-black/60 hover:border-orange-200 hover:text-[#f4510b]'}`}
  >
    {children}
  </Link>
);

export default BlogArchiveTemplate;
