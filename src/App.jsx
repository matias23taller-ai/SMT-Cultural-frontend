import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PageHeader from './components/PageHeader.jsx';
import Seo from './components/Seo.jsx';
import Mantenimiento from './pages/Mantenimiento.jsx';
import Rutas from "./components/routes/Rutas.jsx"; 
import { MODO_MANTENIMIENTO, datosFalsos, PAGINAS, PAGINA_NO_ENCONTRADA, PAGINA_MANTENIMIENTO } from './components/Data.jsx';
import Header from './components/Header.jsx';

export default function App() {
  const location = useLocation();
  
  let rutaActual = location.pathname;
  if (rutaActual === '/') {
    rutaActual = '/inicio'; 
  }
  const pagina = PAGINAS.find((item) => item.ruta === rutaActual);
  const enMantenimiento = MODO_MANTENIMIENTO || rutaActual === '/mantenimiento';
  const contenidoPagina = enMantenimiento ? PAGINA_MANTENIMIENTO : pagina || PAGINA_NO_ENCONTRADA;
  
  const esRutaLogin = location.pathname === '/';

  return (
    <div className="bg-light min-vh-100">
      <Seo
        titulo={esRutaLogin ? "Login - SIGLU" : contenidoPagina.titulo}
        descripcion={contenidoPagina.descripcion}
        noIndex={!pagina || enMantenimiento}
      />
      
      {!esRutaLogin && !enMantenimiento && (
        <>
          <Header />
          <Navbar paginas={PAGINAS} />
        </>
      )}

      <main className={esRutaLogin ? "" : "container py-4"}>
        {!esRutaLogin && !enMantenimiento && (
          <PageHeader
            titulo={contenidoPagina.nombre}
            descripcion={contenidoPagina.descripcion}
          />
        )}

        {MODO_MANTENIMIENTO ? <Mantenimiento /> : <Rutas datos={datosFalsos} />}
      </main>

      <Footer />
    </div>
  );
}