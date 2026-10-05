import { useState } from 'react';
import Field from '../components/Field.jsx';
import { ESTADOS_ACTA, fechaHoy, mostrarFecha } from '../utils/helpers.js';

const inicial = () => ({
  solicitudId: '',
  numero: '',
  fecha: fechaHoy(),
  inspector: '',
  norma: '',
  articulo: '',
  observaciones: '',
  documento: '',
});

export default function Inspecciones({ datos, agregar, cambiarEstado }) {
  const [formulario, setFormulario] = useState(inicial);
  const campo = (nombre) => (valor) =>
    setFormulario((actual) => ({ ...actual, [nombre]: valor }));
  function guardar(evento) {
    evento.preventDefault();
    if (agregar(formulario)) setFormulario(inicial());
  }
  return (
    <>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Registrar acta de práctica</h2>
          <form onSubmit={guardar}>
            <div className="row">
              <div className="col-md-6">
                <Field
                  id="acta-solicitud"
                  label="Solicitud relacionada"
                  value={formulario.solicitudId}
                  onChange={campo('solicitudId')}
                  required
                  options={[
                    { value: '', label: 'Elegí una solicitud' },
                    ...datos.solicitudes.map((item) => ({
                      value: item.id,
                      label: `${item.id} · ${item.ubicacion}`,
                    })),
                  ]}
                />
              </div>
              <div className="col-md-3">
                <Field
                  id="acta-numero"
                  label="Número del acta de práctica"
                  value={formulario.numero}
                  onChange={campo('numero')}
                  required
                  maxLength={60}
                  placeholder="FICTICIA-002"
                />
              </div>
              <div className="col-md-3">
                <Field
                  id="acta-fecha"
                  label="Fecha del acta"
                  type="date"
                  value={formulario.fecha}
                  onChange={campo('fecha')}
                  required
                />
              </div>
              <div className="col-md-4">
                <Field
                  id="acta-inspector"
                  label="Inspector de práctica"
                  value={formulario.inspector}
                  onChange={campo('inspector')}
                  required
                  maxLength={100}
                />
              </div>
              <div className="col-md-5">
                <Field
                  id="acta-norma"
                  label="Referencia de la ordenanza"
                  value={formulario.norma}
                  onChange={campo('norma')}
                  required
                  maxLength={160}
                />
              </div>
              <div className="col-md-3">
                <Field
                  id="acta-articulo"
                  label="Artículo"
                  value={formulario.articulo}
                  onChange={campo('articulo')}
                  required
                  maxLength={50}
                />
              </div>
              <div className="col-md-6">
                <Field
                  id="acta-observaciones"
                  label="Hechos observados"
                  type="textarea"
                  value={formulario.observaciones}
                  onChange={campo('observaciones')}
                  required
                  maxLength={1500}
                />
              </div>
              <div className="col-md-6">
                <Field
                  id="acta-documento"
                  label="Referencia de la copia del acta (opcional)"
                  value={formulario.documento}
                  onChange={campo('documento')}
                  maxLength={160}
                  placeholder="Nombre o referencia documental de práctica"
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Guardar registro de acta
            </button>
          </form>
        </div>
      </div>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">Seguimiento administrativo</h2>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <caption>
                Este estado es independiente del estado operativo de la
                solicitud.
              </caption>
              <thead>
                <tr>
                  <th>Acta y solicitud</th>
                  <th>Inspector y fecha</th>
                  <th>Norma y hechos</th>
                  <th>Estado administrativo</th>
                </tr>
              </thead>
              <tbody>
                {datos.actas.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">
                      {item.numero}
                      <span className="d-block fw-normal small">
                        {item.solicitudId}
                      </span>
                    </th>
                    <td>
                      {item.inspector}
                      <span className="d-block small text-secondary">
                        {mostrarFecha(item.fecha)}
                      </span>
                    </td>
                    <td className="text-break">
                      {item.norma} · Art. {item.articulo}
                      <p className="small text-secondary mb-0">
                        {item.observaciones}
                      </p>
                      {item.documento && (
                        <p className="small mb-0">
                          Referencia: {item.documento}
                        </p>
                      )}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        aria-label={`Estado administrativo de ${item.numero}`}
                        value={item.estado}
                        onChange={(evento) =>
                          cambiarEstado(item.id, evento.target.value)
                        }
                      >
                        {ESTADOS_ACTA.map((estado) => (
                          <option key={estado}>{estado}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!datos.actas.length && (
              <p className="text-secondary">
                Todavía no hay actas registradas.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
