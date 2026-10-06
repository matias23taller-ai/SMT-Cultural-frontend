import { Routes, Route } from 'react-router-dom';
import Login from '../Login.jsx'; 
import Inicio from '../../pages/Inicio.jsx';
import Solicitudes from '../../pages/Solicitudes.jsx';
import Inspecciones from '../../pages/Inspecciones.jsx';
import Imbornales from '../../pages/Imbornales.jsx';
import Desagotes from '../../pages/Desagotes.jsx';
import NoEncontrada from '../../pages/NoEncontrada.jsx';
import Mantenimiento from '../../pages/Mantenimiento.jsx';

export default function Rutas({
  datos,
  agregarSolicitud,
  cambiarEstadoSolicitud,
  agregarActa,
  cambiarEstadoActa,
  agregarImbornal,
  actualizarImbornal,
  programarDesagote
}) {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Inicio datos={datos} />} />
      
      <Route
        path="/solicitudes"
        element={
          <Solicitudes
            datos={datos}
            agregar={agregarSolicitud}
            cambiarEstado={cambiarEstadoSolicitud}
          />
        }
      />
      <Route
        path="/inspecciones"
        element={
          <Inspecciones
            datos={datos}
            agregar={agregarActa}
            cambiarEstado={cambiarEstadoActa}
          />
        }
      />
      <Route
        path="/imbornales"
        element={
          <Imbornales
            datos={datos}
            agregar={agregarImbornal}
            actualizar={actualizarImbornal}
          />
        }
      />
      <Route
        path="/desagotes"
        element={
          <Desagotes
            datos={datos}
            programar={programarDesagote}
            cambiarEstado={cambiarEstadoSolicitud}
          />
        }
      />
      <Route path="*" element={<NoEncontrada />} />
      <Route path="/404" element={<NoEncontrada />} />
      <Route path="/mantenimiento" element={<Mantenimiento />} />
    </Routes>
  );
}