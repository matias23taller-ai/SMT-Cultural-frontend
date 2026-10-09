export const MODO_MANTENIMIENTO = false;

export const datosFalsos = {
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

export const PAGINAS = [
  { ruta: '/inicio', nombre: 'Inicio', titulo: 'Gestión de Limpieza Urbana', descripcion: 'Resumen de solicitudes, inspecciones, imbornales y desagotes en el prototipo SIGLU para San Miguel de Tucumán.' },
  { ruta: '/solicitudes', nombre: 'Solicitudes', titulo: 'Solicitudes de limpieza urbana', descripcion: 'Registrá pedidos de limpieza, inspección, mantenimiento de imbornales y desagote, y consultá su seguimiento operativo.' },
  { ruta: '/inspecciones', nombre: 'Inspecciones', titulo: 'Inspecciones y registro de actas', descripcion: 'Relacioná las referencias de actas con cada solicitud y seguí su estado administrativo en el prototipo SIGLU.' },
  { ruta: '/imbornales', nombre: 'Imbornales', titulo: 'Mantenimiento de imbornales y desagües', descripcion: 'Registrá instalaciones y controlá por separado su limpieza y su estado físico para organizar el mantenimiento.' },
  { ruta: '/desagotes', nombre: 'Desagotes', titulo: 'Turnos y camiones de desagote', descripcion: 'Programá pedidos de desagote con camiones disponibles y revisá horarios para evitar superposiciones de turnos.' },
];

export const PAGINA_NO_ENCONTRADA = { nombre: 'Error 404', titulo: 'Error 404: página no encontrada', descripcion: 'La dirección solicitada no corresponde a una página del prototipo SIGLU.' };
export const PAGINA_MANTENIMIENTO = { nombre: 'Sistema en mantenimiento', titulo: 'Sistema en mantenimiento', descripcion: 'El acceso a los módulos de SIGLU se encuentra temporalmente suspendido por tareas de mantenimiento.' };