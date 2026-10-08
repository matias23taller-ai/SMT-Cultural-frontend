import { useState } from 'react';

export default function Imbornales({ datos }) {
  const solicitudes = datos?.solicitudes || [];
 
  const [listaImbornales, setListaImbornales] = useState(datos?.imbornales || []);

  const manejarCambio = (id, campo, valor) => {
    setListaImbornales(listaImbornales.map(item => 
      item.id === id ? { ...item, [campo]: valor } : item
    ));
  };

  return (
    <>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Registrar instalación</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row align-items-start">
              <div className="col-md-7 mb-3">
                <label className="form-label fw-bold">Ubicación de la instalación</label>
                <input type="text" className="form-control" maxLength={160} required />
              </div>
              <div className="col-md-5 mb-3">
                <label className="form-label fw-bold">Tipo de instalación</label>
                <select className="form-select">
                  <option value="Imbornal">Imbornal</option>
                  <option value="Tramo de desagüe">Tramo de desagüe</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Guardar instalación
            </button>
          </form>
        </div>
      </div>

      <div className="row g-3">
        {listaImbornales.length > 0 ? (
          listaImbornales.map((item) => (
            <div className="col-12 col-lg-6 col-xl-4" key={item.id}>
              <article className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h2 className="h5 mb-0">{item.id}</h2>
                    <span className="badge text-bg-light border text-dark">
                      {item.tipo}
                    </span>
                  </div>
                  <p className="text-break mb-2">{item.ubicacion}</p>
                  
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className={`badge bg-${item.limpieza === 'Limpio' ? 'success' : item.limpieza === 'Obstruido' ? 'danger' : 'secondary'}`}>
                      {item.limpieza}
                    </span>
                    <span className={`badge bg-${item.estructura === 'En condiciones' ? 'success' : item.estructura === 'Dañado' ? 'danger' : item.estructura === 'Reja faltante' ? 'warning text-dark' : 'secondary'}`}>
                      {item.estructura}
                    </span>
                  </div>
          
                  <div className="mb-2">
                    <label className="form-label small fw-bold mb-1">Limpieza de {item.id}</label>
                    <select 
                      className="form-select form-select-sm" 
                      value={item.limpieza}
                      onChange={(e) => manejarCambio(item.id, 'limpieza', e.target.value)}
                    >
                      <option value="Sin revisar">Sin revisar</option>
                      <option value="Limpio">Limpio</option>
                      <option value="Obstruido">Obstruido</option>
                    </select>
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label small fw-bold mb-1">Estado físico de {item.id}</label>
                    <select 
                      className="form-select form-select-sm" 
                      value={item.estructura}
                      onChange={(e) => manejarCambio(item.id, 'estructura', e.target.value)}
                    >
                      <option value="Sin revisar">Sin revisar</option>
                      <option value="En condiciones">En condiciones</option>
                      <option value="Dañado">Dañado</option>
                      <option value="Reja faltante">Reja faltante</option>
                    </select>
                  </div>

                  <p className="small text-secondary mb-1">
                    Última actualización: {item.actualizado || '06/10/2026'}
                  </p>
                  <p className="small mb-0">
                    Solicitudes vinculadas:{' '}
                    {
                      solicitudes.filter(
                        (solicitud) => solicitud.imbornalId === item.id
                      ).length
                    }
                  </p>
                </div>
              </article>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted py-4">
            No hay instalaciones registradas.
          </div>
        )}
      </div>
    </>
  );
}