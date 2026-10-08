export default function Desagotes({ datos }) {

  const solicitudes = datos?.solicitudes || [];
  const camiones = datos?.camiones || [];
  
  const pedidosDesagote = solicitudes.filter((s) => s.tipo === 'Desagote');

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Programar turno</h5>
           
            <form onSubmit={(e) => e.preventDefault()}>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Pedido pendiente</label>
                <select className="form-select">
                  <option value="">Seleccionar pedido...</option>
                  {pedidosDesagote.filter(p => p.estado === 'Pendiente').map(p => (
                    <option key={p.id} value={p.id}>{p.id} - {p.ubicacion}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Camión atmosférico</label>
                <select className="form-select">
                  <option value="">Seleccionar camión...</option>
                  {camiones.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Fecha</label>
                <input type="date" className="form-control" />
              </div>
              
              <div className="d-flex gap-2 mb-3">
                <div className="w-50">
                  <label className="form-label fw-bold">Inicio</label>
                  <input type="time" className="form-control" />
                </div>
                <div className="w-50">
                  <label className="form-label fw-bold">Fin</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-100">
                Programar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Lista de Desagotes</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosDesagote.length > 0 ? (
                    pedidosDesagote.map((pedido) => (
                      <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.ubicacion}</td>
                        <td>
                          <span className={`badge bg-${pedido.estado === 'Pendiente' ? 'warning text-dark' : 'success'}`}>
                            {pedido.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        No hay desagotes registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}