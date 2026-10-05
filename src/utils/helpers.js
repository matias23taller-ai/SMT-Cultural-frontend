export const TIPOS = ['Inspección', 'Limpieza', 'Imbornal/desagüe', 'Desagote'];
export const PRIORIDADES = ['Alta', 'Media', 'Baja'];
export const ESTADOS = [
  'Pendiente',
  'Programado',
  'En trabajo',
  'Parcial',
  'Finalizado',
];
export const ESTADOS_ACTA = [
  'Registrada',
  'Pendiente de derivación',
  'Derivada',
  'Con respuesta registrada',
];

export function fechaHoy() {
  const fecha = new Date();
  return [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, '0'),
    String(fecha.getDate()).padStart(2, '0'),
  ].join('-');
}

export function mostrarFecha(fecha) {
  return fecha
    ? new Date(`${fecha}T12:00:00`).toLocaleDateString('es-AR')
    : 'Sin fecha';
}

export function siguienteId(lista, prefijo) {
  const numeros = lista.map((item) => Number(item.id.split('-').at(-1)) || 0);
  return `${prefijo}-${String(Math.max(0, ...numeros) + 1).padStart(3, '0')}`;
}

export function registrarMovimiento(solicitud, texto) {
  return [
    ...(solicitud.historial || []),
    { fecha: new Date().toISOString(), texto },
  ];
}
