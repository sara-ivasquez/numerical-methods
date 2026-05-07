import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import FunctionPlot from '../../components/FunctionPlot'
import { secant } from '../../methods/secant'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de la Secante</strong> aproxima la derivada de Newton-Raphson usando dos puntos anteriores, sin necesidad de calcularla.</p>
    <p><strong>Fórmula:</strong> Xₙ₊₁ = Xₙ - f(Xₙ)·(Xₙ - Xₙ₋₁) / (f(Xₙ) - f(Xₙ₋₁))</p>
    <p><strong>Ventaja:</strong> No requiere derivada. Convergencia superlineal.</p>
    <p><strong>Sintaxis:</strong> usa <code>x</code> como variable. Ej: <code>x^3 - x - 2</code></p>
  </>
)

const COLUMNS = [
  { key: 'iter',  label: 'N' },
  { key: 'xa',    label: 'X0' },
  { key: 'xb',    label: 'X1' },
  { key: 'xc',    label: 'X2' },
  { key: 'fxc',   label: 'f(X2)' },
  { key: 'error', label: 'Error' },
]

export default function Secant() {
  const [form, setForm] = useState({ x0: '', x1: '', tol: '1e-7', maxIter: '100', fx: '', errorType: 'absolute' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const res = secant({
        x0: parseFloat(form.x0),
        x1: parseFloat(form.x1),
        tol: parseFloat(form.tol),
        maxIter: parseInt(form.maxIter),
        fx: form.fx.trim(),
        errorType: form.errorType,
      })
      setResult(res)
    } catch {
      setError('Error al evaluar la función. Verifica la sintaxis.')
    }
  }

  return (
    <MethodLayout title="Secante" category="Búsqueda de Raíces" helpText={HELP}>
      <form className="method-form" onSubmit={handleSubmit}>
        <div className="method-form__group">
          <label>f(x)</label>
          <input value={form.fx} onChange={set('fx')} placeholder="ej: x^3 - x - 2" required />
        </div>
        <div className="method-form__row">
          <div className="method-form__group">
            <label>Valor inicial X0</label>
            <input type="number" step="any" value={form.x0} onChange={set('x0')} placeholder="ej: 1" required />
          </div>
          <div className="method-form__group">
            <label>Valor inicial X1</label>
            <input type="number" step="any" value={form.x1} onChange={set('x1')} placeholder="ej: 2" required />
          </div>
        </div>
        <div className="method-form__row">
          <div className="method-form__group">
            <label>Tolerancia</label>
            <input value={form.tol} onChange={set('tol')} placeholder="ej: 1e-7" required />
          </div>
          <div className="method-form__group">
            <label>Máx. iteraciones</label>
            <input type="number" value={form.maxIter} onChange={set('maxIter')} required />
          </div>
        </div>
        <div className="method-form__group">
          <label>Tipo de error</label>
          <select value={form.errorType} onChange={set('errorType')}>
            <option value="absolute">Absoluto</option>
            <option value="relative">Relativo</option>
          </select>
        </div>
        {error && <p className="method-form__error">{error}</p>}
        <button type="submit" className="method-form__btn">Calcular</button>
      </form>

      <div className="method-results">
        {result && (
          <>
            <FunctionPlot fx={form.fx} root={result.root} />
            <ResultsTable columns={COLUMNS} rows={result.table} message={result.message} success={result.success} />
          </>
        )}
      </div>
    </MethodLayout>
  )
}