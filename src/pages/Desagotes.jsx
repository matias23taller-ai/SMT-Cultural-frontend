import { useState } from 'react';
import Field from '../components/Field.jsx';
import Badge from '../components/Badge.jsx';
import { ESTADOS, fechaHoy, mostrarFecha } from '../utils/helpers.js';

const inicial = () => ({
  solicitudId: '',
  camionId: '',
  fecha: fechaHoy(),
  inicio: '08:00',
  fin: '09:00',
  observaciones: '',
});

export default function Desagotes({ datos, programar, cambiarEstado }) {
  const [formulario, setFormulario] = useState(inicial);
  const campo = (nombre) => (valor) =>
    setFormulario((actual) => ({ ...actual, [nombre]: valor }));
  const solicitudes = datos.solicitudes.filter(
    (item) => item.tipo === 'Desagote',
  );
  const disponibles = datos.camiones.filter(
    (item) => item.estado === 'Disponible',
  );
  function elegirSolicitud(id) {
    const turno = solicitudes.find((item) => item.id === id)?.turno;
    setFormulario({ ...inicial(), ...turno, solicitudId: id });
  }
  function guardar(evento) {
    evento.preventDefault();
    if (programar(formulario)) setFormulario(inicial());
  }
  return (
    <>
      <div className="row g-3 mb-4">
        {datos.camiones.map((camion) => (
          <div className="col-12 col-md-4" key={camion.id}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h2 className="h6">{camion.nombre}</h2>
                <Badge texto={camion.estado} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-2">Programar un desagote</h2>
          <p className="text-secondary small">
            Primero registrá el pedido en Solicitudes. Al seleccionar uno ya
            programado podés revisar y cambiar su reserva.
          </p>
          <form onSubmit={guardar}>
            <div className="row">
              <div className="col-md-6">
                <Field
                  id="des-solicitud"
                  label="Pedido de desagote"
                  value={formulario.solicitudId}
                  onChange={elegirSolicitud}
                  required
                  options={[
                    { value: '', label: 'Elegí una solicitud' },
                    ...solicitudes
                      .filter((item) => item.estado !== 'Finalizado')
                      .map((item) => ({
                        value: item.id,
                        label: `${item.id} · ${item.ubicacion}`,
                      })),
                  ]}
                />
              </div>
              <div className="col-md-6">
                <Field
                  id="des-camion"
                  label="Camión disponible"
                  value={formulario.camionId}
                  onChange={campo('camionId')}
                  required
                  options={[
                    { value: '', label: 'Elegí un camión' },
                    ...disponibles.map((item) => ({
                      value: item.id,
                      label: item.nombre,
                    })),
                  ]}
                />
              </div>
              <div className="col-md-4">
                <Field
                  id="des-fecha"
                  label="Fecha del servicio"
                  type="date"
                  value={formulario.fecha}
                  onChange={campo('fecha')}
                  required
                  min={fechaHoy()}
                />
              </div>
              <div className="col-md-4">
                <Field
                  id="des-inicio"
                  label="Hora de inicio"
                  type="time"
                  value={formulario.inicio}
                  onChange={campo('inicio')}
                  required
                />
              </div>
              <div className="col-md-4">
                <Field
                  id="des-fin"
                  label="Hora de finalización"
                  type="time"
                  value={formulario.fin}
                  onChange={campo('fin')}
                  required
                />
              </div>
              <div className="col-12">
                <Field
                  id="des-observaciones"
                  label="Observaciones de programación"
                  type="textarea"
                  value={formulario.observaciones}
                  onChange={campo('observaciones')}
                  maxLength={1000}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Guardar programación
            </button>
          </form>
        </div>
      </div>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">Pedidos y agenda</h2>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <caption>
                La agenda valida reservas del mismo camión en horarios
                superpuestos. Los tiempos de traslado todavía se organizan
                manualmente.
              </caption>
              <thead>
                <tr>
                  <th>Pedido y ubicación</th>
                  <th>Camión</th>
                  <th>Reserva</th>
                  <th>Estado operativo</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">
                      {item.id}
                      <span className="d-block small fw-normal text-break">
                        {item.ubicacion}
                      </span>
                    </th>
                    <td>
                      {datos.camiones.find(
                        (camion) => camion.id === item.turno?.camionId,
                      )?.nombre || 'Sin asignar'}
                    </td>
                    <td>
                      {item.turno ? (
                        <>
                          {mostrarFecha(item.turno.fecha)}
                          <span className="d-block small">
                            {item.turno.inicio} a {item.turno.fin}
                          </span>
                          <span className="d-block small text-secondary text-break">
                            {item.turno.observaciones}
                          </span>
                        </>
                      ) : (
                        'Sin programar'
                      )}
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        aria-label={`Estado del desagote ${item.id}`}
                        value={item.estado}
                        onChange={(evento) =>
                          cambiarEstado(item.id, evento.target.value)
                        }
                      >
                        {ESTADOS.map((estado) => (
                          <option key={estado}>{estado}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!solicitudes.length && (
              <p className="text-secondary">
                Registrá una solicitud de tipo Desagote para comenzar.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
