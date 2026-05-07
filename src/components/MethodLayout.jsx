import { useState } from 'react'
import { Link } from 'react-router-dom'
import './MethodLayout.css'

export default function MethodLayout({ title, category, helpText, children }) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="method-layout">
      <div className="container">
        <div className="method-layout__breadcrumb">
          <Link to="/methods">← Métodos</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <div className="method-layout__header">
          <div>
            <p className="tag">{category}</p>
            <h1 className="method-layout__title">{title}</h1>
          </div>
          <button className="btn-help" onClick={() => setShowHelp(!showHelp)}>
            {showHelp ? '✕ Cerrar ayuda' : '? Ayuda'}
          </button>
        </div>
        {showHelp && (
          <div className="method-layout__help">
            <h3 className="method-layout__help-title">📘 ¿Cómo funciona?</h3>
            <div className="method-layout__help-text">{helpText}</div>
          </div>
        )}
        <div className="method-layout__body">
          {children}
        </div>
      </div>
    </div>
  )
}