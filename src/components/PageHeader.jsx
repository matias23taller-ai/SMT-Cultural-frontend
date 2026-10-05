export default function PageHeader({ titulo, descripcion }) {
  return (
    <div className="mb-4">
      <h1 className="h2" id="titulo-pagina">
        {titulo}
      </h1>
      <p className="text-secondary mb-0">{descripcion}</p>
    </div>
  );
}
