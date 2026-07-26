import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Calculator, ChevronDown, Clock, DollarSign, Heart, Menu, Search, Sparkles, TrendingUp, X } from 'lucide-react';
import { articles, categories, tools } from '../data/content';
import type { CategorySlug } from '../data/content';
import { Link } from '../lib/router';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  showMobileMenuButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen, showMobileMenuButton = true }) => {
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [activeToolsCategory, setActiveToolsCategory] = useState<CategorySlug>(categories[0].slug);
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showAccountNotice, setShowAccountNotice] = useState(false);

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return tools
      .filter((tool) => `${tool.title} ${tool.description}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 5);
  }, [query]);

  const activeCategory = categories.find((category) => category.slug === activeToolsCategory) ?? categories[0];
  const featuredTool = activeCategory.tools.find((tool) => tool.featured) ?? activeCategory.tools[0];
  const activeArticles = articles
    .filter((article) => article.categorySlug === activeCategory.slug)
    .slice(0, 3);

  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b border-gray-800 bg-gray-950/95 px-4 backdrop-blur-xl md:px-5">
      <div className="flex items-center gap-3">
        {showMobileMenuButton && (
          <button
            className="rounded-lg p-1.5 -ml-1.5 text-gray-300 smooth-control hover:bg-gray-800 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 smooth-control hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-500 bg-gray-950 text-xs font-semibold text-gray-100">
            <span className="text-orange-400">C</span>k
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-lg font-semibold text-white">Calculate</span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase text-gray-400">Karo</span>
          </div>
        </Link>
      </div>

      <div className="mx-4 flex-1 md:mx-8 md:max-w-2xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 md:pl-3">
            <Search className="h-3.5 w-3.5 text-gray-400 md:h-4 md:w-4" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="block h-9 w-full rounded-lg border border-gray-800 bg-gray-900 pl-8 pr-3 text-xs font-medium text-gray-100 outline-none smooth-control placeholder:text-gray-500 focus:border-orange-500 focus:bg-gray-950 focus:ring-2 focus:ring-orange-100 md:pl-10"
            placeholder="Search tools..."
            aria-label="Search calculators"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-2.5 sm:flex">
            <span className="rounded border border-gray-800 bg-gray-950 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">Ctrl K</span>
          </div>
          {query && (
            <div className="absolute left-0 right-0 top-11 z-50 rounded-lg border border-gray-800 bg-gray-950 p-2 shadow-lg shadow-gray-950/5">
              {searchResults.length > 0 ? (
                searchResults.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/tool/${tool.slug}`}
                    onClick={() => setQuery('')}
                    className="block rounded-lg px-3 py-2 smooth-control hover:bg-orange-500/10"
                  >
                    <span className="block text-xs font-semibold text-white">{tool.title}</span>
                    <span className="block truncate text-[11px] font-medium text-gray-400">{tool.description}</span>
                  </Link>
                ))
              ) : (
                <div className="px-3 py-2 text-xs font-medium text-gray-400">No calculators found. Try EMI, BMI, GST, or percentage.</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div
          className="hidden h-14 items-center md:flex"
          onMouseEnter={() => {
            setIsToolsMenuOpen(true);
            setIsBlogMenuOpen(false);
          }}
          onMouseLeave={() => setIsToolsMenuOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsToolsMenuOpen((isOpen) => !isOpen)}
            className={`flex h-14 items-center border-b-2 px-1 text-sm font-semibold smooth-control ${
              isToolsMenuOpen ? 'border-[#f4510b] text-[#f4510b]' : 'border-transparent text-gray-200 hover:text-[#f4510b]'
            }`}
            aria-expanded={isToolsMenuOpen}
          >
            All Tools <ChevronDown className={`ml-1 h-4 w-4 smooth-control ${isToolsMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className={`absolute left-0 top-14 z-40 w-full origin-top overflow-hidden bg-black/30 smooth-control ${isToolsMenuOpen ? 'visible max-h-[560px] opacity-100 pointer-events-auto' : 'invisible max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="mx-auto max-w-[1320px] border border-t-0 border-gray-800 bg-gray-950 shadow-xl shadow-gray-950/20">
              <div className="flex h-9 items-center gap-5 overflow-x-auto border-b border-gray-800 px-6">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onMouseEnter={() => setActiveToolsCategory(category.slug)}
                    onFocus={() => setActiveToolsCategory(category.slug)}
                    onClick={() => setActiveToolsCategory(category.slug)}
                    className={`relative h-9 whitespace-nowrap text-[13px] font-semibold smooth-control ${
                      activeToolsCategory === category.slug ? 'text-[#f4510b]' : 'text-gray-200 hover:text-[#f4510b]'
                    }`}
                  >
                    {category.title}
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#f4510b] smooth-control ${activeToolsCategory === category.slug ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>

              <div className="grid gap-8 px-6 py-6 lg:grid-cols-[1fr_1fr_1fr_0.92fr]">
                <MegaMenuColumn
                  title={`${activeCategory.title} Calculators`}
                  items={activeCategory.tools.map((tool) => ({
                    label: tool.title,
                    to: `/tool/${tool.slug}`,
                  }))}
                  onNavigate={() => setIsToolsMenuOpen(false)}
                />
                <MegaMenuColumn
                  title="Popular Tools"
                  items={tools
                    .filter((tool) => tool.featured)
                    .map((tool) => ({
                      label: tool.title,
                      to: `/tool/${tool.slug}`,
                    }))}
                  onNavigate={() => setIsToolsMenuOpen(false)}
                />
                <MegaMenuColumn
                  title={`${activeCategory.title} Guides`}
                  items={activeArticles.map((article) => ({
                    label: article.title,
                    to: `/blog/${article.slug}`,
                  }))}
                  onNavigate={() => setIsToolsMenuOpen(false)}
                />

                <div className="rounded-lg bg-gray-900 px-6 py-5">
                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-3 text-[13px] font-semibold text-white">Shop by Category</h3>
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/category/${category.slug}`}
                          onClick={() => setIsToolsMenuOpen(false)}
                          className="block py-1.5 text-[13px] font-medium leading-5 text-gray-300 smooth-control hover:text-[#f4510b]"
                        >
                          {category.title} Tools
                        </Link>
                      ))}
                    </div>
                    <div>
                      <h3 className="mb-3 text-[13px] font-semibold text-white">Featured Tool</h3>
                      <Link
                        to={`/tool/${featuredTool.slug}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                        className="block text-[13px] font-medium leading-5 text-gray-300 smooth-control hover:text-[#f4510b]"
                      >
                        {featuredTool.title}
                      </Link>
                    </div>
                    <div>
                      <h3 className="mb-3 text-[13px] font-semibold text-white">Project Help</h3>
                      <Link
                        to="/tool/ask-ai"
                        onClick={() => setIsToolsMenuOpen(false)}
                        className="block text-[13px] font-medium leading-5 text-gray-300 smooth-control hover:text-[#f4510b]"
                      >
                        Ask AI Guide
                      </Link>
                    </div>
                    <div>
                      <h3 className="mb-3 text-[13px] font-semibold text-white">Calculate Karo Deals</h3>
                      <Link
                        to="/blog"
                        onClick={() => setIsToolsMenuOpen(false)}
                        className="block text-[13px] font-medium leading-5 text-gray-300 smooth-control hover:text-[#f4510b]"
                      >
                        Latest Guides
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden h-14 items-center md:flex"
          onMouseEnter={() => {
            setIsBlogMenuOpen(true);
            setIsToolsMenuOpen(false);
          }}
          onMouseLeave={() => setIsBlogMenuOpen(false)}
        >
          <Link to="/blog" className={`flex items-center text-sm font-semibold smooth-control ${isBlogMenuOpen ? 'text-[#f4510b]' : 'text-gray-300 hover:text-[#f4510b]'}`}>
            Blogs <ChevronDown className={`ml-1 h-4 w-4 smooth-control ${isBlogMenuOpen ? 'rotate-180' : ''}`} />
          </Link>

          <div className={`absolute left-0 top-14 z-40 w-full origin-top overflow-hidden border-b border-gray-800 bg-gray-950 smooth-control ${isBlogMenuOpen ? 'visible max-h-[500px] opacity-100 pointer-events-auto' : 'invisible max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 p-8 md:pl-72">
              <div className="col-span-3 space-y-4">
                <h3 className="eyebrow flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.slice(0, 3).map((category) => (
                    <Link key={category.slug} to={`/blog?category=${category.slug}`} className="group flex items-center gap-3 rounded-lg p-2 -mx-2 smooth-control hover:bg-orange-500/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-orange-500/10 text-orange-400 group-hover:bg-gray-950">
                        {category.slug === 'finance' && <DollarSign className="w-4 h-4" />}
                        {category.slug === 'maths' && <Calculator className="w-4 h-4" />}
                        {category.slug === 'health' && <Heart className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-semibold text-gray-200 group-hover:text-[#f4510b]">{category.title} Guides</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-5 space-y-4 border-l border-gray-800 pl-8">
                <h3 className="eyebrow flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Featured
                </h3>
                <Link to={`/blog/${articles[0].slug}`} className="group block">
                  <div className="mb-3 h-40 overflow-hidden rounded-lg border border-gray-800">
                    <img src={articles[0].image} alt={articles[0].title} className="h-full w-full object-cover smooth-control group-hover:scale-[1.03]" />
                  </div>
                  <h4 className="mb-1 text-base font-semibold text-white group-hover:text-[#f4510b]">{articles[0].title}</h4>
                  <p className="line-clamp-2 text-xs font-medium text-gray-400">{articles[0].excerpt}</p>
                </Link>
              </div>

              <div className="col-span-4 space-y-4 border-l border-gray-800 pl-8">
                <h3 className="eyebrow flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Recent
                </h3>
                <div className="flex flex-col gap-4">
                  {articles.slice(1, 4).map((article) => (
                    <Link to={`/blog/${article.slug}`} key={article.slug} className="group flex gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-800 bg-gray-800">
                        <img src={article.image} alt={article.title} className="h-full w-full object-cover smooth-control group-hover:opacity-80" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="mb-1 line-clamp-2 text-xs font-semibold text-white group-hover:text-[#f4510b]">{article.title}</h4>
                        <span className="text-[11px] font-semibold text-gray-400">{article.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/tool/ask-ai" className="hidden items-center gap-1.5 rounded-lg border border-orange-100 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-[#f4510b] smooth-control hover:bg-orange-500/20 sm:flex">
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI Guide
        </Link>
        <button
          onClick={() => setShowAccountNotice((isOpen) => !isOpen)}
          className="whitespace-nowrap rounded-lg bg-gray-950 px-3 py-1.5 text-xs font-semibold text-white smooth-control hover:bg-black active:scale-95 md:px-4"
        >
          Account
        </button>
      </div>
      {showAccountNotice && (
        <div className="absolute right-4 top-16 w-72 rounded-lg border border-gray-800 bg-gray-950 p-4 shadow-lg shadow-gray-950/5">
          <h3 className="mb-1 text-sm font-semibold text-white">Account access</h3>
          <p className="text-xs font-medium leading-relaxed text-gray-400">Saved calculators and history are prepared for a future secure sign-in flow. All calculators are available now without an account.</p>
        </div>
      )}
    </nav>
  );
};

const MegaMenuColumn: React.FC<{
  title: string;
  items: Array<{ label: string; to: string }>;
  onNavigate: () => void;
}> = ({ title, items, onNavigate }) => (
  <div>
    <Link to={items[0]?.to ?? '/'} onClick={onNavigate} className="mb-2 inline-flex items-center gap-1 text-[13px] font-semibold leading-5 text-white smooth-control hover:text-[#f4510b]">
      {title} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
    <div className="space-y-1.5">
      {items.map((item) => (
        <Link
          key={`${item.to}-${item.label}`}
          to={item.to}
          onClick={onNavigate}
          className="block text-[13px] font-medium leading-5 text-gray-300 smooth-control hover:text-[#f4510b]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

export default Navbar;
