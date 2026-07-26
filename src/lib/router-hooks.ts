import { useMemo } from 'react';
import { useRouterContext } from './router-context';

export const useLocation = () => useRouterContext().location;

export const useParams = <T extends Record<string, string | undefined>>() =>
  useRouterContext().params as T;

export const useSearchParams = () => {
  const { search } = useLocation();
  return [useMemo(() => new URLSearchParams(search), [search])] as const;
};
