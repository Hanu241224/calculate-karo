import { createContext, useContext } from 'react';

export type RouterLocation = {
  pathname: string;
  search: string;
  hash: string;
};

export type RouterContextValue = {
  location: RouterLocation;
  params: Record<string, string>;
};

export const RouterContext = createContext<RouterContextValue | null>(null);

export const readLocation = (): RouterLocation => ({
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
});

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('Router hooks must be used inside Router.');
  }
  return context;
};
