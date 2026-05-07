import { useParams, Link } from 'react-router-dom'
import './MethodPlaceholder.css'

export default function MethodPlaceholder() {
  const { id } = useParams()

  const name = id
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <main className="method-placeholder">
      <div className="container">
        <Link to="/" className="method-placeholder__back">← Volver al inicio</Link>
        <div className="method-placeholder__card">
          <div className="method-placeholder__icon">🚧</div>
          <h1 className="method-placeholder__title">{name}</h1>
          <p className="method-placeholder__text">
            Este módulo está en construcción. Aquí irá la implementación
            completa del método con formulario de entrada, tabla de iteraciones
            y gráfica.
          </p>
          <div className="method-placeholder__badge">Próximamente</div>
        </div>
      </div>
    </main>
  )
}
