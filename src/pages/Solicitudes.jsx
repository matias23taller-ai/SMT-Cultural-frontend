import { useState } from 'react';
import Field from '../components/Field.jsx';
import Badge from '../components/Etiquetas.jsx';
import { ESTADOS, PRIORIDADES, TIPOS, mostrarFecha } from '../utils/helpers.js';

const formularioInicial = () => ({
  tipo: 'Limpieza',
  ubicacion: '',
  descripcion: '',
  contacto: '',
  prioridad: 'Media',
  imbornalId: '',
});

export default function Solicitudes({ datos, agregar, cambiarEstado }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [busqueda, setBusqueda] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('Todos');
  const [historialId, setHistorialId] = useState('');
  const campo = (nombre) => (valor) =>
    setFormulario((actual) => ({ ...actual, [nombre]: valor }));
  const filtradas = datos.solicitudes.filter(
    (item) =>
      (tipoFiltro === 'Todos' || item.tipo === tipoFiltro) &&
      `${item.id} ${item.ubicacion} ${item.descripcion}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()),
  );
  const seleccionada = datos.solicitudes.find(
    (item) => item.id === historialId,
  );

  function guardar(evento) {
    evento.preventDefault();
    if (agregar(formulario)) setFormulario(formularioInicial());
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-xl-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h5 mb-3">Nueva solicitud</h2>
            <form onSubmit={guardar}>
              <Field
                id="sol-tipo"
                label="Tipo de servicio"
                value={formulario.tipo}
                onChange={campo('tipo')}
                options={TIPOS}
              />
              <Field
                id="sol-ubicacion"
                label="Ubicación"
                value={formulario.ubicacion}
                onChange={campo('ubicacion')}
                required
                maxLength={160}
                placeholder="Usá una ubicación de práctica"
              />
              <Field
                id="sol-descripcion"
                label="Descripción del trabajo"
                type="textarea"
                value={formulario.descripcion}
                onChange={campo('descripcion')}
                required
                maxLength={1000}
              />
              <Field
                id="sol-prioridad"
                label="Prioridad"
                value={formulario.prioridad}
                onChange={campo('prioridad')}
                options={PRIORIDADES}
              />
              <Field
                id="sol-contacto"
                label="Contacto de práctica (opcional)"
                type="tel"
                value={formulario.contacto}
                onChange={campo('contacto')}
                maxLength={30}
              />
              {formulario.tipo === 'Imbornal/desagüe' && (
                <Field
                  id="sol-imbornal"
                  label="Instalación vinculada (opcional)"
                  value={formulario.imbornalId}
                  onChange={campo('imbornalId')}
                  options={[
                    { value: '', label: 'Sin vincular' },
                    ...datos.imbornales.map((item) => ({
                      value: item.id,
                      label: `${item.id} · ${item.ubicacion}`,
                    })),
                  ]}
                />
              )}
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
            <div className="row g-2">
              <div className="col-md-7">
                <Field
                  id="sol-busqueda"
                  label="Buscar solicitud"
                  value={busqueda}
                  onChange={setBusqueda}
                  placeholder="Número, ubicación o descripción"
                />
              </div>
              <div className="col-md-5">
                <Field
                  id="sol-filtro"
                  label="Filtrar por servicio"
                  value={tipoFiltro}
                  onChange={setTipoFiltro}
                  options={['Todos', ...TIPOS]}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table align-middle">
                <caption>
                  {filtradas.length} solicitudes encontradas. El estado mostrado
                  corresponde al trabajo operativo.
                </caption>
                <thead>
                  <tr>
                    <th>Número y servicio</th>
                    <th>Ubicación</th>
                    <th>Prioridad</th>
                    <th>Estado operativo</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {filtradas.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">
                        {item.id}
                        <span className="d-block small fw-normal text-secondary">
                          {item.tipo}
                        </span>
                      </th>
                      <td className="text-break">
                        {item.ubicacion}
                        <span className="d-block small text-secondary">
                          {mostrarFecha(item.fecha)}
                        </span>
                      </td>
                      <td>
                        <Badge texto={item.prioridad} />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          aria-label={`Estado operativo de ${item.id}`}
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
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setHistorialId(item.id)}
                          aria-label={`Ver detalle de ${item.id}`}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filtradas.length && (
                <p className="text-secondary">
                  No hay coincidencias. Probá otra búsqueda.
                </p>
              )}
            </div>
            {seleccionada && (
              <div className="border rounded p-3 mt-3">
                <div className="d-flex justify-content-between gap-2 mb-2">
                  <h3 className="h6 mb-0">Detalle de {seleccionada.id}</h3>
                  <button
                    className="btn-close"
                    aria-label="Cerrar detalle"
                    onClick={() => setHistorialId('')}
                  />
                </div>
                <p className="text-break mb-2">{seleccionada.descripcion}</p>
                {seleccionada.imbornalId && (
                  <p className="small mb-2">
                    Instalación: {seleccionada.imbornalId}
                  </p>
                )}
                <p className="small text-secondary mb-2">
                  Historial local de práctica:
                </p>
                {seleccionada.historial?.length ? (
                  <ul className="small mb-0">
                    {seleccionada.historial.map((paso, indice) => (
                      <li key={indice}>
                        {new Date(paso.fecha).toLocaleString('es-AR')} ·{' '}
                        {paso.texto}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="small mb-0">
                    Todavía no hay movimientos registrados.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
