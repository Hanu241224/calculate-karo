import React from 'react';
import { ArrowRight, BookOpen, Calculator, FolderSearch, Search } from 'lucide-react';
import { articles, categories, tools } from '../data/content';
import { Link } from '../lib/router';
import { useSearchParams } from '../lib/router-hooks';

const SearchTemplate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const normalizedQuery = query.toLowerCase();

  const matchedTools = normalizedQuery
    ? tools.filter((tool) => `${tool.title} ${tool.description} ${tool.formulaLabel}`.toLowerCase().includes(normalizedQuery))
    : tools.filter((tool) => tool.featured);

  const matchedCategories = normalizedQuery
    ? categories.filter((category) => `${category.title} ${category.description}`.toLowerCase().includes(normalizedQuery))
    : categories;

  const matchedArticles = normalizedQuery
    ? articles.filter((article) => `${article.title} ${article.excerpt}`.toLowerCase().includes(normalizedQuery))
    : articles.slice(0, 6);

  const resultCount = matchedTools.length + matchedCategories.length + matchedArticles.length;

  return (
    <div className="search-page">
      <section className="search-hero">
        <span><Search className="h-4 w-4" /> Search template</span>
        <h1>{query ? `Results for "${query}"` : 'Search Calculate Karo'}</h1>
        <p>
          Find matching calculators, categories, and professional guides from the same orange workspace.
        </p>
        <strong>{resultCount} result{resultCount === 1 ? '' : 's'} found</strong>
      </section>

      <section className="search-results-grid">
        <SearchGroup icon={<Calculator className="h-5 w-5" />} title="Tools" count={matchedTools.length}>
          {matchedTools.map((tool) => (
            <Link key={tool.slug} to={`/tool/${tool.slug}`} className="search-result-card">
              <div>
                <h2>{tool.title}</h2>
                <p>{tool.description}</p>
                <small>{tool.formulaLabel}</small>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          ))}
        </SearchGroup>

        <SearchGroup icon={<FolderSearch className="h-5 w-5" />} title="Categories" count={matchedCategories.length}>
          {matchedCategories.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`} className="search-result-card">
              <div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
                <small>{category.tools.length} calculators</small>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          ))}
        </SearchGroup>

        <SearchGroup icon={<BookOpen className="h-5 w-5" />} title="Blogs" count={matchedArticles.length}>
          {matchedArticles.slice(0, 8).map((article) => (
            <Link key={article.slug} to={`/blog/${article.slug}`} className="search-result-card">
              <div>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <small>{article.readTime}</small>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          ))}
        </SearchGroup>
      </section>
    </div>
  );
};

const SearchGroup: React.FC<{ icon: React.ReactNode; title: string; count: number; children: React.ReactNode }> = ({ icon, title, count, children }) => (
  <div className="search-group">
    <div className="search-group__heading">
      <span>{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{count} match{count === 1 ? '' : 'es'}</p>
      </div>
    </div>
    <div className="search-group__list">
      {count > 0 ? children : <div className="search-empty">No matches in this section.</div>}
    </div>
  </div>
);

export default SearchTemplate;
