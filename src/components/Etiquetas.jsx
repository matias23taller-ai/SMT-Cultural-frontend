export default function Badge({ texto }) {
  const colores = {
    Alta: 'danger',
    Media: 'warning',
    Baja: 'secondary',
    Finalizado: 'success',
    Limpio: 'success',
    'En condiciones': 'success',
    Obstruido: 'danger',
    Dañado: 'danger',
    'Reja faltante': 'danger',
    Programado: 'primary',
    'En trabajo': 'info',
    Parcial: 'warning',
    Pendiente: 'secondary',
    Disponible: 'success',
    'En mantenimiento': 'warning',
    Derivada: 'primary',
  };
  return (
    <span className={`badge text-bg-${colores[texto] || 'secondary'}`}>
      {texto}
    </span>
  );
}
