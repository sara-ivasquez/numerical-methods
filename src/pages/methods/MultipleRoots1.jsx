import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import FunctionPlot from '../../components/FunctionPlot'
import { multipleRoots1 } from '../../methods/multipleRoots1'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de Raíces Múltiples 1</strong> modifica Newton-Raphson para raíces de multiplicidad <code>m</code> conocida.</p>
    <p><strong>Fórmula:</strong> Xₙ₊₁ = Xₙ - m · f(Xₙ) / f'(Xₙ)</p>
    <p><strong>Multiplicidad:</strong> m=1 raíz simple, m=2 raíz doble, m=3 raíz triple, etc.</p>
    <p><strong>Ventaja:</strong> Restaura la convergencia cuadrática para raíces múltiples.</p>
    <p><strong>Sintaxis:</strong> usa <code>x</code> como variable. Ej: <code>(x-1)^2 * (x+2)</code></p>
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

export default function MultipleRoots1() {
  const [form, setForm] = useState({ x0: '', m: '2', tol: '1e-7', maxIter: '100', fx: '', errorType: 'absolute' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const res = multipleRoots1({
        x0: parseFloat(form.x0),
        m: parseInt(form.m),
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
    <MethodLayout title="Raíces Múltiples 1" category="Búsqueda de Raíces" helpText={HELP}>
      <form className="method-form" onSubmit={handleSubmit}>
        <div className="method-form__group">
          <label>f(x)</label>
          <input value={form.fx} onChange={set('fx')} placeholder="ej: (x-1)^2 * (x+2)" required />
        </div>
        <div className="method-form__row">
          <div className="method-form__group">
            <label>Valor inicial X0</label>
            <input type="number" step="any" value={form.x0} onChange={set('x0')} placeholder="ej: 0.5" required />
          </div>
          <div className="method-form__group">
            <label>Multiplicidad m</label>
            <input type="number" min="1" value={form.m} onChange={set('m')} placeholder="ej: 2" required />
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