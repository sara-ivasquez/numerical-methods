import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import FunctionPlot from '../../components/FunctionPlot'
import { regulaFalsi } from '../../methods/regulaFalsi'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de Regula Falsi</strong> (Falsa Posición) mejora la bisección usando interpolación lineal entre los extremos del intervalo en lugar del punto medio.</p>
    <p><strong>Fórmula:</strong> Xr = b - f(b)·(b-a) / (f(b)-f(a))</p>
    <p><strong>Ventaja:</strong> Converge más rápido que bisección en muchos casos.</p>
    <p><strong>Sintaxis:</strong> usa <code>x</code> como variable. Ej: <code>x^3 - x - 2</code>, <code>cos(x) - x</code></p>
  </>
)

const COLUMNS = [
  { key: 'iter',  label: 'N' },
  { key: 'a',     label: 'a' },
  { key: 'b',     label: 'b' },
  { key: 'xr',    label: 'Xr' },
  { key: 'fxr',   label: 'f(Xr)' },
  { key: 'error', label: 'Error' },
]

export default function RegulaFalsi() {
  const [form, setForm] = useState({ a: '', b: '', tol: '1e-7', maxIter: '100', fx: '', errorType: 'absolute' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const res = regulaFalsi({
        a: parseFloat(form.a), b: parseFloat(form.b),
        tol: parseFloat(form.tol), maxIter: parseInt(form.maxIter),
        fx: form.fx.trim(), errorType: form.errorType,
      })
      setResult(res)
    } catch {
      setError('Error al evaluar la función. Verifica la sintaxis.')
    }
  }

  return (
    <MethodLayout title="Regula Falsi" category="Búsqueda de Raíces" helpText={HELP}>
      <form className="method-form" onSubmit={handleSubmit}>
        <div className="method-form__group">
          <label>f(x)</label>
          <input value={form.fx} onChange={set('fx')} placeholder="ej: x^3 - x - 2" required />
        </div>
        <div className="method-form__row">
          <div className="method-form__group">
            <label>Extremo a</label>
            <input type="number" step="any" value={form.a} onChange={set('a')} placeholder="ej: 1" required />
          </div>
          <div className="method-form__group">
            <label>Extremo b</label>
            <input type="number" step="any" value={form.b} onChange={set('b')} placeholder="ej: 2" required />
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