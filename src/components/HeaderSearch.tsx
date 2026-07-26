import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useLocation } from '../lib/router-hooks';

const HeaderSearch: React.FC = () => {
  const { pathname, search } = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (pathname === '/search') {
      setQuery(new URLSearchParams(search).get('q') ?? '');
      return;
    }
    setQuery('');
  }, [pathname, search]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const target = trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : '/search';
    window.history.pushState(null, '', target);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <form className="workspace-search-pill" role="search" onSubmit={submitSearch}>
      <Search size={16} />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search calculators, categories, blogs"
        aria-label="Search calculators, categories, and blogs"
      />
    </form>
  );
};

export default HeaderSearch;
