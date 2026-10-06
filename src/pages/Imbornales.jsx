import { useState } from 'react';
import Field from '../components/Field.jsx';
import Badge from '../components/Etiquetas.jsx';
import { mostrarFecha } from '../utils/helpers.js';

const LIMPIEZA = ['Sin revisar', 'Limpio', 'Obstruido'];
const ESTRUCTURA = ['Sin revisar', 'En condiciones', 'Dañado', 'Reja faltante'];

export default function Imbornales({ datos, agregar, actualizar }) {
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('Imbornal');
  function guardar(evento) {
    evento.preventDefault();
    if (agregar({ ubicacion, tipo })) setUbicacion('');
  }
  return (
    <>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 mb-3">Registrar instalación</h2>
          <form onSubmit={guardar}>
            <div className="row align-items-start">
              <div className="col-md-7">
                <Field
                  id="imb-ubicacion"
                  label="Ubicación de la instalación"
                  value={ubicacion}
                  onChange={setUbicacion}
                  required
                  maxLength={160}
                />
              </div>
              <div className="col-md-5">
                <Field
                  id="imb-tipo"
                  label="Tipo de instalación"
                  value={tipo}
                  onChange={setTipo}
                  options={['Imbornal', 'Tramo de desagüe']}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Guardar instalación
            </button>
          </form>
        </div>
      </div>
      <div className="row g-3">
        {datos.imbornales.map((item) => (
          <div className="col-12 col-lg-6 col-xl-4" key={item.id}>
            <article className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <h2 className="h5 mb-0">{item.id}</h2>
                  <span className="badge text-bg-light border">
                    {item.tipo}
                  </span>
                </div>
                <p className="text-break mb-2">{item.ubicacion}</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Badge texto={item.limpieza} />
                  <Badge texto={item.estructura} />
                </div>
                <Field
                  id={`limpieza-${item.id}`}
                  label={`Limpieza de ${item.id}`}
                  value={item.limpieza}
                  onChange={(valor) => actualizar(item.id, 'limpieza', valor)}
                  options={LIMPIEZA}
                />
                <Field
                  id={`estructura-${item.id}`}
                  label={`Estado físico de ${item.id}`}
                  value={item.estructura}
                  onChange={(valor) => actualizar(item.id, 'estructura', valor)}
                  options={ESTRUCTURA}
                />
                <p className="small text-secondary mb-1">
                  Última actualización: {mostrarFecha(item.actualizado)}
                </p>
                <p className="small mb-0">
                  Solicitudes vinculadas:{' '}
                  {
                    datos.solicitudes.filter(
                      (solicitud) => solicitud.imbornalId === item.id,
                    ).length
                  }
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
