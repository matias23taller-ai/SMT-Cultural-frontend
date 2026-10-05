import { Link } from 'react-router-dom';

export default function Mantenimiento() {
  return (
    <section
      className="card border-0 rounded-4 shadow-sm text-center p-4 p-md-5"
      aria-labelledby="aviso-mantenimiento"
    >
      <div className="card-body">
        <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill mb-4">
          Servicio temporalmente no disponible
        </span>
        <div className="mb-4" aria-hidden="true">
          <span className="display-1 fw-bold text-warning">SIGLU</span>
        </div>
        <h2 className="h3 fw-bold mb-3" id="aviso-mantenimiento">
          Estamos realizando tareas de mantenimiento
        </h2>
        <p className="text-secondary mb-2">
          El acceso a los módulos estará disponible cuando finalicen las tareas.
        </p>
        <p className="text-secondary">
          Podés volver a intentar el acceso más tarde.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <button
            className="btn btn-primary px-4"
            onClick={() => window.location.reload()}
          >
            Reintentar acceso
          </button>
          <Link className="btn btn-outline-primary px-4" to="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
