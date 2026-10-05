import { NavLink } from 'react-router-dom';

export default function Navbar({ paginas }) {
  return (
    <div className="bg-white border-bottom">
      <nav className="container py-3" aria-label="Módulos del sistema">
        <ul className="nav nav-pills gap-2">
          {paginas.map((pagina) => (
            <li className="nav-item" key={pagina.ruta}>
              <NavLink
                to={pagina.ruta}
                end={pagina.ruta === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {pagina.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
