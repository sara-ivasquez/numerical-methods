import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Methods.css'

const allMethods = [
  // Raíces
  { id: 'bisection',       label: 'Bisección',         category: 'roots',         status: 'ready',   desc: 'Divide el intervalo a la mitad sucesivamente hasta encontrar la raíz.' },
  { id: 'regula-falsi',    label: 'Regula Falsi',       category: 'roots',         status: 'ready',   desc: 'Interpolación lineal entre extremos del intervalo para hallar la raíz.' },
  { id: 'fixed-point',     label: 'Punto Fijo',         category: 'roots',         status: 'ready',   desc: 'Transforma f(x)=0 en x=g(x) e itera hasta converger.' },
  { id: 'newton-raphson',  label: 'Newton-Raphson',     category: 'roots',         status: 'ready',   desc: 'Usa la derivada para acelerar la convergencia hacia la raíz.' },
  { id: 'secant',          label: 'Secante',            category: 'roots',         status: 'ready',   desc: 'Aproxima la derivada con diferencias finitas, sin calcularla.' },
  { id: 'multiple-roots-1',label: 'Raíces Múltiples 1', category: 'roots',         status: 'ready',   desc: 'Modificación de Newton para raíces de multiplicidad conocida.' },
  { id: 'multiple-roots-2',label: 'Raíces Múltiples 2', category: 'roots',         status: 'ready',   desc: 'Variante que detecta la multiplicidad automáticamente.' },
  // Sistemas
  { id: 'jacobi',          label: 'Jacobi',             category: 'systems',       status: 'ready',   desc: 'Método iterativo que actualiza todas las variables simultáneamente.' },
  { id: 'gauss-seidel',    label: 'Gauss-Seidel',       category: 'systems',       status: 'ready',   desc: 'Mejora Jacobi usando los valores actualizados inmediatamente.' },
  { id: 'sor',             label: 'SOR',                category: 'systems',       status: 'ready',   desc: 'Gauss-Seidel con factor de relajación ω para acelerar convergencia.' },
  // Interpolación
  { id: 'vandermonde',     label: 'Vandermonde',        category: 'interpolation', status: 'ready',   desc: 'Construye el polinomio interpolante mediante la matriz de Vandermonde.' },
  { id: 'newton-interpol', label: 'Newton',             category: 'interpolation', status: 'ready',   desc: 'Polinomio interpolante usando diferencias divididas de Newton.' },
  { id: 'lagrange',        label: 'Lagrange',           category: 'interpolation', status: 'ready',   desc: 'Interpolación mediante polinomios base de Lagrange.' },
  { id: 'spline-linear',   label: 'Spline Lineal',      category: 'interpolation', status: 'ready',   desc: 'Tramos lineales entre puntos para interpolación suave.' },
  { id: 'spline-cubic',    label: 'Spline Cúbico',      category: 'interpolation', status: 'ready',   desc: 'Tramos cúbicos con continuidad de primera y segunda derivada.' },
]

const categoryLabels = {
  all:           'Todos',
  roots:         'Búsqueda de Raíces',
  systems:       'Sistemas de Ecuaciones',
  interpolation: 'Interpolación',
}

export default function Methods() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? allMethods
    : allMethods.filter(m => m.category === active)

  return (
    <div className="methods-page">
      <div className="container">
        <div className="methods-page__header">
          <p className="tag">15 métodos disponibles</p>
          <h1 className="methods-page__title">Métodos Numéricos</h1>
          <p className="methods-page__desc">
            Selecciona un método para introducir tus datos y obtener la solución paso a paso.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="methods-page__tabs">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`methods-page__tab ${active === key ? 'methods-page__tab--active' : ''}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="methods-grid">
          {filtered.map((method) => (
            <Link key={method.id} to={`/methods/${method.id}`} className="method-card">
              <div className="method-card__top">
                <span className={`method-card__cat method-card__cat--${method.category}`}>
                  {categoryLabels[method.category]}
                </span>
              </div>
              <h3 className="method-card__name">{method.label}</h3>
              <p className="method-card__desc">{method.desc}</p>
              <span className="method-card__cta">Resolver →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
