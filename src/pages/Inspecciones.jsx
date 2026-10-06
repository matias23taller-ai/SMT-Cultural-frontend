export default function Inspecciones({ datos }) {
  const actas = datos?.actas || [];
  const solicitudes = datos?.solicitudes || [];

  return (
    <div className="d-flex flex-column gap-4">
      

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-4">Registrar acta </h5>
          
          <form onSubmit={(e) => e.preventDefault()}>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Solicitud relacionada</label>
                <select className="form-select">
                  <option value="">Elegí una solicitud</option>
                  {solicitudes.map(s => (
                    <option key={s.id} value={s.id}>{s.id} - {s.ubicacion}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Número del acta</label>
                <input type="text" className="form-control" defaultValue="FICTICIA-002" />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Fecha del acta</label>
      
                <input type="date" className="form-control" defaultValue="2026-10-06" />
              </div>
            </div>

  
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Inspector</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Referencia de la ordenanza</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Artículo</label>
                <input type="text" className="form-control" />
              </div>
            </div>

     
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Hechos observados</label>
                <textarea className="form-control" rows="2"></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Referencia de la copia del acta (opcional)</label>
                <input type="text" className="form-control" placeholder="Nombre o referencia documental de práctica" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar registro de acta
            </button>
          </form>
        </div>
      </div>

  
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-4">Seguimiento administrativo</h5>
          
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Acta y solicitud</th>
                  <th>Inspector y fecha</th>
                  <th>Norma y hechos</th>
                  <th>Estado administrativo</th>
                </tr>
              </thead>
              <tbody>
                {actas.length > 0 ? (
                  actas.map((acta) => (
                    <tr key={acta.id}>
                    
                      <td>
                        <strong>{acta.numero}</strong><br />
                        <span className="text-secondary small">{acta.solicitudId}</span>
                      </td>
                    
                      <td>
                        {acta.inspector}<br />
                        <span className="text-secondary small text-muted">6/10/2026</span>
                      </td>
                    
                      <td>
                        <span>{acta.norma} · Art. {acta.articulo}</span><br />
                        <span className="text-secondary small d-block">{acta.observaciones}</span>
                        <span className="text-secondary small">Referencia: {acta.documento}</span>
                      </td>
                     
                      <td style={{ minWidth: '200px' }}>
                        <select className="form-select form-select-sm text-primary border-primary bg-light" defaultValue="Registrada">
                          <option value="Registrada">Registrada</option>
                          <option value="Pendiente de derivación">Pendiente de derivación</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No hay actas registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}