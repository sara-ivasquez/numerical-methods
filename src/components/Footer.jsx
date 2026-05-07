import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__text">
          NuméricaLab — Métodos Numéricos
        </span>
        <span className="footer__text footer__text--dim">
          Proyecto académico · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
