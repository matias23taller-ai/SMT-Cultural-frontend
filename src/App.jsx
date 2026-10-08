import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PageHeader from './components/PageHeader.jsx';
import Seo from './components/Seo.jsx';
import Mantenimiento from './pages/Mantenimiento.jsx';
import Rutas from "./components/routes/Rutas.jsx"; 

const MODO_MANTENIMIENTO = false;

const datosFalsos = {
  solicitudes: [
    { id: 'SOL-001', tipo: 'Limpieza', ubicacion: 'Punto de práctica A', prioridad: 'Media', estado: 'Finalizado' },
    { id: 'SOL-002', tipo: 'Imbornal/desagüe', ubicacion: 'Punto de práctica B', prioridad: 'Alta', estado: 'Pendiente' },
    { id: 'SOL-003', tipo: 'Desagote', ubicacion: 'Domicilio de práctica C', prioridad: 'Media', estado: 'Pendiente' },
    { id: 'SOL-004', tipo: 'Inspección', ubicacion: 'Punto de práctica D', prioridad: 'Baja', estado: 'Pendiente' },
  ],
  actas: [
    { id: 'REG-001', solicitudId: 'SOL-001', numero: 'FICTICIA-001', inspector: 'Inspector de práctica', norma: 'Referencia ficticia', articulo: 'A completar', observaciones: 'Ejemplo de acta', documento: 'Copia sin adjunto', estado: 'Pendiente de derivación' },
  ],
  imbornales: [
    { id: 'IMB-001', ubicacion: 'Punto de práctica B', tipo: 'Imbornal', limpieza: 'Obstruido', estructura: 'Dañado' },
    { id: 'IMB-002', ubicacion: 'Punto de práctica E', tipo: 'Imbornal', limpieza: 'Limpio', estructura: 'Reja faltante' },
  ],
  camiones: [
    { id: 'CAM-001', nombre: 'Atmosférico de práctica 1' },
    { id: 'CAM-002', nombre: 'Atmosférico de práctica 2' },
  ],
};

const PAGINAS = [
  { ruta: '/inicio', nombre: 'Inicio', titulo: 'Gestión de Limpieza Urbana', descripcion: 'Resumen de solicitudes, inspecciones, imbornales y desagotes en el prototipo SIGLU para San Miguel de Tucumán.' },
  { ruta: '/solicitudes', nombre: 'Solicitudes', titulo: 'Solicitudes de limpieza urbana', descripcion: 'Registrá pedidos de limpieza, inspección, mantenimiento de imbornales y desagote, y consultá su seguimiento operativo.' },
  { ruta: '/inspecciones', nombre: 'Inspecciones', titulo: 'Inspecciones y registro de actas', descripcion: 'Relacioná las referencias de actas con cada solicitud y seguí su estado administrativo en el prototipo SIGLU.' },
  { ruta: '/imbornales', nombre: 'Imbornales', titulo: 'Mantenimiento de imbornales y desagües', descripcion: 'Registrá instalaciones y controlá por separado su limpieza y su estado físico para organizar el mantenimiento.' },
  { ruta: '/desagotes', nombre: 'Desagotes', titulo: 'Turnos y camiones de desagote', descripcion: 'Programá pedidos de desagote con camiones disponibles y revisá horarios para evitar superposiciones de turnos.' },
];

const PAGINA_NO_ENCONTRADA = { nombre: 'Error 404', titulo: 'Error 404: página no encontrada', descripcion: 'La dirección solicitada no corresponde a una página del prototipo SIGLU.' };
const PAGINA_MANTENIMIENTO = { nombre: 'Sistema en mantenimiento', titulo: 'Sistema en mantenimiento', descripcion: 'El acceso a los módulos de SIGLU se encuentra temporalmente suspendido por tareas de mantenimiento.' };

export default function App() {
  const location = useLocation();
  
  const rutaActual = location.pathname.replace(/\/+$/, '') || '/';
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
          <header className="bg-primary bg-gradient text-white py-3 shadow-sm">
            <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="d-flex align-items-center gap-3">
                <img src="/logo-msmt.png" alt="Ciudad San Miguel de Tucumán" style={{ width: '50px' }} />
                <div>
                  <p className="h3 fw-bold mb-0">SIGLU</p>
                  <p className="small mb-0 opacity-75">Gestión de Limpieza Urbana</p>
                </div>
              </div>
            </div>
          </header>
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

      {!esRutaLogin && (
        <footer className="container pb-4 text-secondary small">
          © 2026 Gestión de Limpieza Urbana. Todos los derechos reservados.
        </footer>
      )}
    </div>
  );
}