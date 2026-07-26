import React from 'react';
import { ArrowRight, BadgePercent, BarChart3, Calculator, CalendarDays, HeartPulse, Landmark, Sparkles, Zap } from 'lucide-react';
import { articles, findCategory } from '../data/content';
import type { CategorySlug, Tool } from '../data/content';
import { Link } from '../lib/router';
import { useParams } from '../lib/router-hooks';
import NotFound from './NotFound';

const categoryHomeMeta: Record<CategorySlug, {
  icon: React.ReactNode;
  kicker: string;
  headline: string;
  summary: string;
  insight: string;
}> = {
  finance: {
    icon: <Landmark className="h-5 w-5" />,
    kicker: 'Finance calculator hub',
    headline: 'Plan money decisions with cleaner numbers.',
    summary: 'Use practical finance calculators for EMI, SIP, GST, and compound interest with transparent formulas and professional next steps.',
    insight: 'Finance users usually need comparison, not just one result. This hub keeps loan, tax, and investment tools close together.',
  },
  health: {
    icon: <HeartPulse className="h-5 w-5" />,
    kicker: 'Health calculator hub',
    headline: 'Understand wellness estimates responsibly.',
    summary: 'Check BMI, hydration, calorie needs, and healthy reference ranges with plain-language guidance and careful context.',
    insight: 'Health numbers work best as planning signals. This hub keeps estimates readable and reminds users where professional advice matters.',
  },
  maths: {
    icon: <BadgePercent className="h-5 w-5" />,
    kicker: 'Maths calculator hub',
    headline: 'Solve daily maths without friction.',
    summary: 'Handle percentages, averages, ratios, and square roots quickly with exact formula labels and clean result paths.',
    insight: 'Maths tools should feel instant. This hub prioritizes short inputs, obvious formulas, and fast switching between related calculators.',
  },
  'age-date': {
    icon: <CalendarDays className="h-5 w-5" />,
    kicker: 'Age and date calculator hub',
    headline: 'Plan dates, ages, and time windows clearly.',
    summary: 'Convert dates, weeks, hours, and ages without manual counting mistakes or schedule confusion.',
    insight: 'Date planning often starts with a simple question and becomes a workflow. This hub keeps age, days, weeks, and minutes connected.',
  },
};

const CategoryTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = findCategory(slug);

  if (!category) return <NotFound />;

  const meta = categoryHomeMeta[category.slug];
  const featuredTool = category.tools.find((tool) => tool.featured) ?? category.tools[0];
  const categoryArticles = articles
    .filter((article) => article.categorySlug === category.slug)
    .slice(0, 3);

  return (
    <div className="home-page category-home-page">
      <section className="home-hero category-home-hero">
        <div className="home-hero__copy">
          <span className="home-kicker">{meta.icon} {meta.kicker}</span>
          <h1>{meta.headline}</h1>
          <p>{meta.summary}</p>
          <div className="home-hero__actions">
            <Link to={`/tool/${featuredTool.slug}`} className="home-primary-action">
              Start with {featuredTool.title} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ai" className="home-secondary-action">
              Ask AI <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="home-hero__panel">
          <div className="home-panel-top">
            <span><Zap className="h-5 w-5" /></span>
            <div>
              <strong>{category.title} command panel</strong>
              <p>Open a calculator, compare related tools, then read a guide matched to the same category.</p>
            </div>
          </div>
          <div className="home-metric-grid">
            <CategoryMetric value={String(category.tools.length)} label="Tools" />
            <CategoryMetric value={featuredTool.popularity} label="Top reach" />
            <CategoryMetric value={`${categoryArticles.length}+`} label="Guides" />
            <CategoryMetric value="Live" label="Status" />
          </div>
          <Link to={`/blog?category=${category.slug}`} className="home-panel-link">
            Read {category.title} guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <span>{category.title} tools</span>
          <h2>Choose the right calculator</h2>
        </div>
        <div className="category-home-tool-grid">
          {category.tools.map((tool, index) => (
            <CategoryToolCard key={tool.slug} tool={tool} featured={tool.slug === featuredTool.slug || index === 0} />
          ))}
        </div>
      </section>

      <section className="home-section home-split">
        <div>
          <div className="home-section__heading">
            <span>Recommended workflow</span>
            <h2>From input to confident result</h2>
          </div>
          <div className="category-workflow-list">
            <WorkflowStep number="01" title="Start with the featured tool" description={`Use ${featuredTool.title} first when you want the fastest route into this category.`} />
            <WorkflowStep number="02" title="Compare related assumptions" description="Switch between category tools to validate units, ranges, and result interpretation." />
            <WorkflowStep number="03" title="Read a matched guide" description="Use the category blogs to avoid common mistakes and understand what the result means." />
          </div>
        </div>

        <div className="home-insight-card category-home-insight">
          <BarChart3 className="h-8 w-8" />
          <h2>Built like a category homepage</h2>
          <p>{meta.insight}</p>
          <Link to={`/tool/${featuredTool.slug}`}>Open featured tool <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <span>{category.title} blogs</span>
          <h2>Guides connected to this category</h2>
        </div>
        <div className="home-blog-grid">
          {categoryArticles.map((article) => (
            <Link key={article.slug} to={`/blog/${article.slug}`} className="home-blog-card">
              <img src={article.image} alt={article.title} />
              <div>
                <small>{article.readTime}</small>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const CategoryMetric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

const CategoryToolCard: React.FC<{ tool: Tool; featured: boolean }> = ({ tool, featured }) => (
  <Link to={`/tool/${tool.slug}`} className={`category-home-tool-card ${featured ? 'is-featured' : ''}`}>
    <span><Calculator className="h-5 w-5" /></span>
    <small>{tool.popularity}</small>
    <h3>{tool.title}</h3>
    <p>{tool.description}</p>
    <strong>{tool.formulaLabel}</strong>
  </Link>
);

const WorkflowStep: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="category-workflow-step">
    <span>{number}</span>
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default CategoryTemplate;
