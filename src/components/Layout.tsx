import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  HeartPulse,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { categories } from '../data/content';
import { Link } from '../lib/router';
import { useLocation } from '../lib/router-hooks';
import HeaderSearch from './HeaderSearch';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(true);
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);
  const [isWarmMode, setIsWarmMode] = useState(true);
  const location = useLocation();
  const isAiPage = location.pathname === '/ai' || location.pathname === '/tool/ask-ai';

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const activeCategory = useMemo(() => {
    if (location.pathname.includes('finance')) return 'finance';
    if (location.pathname.includes('health')) return 'health';
    if (location.pathname.includes('maths')) return 'maths';
    if (location.pathname.includes('age-date')) return 'age-date';
    return '';
  }, [location.pathname]);

  useEffect(() => {
    setIsSubMenuCollapsed(true);
    setIsBlogMenuOpen(false);
  }, [location.pathname]);

  if (isAiPage) {
    return <>{children}</>;
  }

  return (
    <div className={`workspace-page site-platform ${isWarmMode ? '' : 'workspace-page--dim'}`}>
      <header className={`workspace-header site-platform__header transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="workspace-header__left">
          <Link to="/" className="workspace-logo" aria-label="Calculate Karo home">
            <span className="workspace-brand__mark"><Calculator size={17} strokeWidth={2.2} /></span>
            <span className="workspace-brand__name">Calculate Karo</span>
          </Link>
          <HeaderSearch />
        </div>

        <nav className="workspace-header__nav" aria-label="Primary navigation">
          <div className="workspace-blog-menu">
            <button
              type="button"
              className="workspace-nav-link"
              onClick={() => setIsBlogMenuOpen((open) => !open)}
              aria-expanded={isBlogMenuOpen}
            >
              Blogs <ChevronDown size={21} className={isBlogMenuOpen ? 'rotate-180' : ''} />
            </button>
            {isBlogMenuOpen && (
              <div className="workspace-blog-dropdown">
                <p>Latest guides</p>
                <Link to="/blog">All calculation insights</Link>
                {categories.map((category) => (
                  <Link key={category.slug} to={`/blog?category=${category.slug}`}>{category.title} guides</Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/ai" className="workspace-nav-link">
            Ask AI <Sparkles size={24} fill="currentColor" />
          </Link>

          <button
            type="button"
            className="workspace-theme-toggle"
            onClick={() => setIsWarmMode((warm) => !warm)}
            aria-label={isWarmMode ? 'Switch to dim workspace' : 'Switch to light workspace'}
            aria-pressed={!isWarmMode}
          >
            <span><Sun size={25} /></span>
          </button>

          <button type="button" className="workspace-sign-in">
            Sign in
          </button>
        </nav>
      </header>

      <main className={`workspace-frame site-workspace-frame ${isSubMenuCollapsed ? '' : 'workspace-frame--panel-open'}`}>
        <aside className="workspace-sidebar site-workspace-sidebar" aria-label="Calculator navigation">
          <div className="workspace-sidebar__rail">
            <button
              type="button"
              className="workspace-panel-toggle"
              onClick={() => setIsSubMenuCollapsed((collapsed) => !collapsed)}
              aria-label={isSubMenuCollapsed ? 'Expand tools panel' : 'Collapse tools panel'}
              aria-expanded={!isSubMenuCollapsed}
            >
              <ArrowRight size={44} strokeWidth={1.8} className={isSubMenuCollapsed ? '' : 'rotate-180'} />
            </button>

            <div className="workspace-rail-actions site-rail-actions">
              <RailLink to="/" label="Home" active={location.pathname === '/'} icon={<Calculator size={20} />} />
              <RailLink to="/category/finance" label="Finance" active={activeCategory === 'finance'} icon={<CircleDollarSign size={20} />} />
              <RailLink to="/category/health" label="Health" active={activeCategory === 'health'} icon={<HeartPulse size={20} />} />
              <RailLink to="/category/maths" label="Maths" active={activeCategory === 'maths'} icon={<BarChart3 size={20} />} />
              <RailLink to="/category/age-date" label="Date" active={activeCategory === 'age-date'} icon={<CalendarDays size={20} />} />
            </div>
          </div>

          <div className="workspace-sidebar__panel">
            <div className="workspace-panel-heading">
              <div>
                <span>Explore</span>
                <h2>All tools</h2>
              </div>
              <button type="button" onClick={() => setIsSubMenuCollapsed(true)} aria-label="Close tools panel">
                <X size={20} />
              </button>
            </div>

            <div className="workspace-panel-content">
              {categories.map((category) => (
                <div key={category.slug} className="workspace-category-group">
                  <Link to={`/category/${category.slug}`}>{category.title}</Link>
                  <span>{category.tools.length}</span>
                  <div>
                    {category.tools.slice(0, 4).map((tool) => (
                      <Link key={tool.slug} to={`/tool/${tool.slug}`}>{tool.title}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="site-workspace-main flex flex-col" aria-label="Page content">
          <Breadcrumbs />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
};

const RailLink: React.FC<{ to: string; label: string; icon: React.ReactNode; active?: boolean }> = ({ to, label, icon, active = false }) => (
  <Link to={to} className={`workspace-rail-link ${active ? 'is-active' : ''}`} title={label} aria-label={label}>
    {icon}
  </Link>
);

export default Layout;
