import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const manejarIngreso = (e) => {
    e.preventDefault(); 
    navigate('/inicio'); 
  };

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      
      {/* Tarjeta de inicio de sesión */}
      <div className="card shadow-lg p-5" style={{ width: '400px', borderRadius: '12px', border: 'none' }}>
        
        {/* Logo */}
        <div className="text-center mb-4">
          {/* Asegúrate de guardar la imagen del logo en la carpeta public/ */}
          <img src="/logo-smt.png" alt="Ciudad San Miguel de Tucumán" style={{ maxWidth: '150px' }} />
        </div>

        {/* Formulario */}
        <form onSubmit={manejarIngreso}>
          <div className="mb-4">
            <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem' }}>Nº CUIL</label>
            {/* Clases para que parezca una línea inferior como en tu imagen */}
            <input type="text" className="form-control border-0 border-bottom rounded-0 px-0" required />
          </div>

          <div className="mb-4">
            <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem' }}>Contraseña</label>
            <input type="password" className="form-control border-0 border-bottom rounded-0 px-0" required />
          </div>

          {/* Botón Ingresar */}
          <button type="submit" className="btn btn-primary w-100 fw-bold mb-3" style={{ borderRadius: '6px' }}>
            INGRESAR
          </button>
        </form>

        {/* Enlaces inferiores */}
        <div className="text-center" style={{ fontSize: '0.85rem' }}>
          <a href="#" className="text-decoration-none d-block mb-3">REGISTRARSE</a>
          <a href="#" className="text-decoration-none text-muted d-block mb-3">¿Olvidó su clave? Haga click <span className="text-primary fw-bold">aquí</span></a>
          
          <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
            <a href="#" className="text-decoration-none">Reenviar email de validación</a>
            <a href="#" className="text-decoration-none">¿Desea reactivar su cuenta?</a>
          </div>
        </div>

      </div>
    </div>
  );
}