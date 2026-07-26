import React from 'react';
import { ArrowRight, BadgePercent, BarChart3, Calculator, CalendarDays, HeartPulse, Landmark, Sparkles, Zap } from 'lucide-react';
import { articles, categories, tools } from '../data/content';
import type { CategorySlug } from '../data/content';
import { Link } from '../lib/router';

const iconMap: Record<CategorySlug, React.ReactNode> = {
  finance: <Landmark className="h-5 w-5" />,
  health: <HeartPulse className="h-5 w-5" />,
  maths: <BadgePercent className="h-5 w-5" />,
  'age-date': <CalendarDays className="h-5 w-5" />,
};

const Home: React.FC = () => {
  const featuredTools = tools.filter((tool) => tool.featured);
  const leadTool = featuredTools[0] ?? tools[0];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="home-kicker"><Sparkles className="h-4 w-4" /> Professional calculator platform</span>
          <h1>Fast, clear calculators for everyday decisions.</h1>
          <p>
            Calculate Karo brings finance, health, maths, and date tools into one polished workspace with transparent formulas, practical guides, and fast paths to the right answer.
          </p>
          <div className="home-hero__actions">
            <Link to={`/tool/${leadTool.slug}`} className="home-primary-action">
              Start with {leadTool.title} <ArrowRight className="h-4 w-4" />
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
              <strong>Smart tool router</strong>
              <p>Pick a category, compare tools, and continue with guides matched to your calculation.</p>
            </div>
          </div>
          <div className="home-metric-grid">
            <HomeMetric value={String(tools.length)} label="Calculators" />
            <HomeMetric value={String(categories.length)} label="Categories" />
            <HomeMetric value={`${articles.length}+`} label="Guides" />
            <HomeMetric value="Live" label="Results" />
          </div>
          <Link to="/blog" className="home-panel-link">
            Browse latest guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <span>Categories</span>
          <h2>Choose the calculation area</h2>
        </div>
        <div className="home-category-grid">
          {categories.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`} className="home-category-card">
              <span>{iconMap[category.slug]}</span>
              <small>{category.tools.length} tools</small>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-split">
        <div>
          <div className="home-section__heading">
            <span>Featured tools</span>
            <h2>Start with the most-used calculators</h2>
          </div>
          <div className="home-tool-list">
            {featuredTools.map((tool) => (
              <Link key={tool.slug} to={`/tool/${tool.slug}`} className="home-tool-row">
                <span><Calculator className="h-5 w-5" /></span>
                <div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
                <strong>{tool.popularity}</strong>
              </Link>
            ))}
          </div>
        </div>

        <div className="home-insight-card">
          <BarChart3 className="h-8 w-8" />
          <h2>Designed for repeat use</h2>
          <p>
            Each page connects calculators, category context, and tool-specific blogs so users can move from quick input to confident interpretation.
          </p>
          <Link to="/category/finance">Explore finance tools <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__heading">
          <span>Latest blogs</span>
          <h2>Professional guides for better inputs</h2>
        </div>
        <div className="home-blog-grid">
          {articles.slice(0, 3).map((article) => (
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

const HomeMetric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

export default Home;
