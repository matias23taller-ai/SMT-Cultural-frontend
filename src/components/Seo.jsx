import { useEffect } from 'react';

// Metadatos básicos de una SPA. Se actualizan al navegar con React Router.
export default function Seo({ titulo, descripcion, noIndex = false }) {
  useEffect(() => {
    document.title = `${titulo} | SIGLU`;

    function actualizarMeta(atributo, nombre, contenido) {
      let etiqueta = document.head.querySelector(
        `meta[${atributo}="${nombre}"]`,
      );
      if (!etiqueta) {
        etiqueta = document.createElement('meta');
        etiqueta.setAttribute(atributo, nombre);
        document.head.appendChild(etiqueta);
      }
      etiqueta.setAttribute('content', contenido);
    }

    actualizarMeta('name', 'description', descripcion);
    actualizarMeta(
      'name',
      'robots',
      noIndex ? 'noindex,follow' : 'index,follow',
    );
    actualizarMeta('property', 'og:title', document.title);
    actualizarMeta('property', 'og:description', descripcion);
    actualizarMeta('property', 'og:type', 'website');
  }, [titulo, descripcion, noIndex]);

  return null;
}
