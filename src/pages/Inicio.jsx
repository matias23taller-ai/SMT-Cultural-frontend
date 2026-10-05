import { Link } from 'react-router-dom';
import Badge from '../components/Badge.jsx';

export default function Inicio({ datos }) {
  const pendientes = datos.solicitudes.filter(
    (item) => item.estado !== 'Finalizado',
  );
  const indicadores = [
    ['Solicitudes pendientes', pendientes.length, 'primary'],
    [
      'Actas por derivar',
      datos.actas.filter((item) =>
        ['Registrada', 'Pendiente de derivación'].includes(item.estado),
      ).length,
      'warning',
    ],
    [
      'Instalaciones con daño',
      datos.imbornales.filter((item) =>
        ['Dañado', 'Reja faltante'].includes(item.estructura),
      ).length,
      'danger',
    ],
    [
      'Desagotes por programar',
      pendientes.filter((item) => item.tipo === 'Desagote' && !item.turno)
        .length,
      'success',
    ],
  ];
  const servicios = [
    {
      titulo: 'Solicitudes',
      ruta: '/solicitudes',
      color: 'primary',
      detalle: 'Registrá pedidos, buscá trabajos y consultá su seguimiento.',
    },
    {
      titulo: 'Inspecciones',
      ruta: '/inspecciones',
      color: 'warning',
      detalle: 'Relacioná las actas con los pedidos y seguí cada actuación.',
    },
    {
      titulo: 'Imbornales',
      ruta: '/imbornales',
      color: 'info',
      detalle: 'Controlá la limpieza y el estado físico de las instalaciones.',
    },
    {
      titulo: 'Desagotes',
      ruta: '/desagotes',
      color: 'success',
      detalle: 'Asigná un camión y un horario a cada servicio solicitado.',
    },
  ];
  return (
    <>
      <section
        className="bg-primary bg-gradient text-white rounded-4 shadow-sm p-4 p-md-5 mb-4"
        aria-labelledby="presentacion-siglu"
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            <span className="badge rounded-pill bg-white text-primary mb-3">
              Sistema de Gestión de Limpieza Urbana
            </span>
            <h2 className="display-6 fw-bold mb-3" id="presentacion-siglu">
              Organizá los servicios y acompañá cada trabajo.
            </h2>
            <p className="lead mb-4">
              Solicitudes, inspecciones, mantenimiento y desagotes reunidos en
              un mismo lugar.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link
                className="btn btn-light text-primary fw-semibold px-4"
                to="/solicitudes"
              >
                Registrar solicitud
              </Link>
              <Link className="btn btn-outline-light px-4" to="/desagotes">
                Consultar agenda
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="bg-white text-dark rounded-4 p-4 shadow-sm">
              <p className="small text-uppercase fw-semibold text-primary mb-2">
                Seguimiento operativo
              </p>
              <p className="display-4 fw-bold mb-1">{pendientes.length}</p>
              <p className="text-secondary mb-3">
                solicitudes con trabajo pendiente
              </p>
              <Link className="btn btn-primary w-100" to="/solicitudes">
                Consultar trabajos
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="indicadores-inicio" className="mb-4">
        <h2 id="indicadores-inicio" className="h5 mb-3">
          Resumen de la gestión
        </h2>
        <div className="row g-3 mb-4">
          {indicadores.map(([titulo, cantidad, color]) => (
            <div className="col-12 col-sm-6 col-xl-3" key={titulo}>
              <div
                className={`card h-100 rounded-4 shadow-sm border-0 border-start border-4 border-${color}`}
              >
                <div className="card-body">
                  <p className="text-secondary mb-1">{titulo}</p>
                  <p className="display-6 fw-semibold mb-0">{cantidad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="accesos-inicio" className="mb-4">
        <h2 id="accesos-inicio" className="h5 mb-3">
          Accesos a los servicios
        </h2>
        <div className="row g-3">
          {servicios.map((servicio) => (
            <div className="col-12 col-md-6 col-xl-3" key={servicio.ruta}>
              <article className="card h-100 rounded-4 border-0 shadow-sm">
                <div className="card-body d-flex flex-column p-4">
                  <span
                    className={`badge align-self-start bg-${servicio.color}-subtle text-${servicio.color}-emphasis mb-3`}
                  >
                    Gestión de servicios
                  </span>
                  <h3 className="h5">{servicio.titulo}</h3>
                  <p className="small text-secondary flex-grow-1">
                    {servicio.detalle}
                  </p>
                  <Link
                    className={`btn btn-outline-${servicio.color === 'warning' ? 'dark' : servicio.color} btn-sm mt-2`}
                    to={servicio.ruta}
                  >
                    Abrir {servicio.titulo.toLowerCase()}
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
      <section
        className="card shadow-sm rounded-4 border-0 mb-4"
        aria-labelledby="trabajos-pendientes"
      >
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 id="trabajos-pendientes" className="h5 mb-0">
              Trabajos pendientes
            </h2>
            <Link className="btn btn-primary btn-sm" to="/solicitudes">
              Ver todas las solicitudes
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <caption className="visually-hidden">
                Solicitudes con trabajo operativo pendiente
              </caption>
              <thead className="table-light">
                <tr>
                  <th>Número</th>
                  <th>Servicio</th>
                  <th>Ubicación</th>
                  <th>Prioridad</th>
                  <th>Estado operativo</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.tipo}</td>
                    <td className="text-break">{item.ubicacion}</td>
                    <td>
                      <Badge texto={item.prioridad} />
                    </td>
                    <td>
                      <Badge texto={item.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!pendientes.length && (
              <p className="text-secondary mt-3 mb-0">
                No hay trabajos pendientes.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
