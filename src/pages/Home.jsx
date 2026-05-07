import { Link } from 'react-router-dom'
import './Home.css'

const categories = [
  {
    id: 'roots',
    label: 'Búsqueda de Raíces',
    icon: '∫',
    count: 7,
    description: 'Métodos para encontrar raíces de ecuaciones no lineales.',
    methods: ['Bisección','Regula Falsi','Punto Fijo','Newton-Raphson','Secante','Raíces Múltiples 1','Raíces Múltiples 2'],
  },
  {
    id: 'systems',
    label: 'Sistemas de Ecuaciones',
    icon: '⊡',
    count: 3,
    description: 'Métodos iterativos para resolver sistemas lineales Ax=b.',
    methods: ['Jacobi','Gauss-Seidel','SOR'],
  },
  {
    id: 'interpolation',
    label: 'Interpolación',
    icon: '∿',
    count: 5,
    description: 'Construcción de funciones que pasan por puntos dados.',
    methods: ['Vandermonde','Newton','Lagrange','Spline Lineal','Spline Cúbico'],
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg-grid" />
        <div className="container hero__content">
          <p className="hero__eyebrow tag">Métodos Numéricos · 2025</p>
          <h1 className="hero__title">
            Calcula.<br />
            <span className="hero__title-accent">Itera.</span><br />
            Converge.
          </h1>
          <p className="hero__desc">
            Plataforma interactiva para explorar y resolver métodos numéricos
            con visualizaciones en tiempo real.
          </p>
          <div className="hero__actions">
            <Link to="/methods" className="btn btn--primary">Ver todos los métodos</Link>
            <Link to="/about" className="btn btn--ghost">Acerca del proyecto</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Categorías</h2>
          <div className="categories__grid">
            {categories.map((cat) => (
              <Link to="/methods" key={cat.id} className="cat-card">
                <div className="cat-card__header">
                  <span className="cat-card__icon">{cat.icon}</span>
                  <span className="tag">{cat.count} métodos</span>
                </div>
                <h3 className="cat-card__title">{cat.label}</h3>
                <p className="cat-card__desc">{cat.description}</p>
                <ul className="cat-card__list">
                  {cat.methods.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <span className="cat-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
