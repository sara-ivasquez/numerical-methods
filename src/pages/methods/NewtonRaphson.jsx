import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import FunctionPlot from '../../components/FunctionPlot'
import { newtonRaphson } from '../../methods/newtonRaphson'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de Newton-Raphson</strong> usa la tangente a la curva en cada punto para aproximarse a la raíz.</p>
    <p><strong>Fórmula:</strong> Xₙ₊₁ = Xₙ - f(Xₙ) / f'(Xₙ)</p>
    <p><strong>Ventaja:</strong> Convergencia cuadrática — muy rápido cerca de la raíz.</p>
    <p><strong>Nota:</strong> La derivada se calcula automáticamente.</p>
    <p><strong>Sintaxis:</strong> usa <code>x</code> como variable. Ej: <code>x^3 - x - 2</code>, <code>cos(x) - x</code></p>
  </>
)

const COLUMNS = [
  { key: 'iter',  label: 'N' },
  { key: 'xn',    label: 'Xn' },
  { key: 'fxn',   label: 'f(Xn)' },
  { key: 'dfxn',  label: "f'(Xn)" },
  { key: 'xn1',   label: 'Xn+1' },
  { key: 'error', label: 'Error' },
]

export default function NewtonRaphson() {
  const [form, setForm] = useState({ x0: '', tol: '1e-7', maxIter: '100', fx: '', errorType: 'absolute' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const res = newtonRaphson({
        x0: parseFloat(form.x0),
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
    <MethodLayout title="Newton-Raphson" category="Búsqueda de Raíces" helpText={HELP}>
      <form className="method-form" onSubmit={handleSubmit}>
        <div className="method-form__group">
          <label>f(x)</label>
          <input value={form.fx} onChange={set('fx')} placeholder="ej: x^3 - x - 2" required />
        </div>
        <div className="method-form__group">
          <label>Valor inicial X0</label>
          <input type="number" step="any" value={form.x0} onChange={set('x0')} placeholder="ej: 1.5" required />
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