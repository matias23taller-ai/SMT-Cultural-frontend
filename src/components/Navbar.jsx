import { Link } from 'react-router-dom';

export default function Navbar({ paginas }) {
  if (!paginas) return null;

  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark mb-4">
      <div className="container">
        <ul className="navbar-nav d-flex flex-row gap-3">
          {paginas.map((pagina) => (
            <li className="nav-item" key={pagina.ruta}>
              <Link className="nav-link" to={pagina.ruta}>
                {pagina.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}