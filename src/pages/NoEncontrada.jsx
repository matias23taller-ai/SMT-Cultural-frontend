import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <section
      className="card border-0 rounded-4 shadow-sm text-center p-4 p-md-5"
      aria-labelledby="ayuda-navegacion"
    >
      <div className="card-body">
        <p className="display-1 fw-bold text-primary mb-3" aria-hidden="true">
          404
        </p>
        <h2 className="h5" id="ayuda-navegacion">
          No encontramos esa página
        </h2>
        <p className="text-secondary">
          La dirección puede estar mal escrita o el enlace ya no estar
          disponible. Revisá la URL o volvé a un módulo del sistema.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <Link className="btn btn-primary px-4" to="/">
            Volver al inicio
          </Link>
          <Link className="btn btn-outline-primary px-4" to="/solicitudes">
            Ir a solicitudes
          </Link>
        </div>
      </div>
    </section>
  );
}
