import React from 'react';
import { ArrowRight, BadgePercent, Calculator, CalendarDays, HeartPulse, Landmark, LineChart, Sigma } from 'lucide-react';
import { articles, categories, tools } from '../data/content';
import type { CategorySlug } from '../data/content';
import { Link } from '../lib/router';

const categoryVisuals: Record<CategorySlug, { shell: string; activeShell: string; icon: React.ReactNode; label: string }> = {
  finance: {
    shell: 'bg-gray-950 text-orange-400 shadow-sm',
    activeShell: 'bg-orange-500 text-white',
    icon: <Landmark className="w-5 h-5" />,
    label: 'Money clarity',
  },
  health: {
    shell: 'bg-gray-950 text-orange-500 shadow-sm',
    activeShell: 'bg-orange-500 text-white',
    icon: <HeartPulse className="w-5 h-5" />,
    label: 'Wellness checks',
  },
  maths: {
    shell: 'bg-orange-500/10 text-[#f4510b]',
    activeShell: 'bg-[#f4510b] text-orange-100 shadow-sm',
    icon: <Sigma className="w-5 h-5" />,
    label: 'Math confidence',
  },
  'age-date': {
    shell: 'bg-gray-950 text-orange-400 shadow-sm',
    activeShell: 'bg-orange-600 text-white',
    icon: <CalendarDays className="w-5 h-5" />,
    label: 'Time planning',
  },
};

const HomeShowcase: React.FC = () => {
  const featuredTools = tools.filter((tool) => tool.featured);

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Calculation studios</p>
            <h2 className="heading-section mt-2">Choose the workspace that matches the decision.</h2>
          </div>
          <Link to="/blog" className="flex items-center text-sm font-semibold text-[#f4510b] smooth-control hover:text-orange-300">
            Read guides <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const visual = categoryVisuals[category.slug];
            const featuredTool = category.tools.find((tool) => tool.featured) ?? category.tools[0];
            const isActive = category.slug === 'maths';

            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`group flex min-h-[132px] flex-col justify-between rounded-lg border p-4 smooth-control hover:-translate-y-0.5 ${
                  isActive
                    ? 'border-orange-200 bg-orange-500/10 shadow-[0_12px_32px_rgba(54,53,184,0.08)]'
                    : 'border-gray-800 bg-gray-950 hover:border-orange-200 hover:bg-orange-500/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg smooth-control ${isActive ? visual.activeShell : visual.shell}`}>
                    {visual.icon}
                  </div>
                  <span className={`rounded-md px-2 py-1 text-[11px] font-semibold smooth-control ${isActive ? 'bg-orange-500/20 text-[#f4510b]' : 'bg-gray-800 text-gray-400 group-hover:bg-orange-500/20 group-hover:text-[#f4510b]'}`}>
                    {category.count} Tools
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase text-gray-400">{visual.label}</p>
                  <h3 className={`mt-1 text-base font-semibold smooth-control ${isActive ? 'text-[#f4510b]' : 'text-white group-hover:text-[#f4510b]'}`}>{category.title}</h3>
                  <p className="mt-1 truncate text-xs font-semibold text-gray-400">{featuredTool.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950 text-white">
          <div className="grid min-h-80 gap-0 md:grid-cols-[1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase text-orange-200">Featured workflows</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">Numbers that move from question to answer.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-gray-300">
                Compare a payment, estimate a health range, solve a percentage, or plan a deadline from the same organized surface.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {featuredTools.map((tool) => (
                  <Link key={tool.slug} to={`/tool/${tool.slug}`} className="flex min-h-[124px] flex-col justify-between rounded-lg border border-white/10 bg-gray-900/30 p-4 smooth-control hover:-translate-y-0.5 hover:border-white/25 hover:bg-gray-900/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900/40 text-white">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <span className="rounded-md bg-gray-900/40 px-2 py-1 text-[11px] font-semibold text-orange-100">{tool.popularity}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{tool.title}</div>
                      <div className="mt-1 line-clamp-1 text-xs leading-5 text-gray-300">{tool.formulaLabel}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-gray-900/40 p-px md:grid-cols-1">
              <MetricTile icon={<LineChart className="w-5 h-5" />} label="Monthly planning" value="EMI + SIP" color="bg-orange-500" />
              <MetricTile icon={<HeartPulse className="w-5 h-5" />} label="Body metrics" value="BMI range" color="bg-orange-500" />
              <MetricTile icon={<BadgePercent className="w-5 h-5" />} label="Fast math" value="% / ratio" color="bg-orange-500" />
              <MetricTile icon={<CalendarDays className="w-5 h-5" />} label="Schedule checks" value="Days + time" color="bg-orange-500" />
            </div>
          </div>
        </div>

        <div className="panel-surface p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="eyebrow">Latest editorial</p>
              <h2 className="heading-section mt-2">Practical context for each result.</h2>
            </div>
            <BookBadge />
          </div>
          <div className="space-y-3">
            {articles.slice(0, 3).map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`} className="group flex gap-3 rounded-lg border border-gray-800 p-3 smooth-control hover:border-orange-200 hover:bg-orange-500/10">
                <img src={article.image} alt={article.title} className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white group-hover:text-[#f4510b]">{article.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold text-gray-400">{article.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const MetricTile: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-gray-950 p-5">
    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
      {icon}
    </div>
    <div className="text-sm font-semibold">{value}</div>
    <div className="mt-1 text-xs font-medium text-gray-400">{label}</div>
  </div>
);

const BookBadge = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-200 bg-orange-500/10 text-orange-400">
    <ArrowRight className="h-4 w-4" />
  </div>
);

export default HomeShowcase;
