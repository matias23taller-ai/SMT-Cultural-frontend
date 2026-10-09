export default function Header() {
    return (
        <header className="bg-primary bg-gradient text-white py-3 shadow-sm">
            <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src="/logo-msmt.png" alt="Ciudad San Miguel de Tucumán" style={{ width: '50px' }} />
                    <div>
                        <p className="h3 fw-bold mb-0">SIGLU</p>
                        <p className="small mb-0 opacity-75">Gestión de Limpieza Urbana</p>
                    </div>
                </div>
            </div>
        </header>
    );
}