import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryTemplate from './pages/CategoryTemplate';
import ToolTemplate from './pages/ToolTemplate';
import BlogArchiveTemplate from './pages/BlogArchiveTemplate';
import BlogPostTemplate from './pages/BlogPostTemplate';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryTemplate />} />
          <Route path="/tool/:slug" element={<ToolTemplate />} />
          <Route path="/blog" element={<BlogArchiveTemplate />} />
          <Route path="/blog/:slug" element={<BlogPostTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
