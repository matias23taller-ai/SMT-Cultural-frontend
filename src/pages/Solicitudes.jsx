import { useState, useEffect } from 'react';

export default function Solicitudes({ datos }) {
  const solicitudes = datos?.solicitudes || [];
  const imbornales = datos?.imbornales || [];

  const [historialId, setHistorialId] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 1500);
    return () => clearTimeout(temporizador);
  }, []);

  if (cargando) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <h5 className="visually-hidden">Cargando...</h5>
        </div>
        <h5 className="text-muted">Cargando solicitudes...</h5>
      </div>
    );
  }
  
  const seleccionada = solicitudes.find((item) => item.id === historialId);

  return (
    <div className="row g-4">
      <div className="col-12 col-xl-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h5 mb-3">Nueva solicitud</h2>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="form-label fw-bold">Tipo de servicio</label>
                <select className="form-select">
                  <option>Limpieza</option>
                  <option>Imbornal/desagüe</option>
                  <option>Desagote</option>
                  <option>Inspección</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Ubicación</label>
                <input type="text" className="form-control" required maxLength={160} placeholder="Usá una ubicación de práctica" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Descripción del trabajo</label>
                <textarea className="form-control" required maxLength={1000} rows="3"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Prioridad</label>
                <select className="form-select">
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Contacto de práctica (opcional)</label>
                <input type="tel" className="form-control" maxLength={30} />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Instalación vinculada (opcional)</label>
                <select className="form-select">
                  <option value="">Sin vincular</option>
                  {imbornales.map((item) => (
                    <option key={item.id} value={item.id}>{item.id} · {item.ubicacion}</option>
                  ))}
                </select>
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Guardar solicitud 
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-8">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h5 mb-3">Registro de solicitudes</h2>
            
            <div className="row g-2 mb-3">
              <div className="col-md-7">
                <label className="form-label fw-bold small">Buscar solicitud</label>
                <input type="text" className="form-control" placeholder="Número, ubicación o descripción" />
              </div>
              <div className="col-md-5">
                <label className="form-label fw-bold small">Filtrar por servicio</label>
                <select className="form-select">
                  <option>Todos</option>
                  <option>Limpieza</option>
                  <option>Imbornal/desagüe</option>
                  <option>Desagote</option>
                  <option>Inspección</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <caption className="small text-muted">
                  {solicitudes.length} solicitudes encontradas. El estado mostrado corresponde al trabajo operativo.
                </caption>
                <thead className="table-light">
                  <tr>
                    <th>Número y servicio</th>
                    <th>Ubicación</th>
                    <th>Prioridad</th>
                    <th>Estado operativo</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.length > 0 ? (
                    solicitudes.map((item) => (
                      <tr key={item.id}>
                        <th scope="row">
                          {item.id}
                          <span className="d-block small fw-normal text-secondary">{item.tipo}</span>
                        </th>
                        <td className="text-break">
                          {item.ubicacion}
                          <span className="d-block small text-secondary">06/10/2026</span>
                        </td>
                        <td>
                      
                          <span className={`badge bg-${item.prioridad === 'Alta' ? 'danger' : item.prioridad === 'Baja' ? 'secondary' : 'warning text-dark'}`}>
                            {item.prioridad || 'Media'}
                          </span>
                        </td>
                        <td>
                        
                          <select className="form-select form-select-sm" defaultValue={item.estado}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Programado">Programado</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Cancelado">Cancelado</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setHistorialId(item.id)}
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No hay solicitudes para mostrar.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {seleccionada && (
              <div className="border border-primary rounded p-3 mt-3 bg-light">
                <div className="d-flex justify-content-between gap-2 mb-2">
                  <h3 className="h6 fw-bold mb-0 text-primary">Detalle de {seleccionada.id}</h3>
                  <button className="btn-close" onClick={() => setHistorialId('')} />
                </div>
                <p className="text-break mb-2">{seleccionada.descripcion || 'Sin descripción detallada.'}</p>
                
                {seleccionada.imbornalId && (
                  <p className="small mb-2 fw-semibold">
                    Instalación vinculada: <span className="fw-normal">{seleccionada.imbornalId}</span>
                  </p>
                )}
                
                <p className="small text-secondary mb-2 fw-bold">Historial local de práctica:</p>
                <ul className="small mb-0 text-muted">
                  <li>06/10/2026, 10:00:00 · Solicitud registrada en el prototipo.</li>
                  <li>06/10/2026, 10:05:00 · Estado operativo: {seleccionada.estado}.</li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}