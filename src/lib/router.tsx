import React, { useEffect, useMemo, useState } from 'react';
import { readLocation, RouterContext, useRouterContext } from './router-context';

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
};

export const Router: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const handleNavigation = () => setLocation(readLocation());
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const value = useMemo(() => ({ location, params: {} }), [location]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const ParamsProvider: React.FC<{ children: React.ReactNode; params: Record<string, string> }> = ({ children, params }) => {
  const parentContext = useRouterContext();
  const value = useMemo(() => ({ ...parentContext, params }), [parentContext, params]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const Link: React.FC<LinkProps> = ({ to, onClick, target, children, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      target ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      !to.startsWith('/')
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={to} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
