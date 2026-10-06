import { useEffect } from 'react';

export default function Seo({ titulo }) {
  useEffect(() => {
    document.title = titulo || 'SIGLU';
  }, [titulo]);

  return null;
}