export function validarTurno(solicitudes, solicitudId, turno, camiones) {
  const camion = camiones.find((item) => item.id === turno.camionId);
  if (!camion || camion.estado !== 'Disponible')
    return 'Elegí un camión disponible.';
  if (!turno.fecha || !turno.inicio || !turno.fin)
    return 'Completá la fecha y ambos horarios.';
  if (turno.inicio >= turno.fin)
    return 'La hora de finalización debe ser posterior al inicio.';

  const conflicto = solicitudes.find((item) => {
    const otro = item.turno;
    return (
      item.id !== solicitudId &&
      item.tipo === 'Desagote' &&
      item.estado !== 'Finalizado' &&
      otro?.camionId === turno.camionId &&
      otro.fecha === turno.fecha &&
      turno.inicio < otro.fin &&
      turno.fin > otro.inicio
    );
  });
  return conflicto
    ? `El camión ya está reservado para ${conflicto.id} en ese horario.`
    : '';
}
