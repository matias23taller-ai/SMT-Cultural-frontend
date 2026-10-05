export default function Field({
  id,
  label,
  value,
  onChange,
  options,
  type = 'text',
  required = false,
  ...props
}) {
  const comunes = {
    id,
    value,
    onChange: (evento) => onChange(evento.target.value),
    required,
    ...props,
  };
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {label}
      </label>
      {options ? (
        <select className="form-select" {...comunes}>
          {options.map((opcion) => {
            const valor = typeof opcion === 'string' ? opcion : opcion.value;
            return (
              <option key={valor} value={valor}>
                {typeof opcion === 'string' ? opcion : opcion.label}
              </option>
            );
          })}
        </select>
      ) : type === 'textarea' ? (
        <textarea className="form-control" rows="3" {...comunes} />
      ) : (
        <input type={type} className="form-control" {...comunes} />
      )}
    </div>
  );
}
