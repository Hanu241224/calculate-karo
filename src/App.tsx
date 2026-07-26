import type React from 'react';
import { useEffect } from 'react';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { getPageMeta } from './lib/page-meta';
import { ParamsProvider, Router } from './lib/router';
import { useLocation } from './lib/router-hooks';
import BlogArchiveTemplate from './pages/BlogArchiveTemplate';
import BlogPostTemplate from './pages/BlogPostTemplate';
import CategoryTemplate from './pages/CategoryTemplate';
import AIPage from './pages/AIPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SearchTemplate from './pages/SearchTemplate';
import ToolTemplate from './pages/ToolTemplate';
import InfoPage from './pages/InfoPage';

type RouteMatch = {
  element: React.ReactNode;
  params: Record<string, string>;
};

const AppRoutes = () => {
  const { pathname, search } = useLocation();
  const routeMatch = matchRoute(pathname);

  useEffect(() => {
    const meta = getPageMeta(pathname, search);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [pathname, search]);

  return (
    <Layout>
      <ParamsProvider params={routeMatch.params}>
        {routeMatch.element}
      </ParamsProvider>
    </Layout>
  );
};

const matchRoute = (pathname: string): RouteMatch => {
  if (pathname === '/') return { element: <Home />, params: {} };
  if (pathname === '/ai' || pathname === '/tool/ask-ai') return { element: <AIPage />, params: {} };
  if (pathname === '/search') return { element: <SearchTemplate />, params: {} };
  if (pathname === '/blog') return { element: <BlogArchiveTemplate />, params: {} };

  const categoryMatch = pathname.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) return { element: <CategoryTemplate />, params: { slug: categoryMatch[1] } };

  const toolMatch = pathname.match(/^\/tool\/([^/]+)$/);
  if (toolMatch) return { element: <ToolTemplate />, params: { slug: toolMatch[1] } };

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return { element: <BlogPostTemplate />, params: { slug: blogMatch[1] } };

  const pageMatch = pathname.match(/^\/page\/([^/]+)$/);
  if (pageMatch) {
    const slug = pageMatch[1];
    const titles: Record<string, string> = {
      'about': 'About Us',
      'disclaimer': 'Disclaimer',
      'privacy-policy': 'Privacy Policy',
      'terms': 'Terms of Service',
      'contact-us': 'Contact Us',
      'suggestions': 'Suggestions',
      'feedback': 'Feedback',
      'authors-and-editors': 'Authors & Editors'
    };

    const title = titles[slug] || 'Information';
    const content = [
      `Welcome to the ${title} page.`,
      `This platform is dedicated to providing high-quality, AI-powered calculation tools for everyone in India and beyond.`,
      `We strive for accuracy and reliability in all our tools. If you have any questions regarding this specific topic, please reach out to our support team.`
    ];
    return { element: <InfoPage title={title} content={content} />, params: { slug } };
  }

  return { element: <NotFound />, params: {} };
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default App;
