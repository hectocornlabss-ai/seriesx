import { useState, useEffect } from 'react';

export function usePathRouter() {
  const getInitialPath = () => {
    const pathname = window.location.pathname;
    if (!pathname || pathname === '' || pathname === '/index.html') return '/';
    return pathname;
  };

  const [path, setPath] = useState(getInitialPath());
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      setPath(!currentPath || currentPath === '' || currentPath === '/index.html' ? '/' : currentPath);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (toPath, params = {}) => {
    let url = toPath;
    const paramEntries = Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '');
    if (paramEntries.length > 0) {
      const search = new URLSearchParams(paramEntries).toString();
      url += '?' + search;
    }
    window.history.pushState({}, '', url);
    setPath(toPath);
    setSearchParams(new URLSearchParams(paramEntries));
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { path, searchParams, navigate };
}
