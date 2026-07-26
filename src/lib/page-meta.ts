import { findArticle, findCategory, findTool } from '../data/content';

export const getPageMeta = (pathname: string, search = '') => {
  if (pathname === '/') {
    return {
      title: 'Calculate Karo | Ask, Calculate, Decide',
      description: 'Search calculators or ask AI for clear guidance across finance, health, maths, and date planning.',
    };
  }

  if (pathname === '/ai') {
    return {
      title: 'Ask AI | Calculate Karo',
      description: 'Ask Calculate Karo AI to choose a calculator, check inputs, and explain results.',
    };
  }

  if (pathname === '/search') {
    const query = new URLSearchParams(search).get('q')?.trim();
    return {
      title: `${query ? `Search: ${query}` : 'Search'} | Calculate Karo`,
      description: 'Search calculators, categories, and professional guides on Calculate Karo.',
    };
  }

  if (pathname === '/blog') {
    const category = findCategory(new URLSearchParams(search).get('category') ?? undefined);
    return {
      title: `${category ? `${category.title} Guides` : 'Calculation Insights'} | Calculate Karo`,
      description: 'Professional guides for using calculators confidently.',
    };
  }

  const categoryMatch = pathname.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    const category = findCategory(categoryMatch[1]);
    if (category) {
      return {
        title: `${category.title} Calculators | Calculate Karo`,
        description: category.description,
      };
    }
  }

  const toolMatch = pathname.match(/^\/tool\/([^/]+)$/);
  if (toolMatch) {
    const tool = findTool(toolMatch[1]);
    if (tool) {
      return {
        title: `${tool.title} | Calculate Karo`,
        description: tool.description,
      };
    }
    if (toolMatch[1] === 'ask-ai') {
      return {
        title: 'Ask AI Guide | Calculate Karo',
        description: 'Guidance for choosing the right calculator.',
      };
    }
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const article = findArticle(blogMatch[1]);
    if (article) {
      return {
        title: `${article.title} | Calculate Karo`,
        description: article.excerpt,
      };
    }
  }

  return {
    title: 'Page Not Found | Calculate Karo',
    description: 'The requested page could not be found.',
  };
};
