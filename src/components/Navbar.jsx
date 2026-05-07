import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/',        label: 'Inicio' },
  { to: '/methods', label: 'Métodos' },
  { to: '/about',   label: 'Acerca de' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-bracket">[</span>
          NuméricaLab
          <span className="navbar__logo-bracket">]</span>
        </Link>
        <nav className="navbar__links">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${pathname === to ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
