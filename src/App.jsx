import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PageHeader from './components/PageHeader.jsx';
import Seo from './components/Seo.jsx';
import Login from './components/Login.jsx';
import Inicio from './pages/Inicio.jsx';
import Solicitudes from './pages/Solicitudes.jsx';
import Inspecciones from './pages/Inspecciones.jsx';
import Imbornales from './pages/Imbornales.jsx';
import Desagotes from './pages/Desagotes.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import Mantenimiento from './pages/Mantenimiento.jsx';
import { fechaHoy, registrarMovimiento, siguienteId } from './utils/helpers.js';
import { validarTurno } from './utils/scheduling.js';

const MODO_MANTENIMIENTO = false;

function crearDatosIniciales() {
  const fecha = fechaHoy();
  return {
    version: 1,
    solicitudes: [
      {
        id: 'SOL-001',
        tipo: 'Limpieza',
        ubicacion: 'Punto de práctica A',
        descripcion:
          'Retiro de residuos realizado. El seguimiento del acta continúa.',
        prioridad: 'Media',
        estado: 'Finalizado',
        fecha,
        contacto: '',
        imbornalId: '',
        historial: [],
      },
      {
        id: 'SOL-002',
        tipo: 'Imbornal/desagüe',
        ubicacion: 'Punto de práctica B',
        descripcion: 'Se necesita limpieza y revisión de una reja dañada.',
        prioridad: 'Alta',
        estado: 'Pendiente',
        fecha,
        contacto: '',
        imbornalId: 'IMB-001',
        historial: [],
      },
      {
        id: 'SOL-003',
        tipo: 'Desagote',
        ubicacion: 'Domicilio de práctica C',
        descripcion: 'Pedido de desagote pendiente de programación.',
        prioridad: 'Media',
        estado: 'Pendiente',
        fecha,
        contacto: '',
        imbornalId: '',
        historial: [],
      },
      {
        id: 'SOL-004',
        tipo: 'Inspección',
        ubicacion: 'Punto de práctica D',
        descripcion: 'Visita de inspección pendiente.',
        prioridad: 'Baja',
        estado: 'Pendiente',
        fecha,
        contacto: '',
        imbornalId: '',
        historial: [],
      },
    ],
    actas: [
      {
        id: 'REG-001',
        solicitudId: 'SOL-001',
        numero: 'FICTICIA-001',
        fecha,
        inspector: 'Inspector de práctica',
        norma: 'Referencia ficticia para aprendizaje',
        articulo: 'A completar',
        observaciones:
          'Ejemplo de acta pendiente aunque la limpieza ya finalizó.',
        documento: 'Copia de práctica sin adjunto',
        estado: 'Pendiente de derivación',
      },
    ],
    imbornales: [
      {
        id: 'IMB-001',
        ubicacion: 'Punto de práctica B',
        tipo: 'Imbornal',
        limpieza: 'Obstruido',
        estructura: 'Dañado',
        actualizado: fecha,
      },
      {
        id: 'IMB-002',
        ubicacion: 'Punto de práctica E',
        tipo: 'Imbornal',
        limpieza: 'Limpio',
        estructura: 'Reja faltante',
        actualizado: fecha,
      },
      {
        id: 'IMB-003',
        ubicacion: 'Tramo de práctica F',
        tipo: 'Tramo de desagüe',
        limpieza: 'Limpio',
        estructura: 'En condiciones',
        actualizado: fecha,
      },
    ],
    camiones: [
      {
        id: 'CAM-001',
        nombre: 'Atmosférico de práctica 1',
        estado: 'Disponible',
      },
      {
        id: 'CAM-002',
        nombre: 'Atmosférico de práctica 2',
        estado: 'Disponible',
      },
      {
        id: 'CAM-003',
        nombre: 'Atmosférico de práctica 3',
        estado: 'En mantenimiento',
      },
    ],
  };
}

const PAGINAS = [
  {
    ruta: '/inicio',
    nombre: 'Inicio',
    titulo: 'Gestión de Limpieza Urbana',
    descripcion:
      'Resumen de solicitudes, inspecciones, imbornales y desagotes en el prototipo SIGLU para San Miguel de Tucumán.',
  },
  {
    ruta: '/solicitudes',
    nombre: 'Solicitudes',
    titulo: 'Solicitudes de limpieza urbana',
    descripcion:
      'Registrá pedidos de limpieza, inspección, mantenimiento de imbornales y desagote, y consultá su seguimiento operativo.',
  },
  {
    ruta: '/inspecciones',
    nombre: 'Inspecciones',
    titulo: 'Inspecciones y registro de actas',
    descripcion:
      'Relacioná las referencias de actas con cada solicitud y seguí su estado administrativo en el prototipo SIGLU.',
  },
  {
    ruta: '/imbornales',
    nombre: 'Imbornales',
    titulo: 'Mantenimiento de imbornales y desagües',
    descripcion:
      'Registrá instalaciones y controlá por separado su limpieza y su estado físico para organizar el mantenimiento.',
  },
  {
    ruta: '/desagotes',
    nombre: 'Desagotes',
    titulo: 'Turnos y camiones de desagote',
    descripcion:
      'Programá pedidos de desagote con camiones disponibles y revisá horarios para evitar superposiciones de turnos.',
  },
];

const PAGINA_NO_ENCONTRADA = {
  nombre: 'Error 404',
  titulo: 'Error 404: página no encontrada',
  descripcion:
    'La dirección solicitada no corresponde a una página del prototipo SIGLU.',
};

const PAGINA_MANTENIMIENTO = {
  nombre: 'Sistema en mantenimiento',
  titulo: 'Sistema en mantenimiento',
  descripcion: 'El acceso a los módulos de SIGLU se encuentra temporalmente suspendido por tareas de mantenimiento.',
};

const CLAVE = 'siglu-practica-v1';

function leerDatos() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto)
      return { datos: crearDatosIniciales(), guardar: true, aviso: '' };
    const datos = JSON.parse(texto);
    const valido =
      datos.version === 1 &&
      ['solicitudes', 'actas', 'imbornales', 'camiones'].every((campo) =>
        Array.isArray(datos[campo]),
      );
    if (!valido) throw new Error('Formato no compatible');
    return { datos, guardar: true, aviso: '' };
  } catch {
    return {
      datos: crearDatosIniciales(),
      guardar: false,
      aviso:
        'No se pudo leer el registro local. Podés practicar y descargar una copia; el registro anterior se conserva.',
    };
  }
}

export default function App() {
  const [inicio] = useState(leerDatos);
  const [datos, setDatos] = useState(inicio.datos);
  const [aviso, setAviso] = useState(inicio.aviso);
  const location = useLocation();

  useEffect(() => {
    if (!inicio.guardar) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(datos));
      setAviso('');
    } catch {
      setAviso(
        'El navegador no pudo guardar los cambios. Descargá una copia antes de cerrar esta pestaña.',
      );
    }
  }, [datos, inicio.guardar]);

  const rutaActual = location.pathname.replace(/\/+$/, '') || '/';
  const pagina = PAGINAS.find((item) => item.ruta === rutaActual);
  const enMantenimiento = MODO_MANTENIMIENTO || rutaActual === '/mantenimiento';
  const contenidoPagina = enMantenimiento ? PAGINA_MANTENIMIENTO : pagina || PAGINA_NO_ENCONTRADA;
  const [mensaje, setMensaje] = useState(null);
  const informar = (texto, error = false) => setMensaje({ texto, error });

  useEffect(() => {
    setMensaje(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // --- MANTENEMOS TODAS TUS FUNCIONES EXACTAMENTE IGUAL ---
  function agregarSolicitud(formulario) {
    if (!formulario.ubicacion.trim() || !formulario.descripcion.trim()) {
      informar('Completá la ubicación y la descripción.', true);
      return false;
    }
    setDatos((actual) => ({
      ...actual,
      solicitudes: [
        ...actual.solicitudes,
        {
          ...formulario,
          id: siguienteId(actual.solicitudes, 'SOL'),
          ubicacion: formulario.ubicacion.trim(),
          descripcion: formulario.descripcion.trim(),
          imbornalId:
            formulario.tipo === 'Imbornal/desagüe' ? formulario.imbornalId : '',
          fecha: fechaHoy(),
          estado: 'Pendiente',
          historial: [
            {
              fecha: new Date().toISOString(),
              texto: 'Solicitud registrada en el prototipo.',
            },
          ],
        },
      ],
    }));
    informar('Solicitud registrada.');
    return true;
  }

  function cambiarEstadoSolicitud(id, estado) {
    const solicitud = datos.solicitudes.find((item) => item.id === id);
    if (
      solicitud.tipo === 'Desagote' &&
      estado !== 'Pendiente' &&
      !solicitud.turno
    ) {
      informar('Primero asigná un camión y un horario desde Desagotes.', true);
      return;
    }
    if (
      solicitud.tipo === 'Desagote' &&
      solicitud.turno &&
      estado !== 'Finalizado'
    ) {
      const error = validarTurno(
        datos.solicitudes,
        id,
        solicitud.turno,
        datos.camiones,
      );
      if (error) {
        informar(error, true);
        return;
      }
    }
    setDatos((actual) => ({
      ...actual,
      solicitudes: actual.solicitudes.map((item) =>
        item.id === id
          ? {
              ...item,
              estado,
              historial: registrarMovimiento(
                item,
                `Estado operativo: ${estado}.`,
              ),
            }
          : item,
      ),
    }));
    informar('Estado operativo actualizado.');
  }

  function agregarActa(formulario) {
    const numero = formulario.numero.trim();
    if (
      !['numero', 'inspector', 'norma', 'articulo', 'observaciones'].every(
        (campo) => formulario[campo].trim(),
      ) ||
      !formulario.solicitudId
    ) {
      informar('Completá los datos obligatorios del registro de acta.', true);
      return false;
    }
    if (
      datos.actas.some(
        (item) => item.numero.toLowerCase() === numero.toLowerCase(),
      )
    ) {
      informar('Ya existe un acta con ese número. Revisá el registro.', true);
      return false;
    }
    setDatos((actual) => ({
      ...actual,
      actas: [
        ...actual.actas,
        {
          ...formulario,
          numero,
          id: siguienteId(actual.actas, 'REG'),
          estado: 'Registrada',
        },
      ],
      solicitudes: actual.solicitudes.map((item) =>
        item.id === formulario.solicitudId
          ? {
              ...item,
              historial: registrarMovimiento(
                item,
                `Se vinculó el acta ${numero}.`,
              ),
            }
          : item,
      ),
    }));
    informar('Registro de acta agregado.');
    return true;
  }

  function cambiarEstadoActa(id, estado) {
    const acta = datos.actas.find((item) => item.id === id);
    setDatos((actual) => ({
      ...actual,
      actas: actual.actas.map((item) =>
        item.id === id ? { ...item, estado } : item,
      ),
      solicitudes: actual.solicitudes.map((item) =>
        item.id === acta.solicitudId
          ? {
              ...item,
              historial: registrarMovimiento(
                item,
                `Acta ${acta.numero}: ${estado}.`,
              ),
            }
          : item,
      ),
    }));
    informar('Seguimiento administrativo actualizado.');
  }

  function agregarImbornal(formulario) {
    if (!formulario.ubicacion.trim()) {
      informar('Completá la ubicación.', true);
      return false;
    }
    setDatos((actual) => ({
      ...actual,
      imbornales: [
        ...actual.imbornales,
        {
          ...formulario,
          ubicacion: formulario.ubicacion.trim(),
          id: siguienteId(actual.imbornales, 'IMB'),
          limpieza: 'Sin revisar',
          estructura: 'Sin revisar',
          actualizado: fechaHoy(),
        },
      ],
    }));
    informar('Instalación registrada.');
    return true;
  }

  function actualizarImbornal(id, campo, valor) {
    setDatos((actual) => ({
      ...actual,
      imbornales: actual.imbornales.map((item) =>
        item.id === id
          ? { ...item, [campo]: valor, actualizado: fechaHoy() }
          : item,
      ),
    }));
    informar('Estado de la instalación actualizado.');
  }

  function programarDesagote(formulario) {
    const solicitud = datos.solicitudes.find(
      (item) => item.id === formulario.solicitudId,
    );
    if (
      !solicitud ||
      solicitud.tipo !== 'Desagote' ||
      solicitud.estado === 'Finalizado'
    ) {
      informar('Elegí un pedido de desagote pendiente.', true);
      return false;
    }
    const { solicitudId, ...turno } = formulario;
    const error = validarTurno(
      datos.solicitudes,
      solicitudId,
      turno,
      datos.camiones,
    );
    if (error || turno.fecha < fechaHoy()) {
      informar(error || 'Elegí una fecha desde hoy en adelante.', true);
      return false;
    }
    setDatos((actual) => ({
      ...actual,
      solicitudes: actual.solicitudes.map((item) =>
        item.id === solicitudId
          ? {
              ...item,
              turno,
              estado: 'Programado',
              historial: registrarMovimiento(
                item,
                `Desagote programado: ${turno.fecha}, ${turno.inicio}-${turno.fin}, ${turno.camionId}.`,
              ),
            }
          : item,
      ),
    }));
    informar('Desagote programado.');
    return true;
  }

  function descargarCopia() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' }),
    );
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `siglu-practica-${fechaHoy()}.json`;
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    informar('Copia de los datos de práctica descargada.');
  }

  // Comprobamos si estamos en la ruta de Login para no mostrar el Navbar ni el Footer
  const esRutaLogin = location.pathname === '/';

  return (
    <div className="bg-light min-vh-100">
      <Seo
        titulo={esRutaLogin ? "Login - SIGLU" : contenidoPagina.titulo}
        descripcion={contenidoPagina.descripcion}
        noIndex={!pagina || enMantenimiento}
      />
      
      {/* Ocultamos el header y navbar si estamos en la pantalla de Login */}
      {!esRutaLogin && !enMantenimiento && (
        <>
          <header className="bg-primary bg-gradient text-white py-3 shadow-sm">
            <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
              
              {/* CONTENEDOR FLEX PARA LOGO + TEXTO */}
              <div className="d-flex align-items-center gap-3">
                {/* Imagen del logo con fondo blanco para que resalte */}
                <img 
                  src="/logo-msmt.png" 
                  alt="Ciudad San Miguel de Tucumán" 
                  style={{ width: '50px' }} 
                />
                
                {/* Textos */}
                <div>
                  <p className="h3 fw-bold mb-0">SIGLU</p>
                  <p className="small mb-0 opacity-75">
                    Gestión de Limpieza Urbana 
                  </p>
                </div>
              </div>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={descargarCopia}
              >
                Descargar copia de datos
              </button>
            </div>
          </header>
          <Navbar paginas={PAGINAS} />
        </>
      )}

      {/* Si estamos en Login, no aplicamos el padding ni el PageHeader */}
      <main className={esRutaLogin ? "" : "container py-4"}>
        
        {!esRutaLogin && !enMantenimiento && (
          <PageHeader
            titulo={contenidoPagina.nombre}
            descripcion={contenidoPagina.descripcion}
          />
        )}

        {mensaje && !esRutaLogin && (
          <div
            className={`alert alert-${mensaje.error ? 'danger' : 'success'} d-flex justify-content-between align-items-start gap-2`}
            role="alert"
          >
            <span>{mensaje.texto}</span>
            <button
              className="btn-close"
              aria-label="Cerrar mensaje"
              onClick={() => setMensaje(null)}
            />
          </div>
        )}

        {MODO_MANTENIMIENTO ? <Mantenimiento /> : <Routes>
          {/* NUEVA RUTA DE LOGIN */}
          <Route path="/" element={<Login />} />
          
          {/* EL INICIO AHORA ES /inicio */}
          <Route path="/inicio" element={<Inicio datos={datos} />} />
          
          <Route
            path="/solicitudes"
            element={
              <Solicitudes
                datos={datos}
                agregar={agregarSolicitud}
                cambiarEstado={cambiarEstadoSolicitud}
              />
            }
          />
          <Route
            path="/inspecciones"
            element={
              <Inspecciones
                datos={datos}
                agregar={agregarActa}
                cambiarEstado={cambiarEstadoActa}
              />
            }
          />
          <Route
            path="/imbornales"
            element={
              <Imbornales
                datos={datos}
                agregar={agregarImbornal}
                actualizar={actualizarImbornal}
              />
            }
          />
          <Route
            path="/desagotes"
            element={
              <Desagotes
                datos={datos}
                programar={programarDesagote}
                cambiarEstado={cambiarEstadoSolicitud}
              />
            }
          />
          <Route path="*" element={<NoEncontrada />} />
          <Route path="/404" element={<NoEncontrada />} />
          <Route path="/mantenimiento" element={<Mantenimiento />} />
        </Routes>}
      </main>

      {/* Ocultamos el footer si estamos en Login */}
      {!esRutaLogin && (
        <footer className="container pb-4 text-secondary small">
          © 2026 Gestión de Limpieza Urbana. Todos los derechos reservados.
        </footer>
      )}
    </div>
  );
}