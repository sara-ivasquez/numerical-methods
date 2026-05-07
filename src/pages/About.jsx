import './About.css'

const team = [
  { name: 'Tu nombre aquí',       role: 'Desarrollador',  initials: 'TN' },
  { name: 'Nombre compañero',     role: 'Desarrollador',  initials: 'NC' },
]

const methods = [
  { cat: 'Búsqueda de Raíces',    list: ['Bisección','Regula Falsi','Punto Fijo','Newton-Raphson','Secante','Raíces Múltiples 1','Raíces Múltiples 2'] },
  { cat: 'Sistemas de Ecuaciones',list: ['Jacobi','Gauss-Seidel','SOR'] },
  { cat: 'Interpolación',         list: ['Vandermonde','Newton','Lagrange','Spline Lineal','Spline Cúbico'] },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="container">

        {/* Header */}
        <div className="about-hero">
          <p className="tag">Acerca del proyecto</p>
          <h1 className="about-hero__title">NuméricaLab</h1>
          <p className="about-hero__desc">
            Plataforma web interactiva para la visualización y resolución de métodos
            numéricos, desarrollada como proyecto académico para el curso de
            Métodos Numéricos.
          </p>
        </div>

        <div className="about-grid">

          {/* Objetivo */}
          <section className="about-card about-card--full">
            <h2 className="about-card__title">🎯 Objetivo</h2>
            <p className="about-card__text">
              Proporcionar una herramienta educativa que permita a los estudiantes
              explorar, visualizar y comprender el funcionamiento de los principales
              métodos numéricos vistos en clase, a través de una interfaz intuitiva
              con resultados paso a paso y gráficas en tiempo real.
            </p>
          </section>

          {/* Tech */}
          <section className="about-card">
            <h2 className="about-card__title">🛠 Tecnologías</h2>
            <ul className="about-tech-list">
              {['React 18','React Router 6','Math.js','Recharts','Vite'].map(t => (
                <li key={t} className="about-tech-item">{t}</li>
              ))}
            </ul>
          </section>

          {/* Team */}
          <section className="about-card">
            <h2 className="about-card__title">👥 Equipo</h2>
            <div className="about-team">
              {team.map((member) => (
                <div key={member.name} className="about-member">
                  <div className="about-member__avatar">{member.initials}</div>
                  <div>
                    <p className="about-member__name">{member.name}</p>
                    <p className="about-member__role">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Methods */}
          <section className="about-card about-card--full">
            <h2 className="about-card__title">📐 Métodos Implementados</h2>
            <div className="about-methods-grid">
              {methods.map(({ cat, list }) => (
                <div key={cat}>
                  <p className="about-methods-cat">{cat}</p>
                  <ul className="about-methods-list">
                    {list.map(m => <li key={m}>{m}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
