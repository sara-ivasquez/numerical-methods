import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import MatrixInput from '../../components/MatrixInput'
import { sor } from '../../methods/sor'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método SOR</strong> (Successive Over-Relaxation) es Gauss-Seidel con un factor de relajación ω que acelera la convergencia.</p>
    <p><strong>Fórmula:</strong> xᵢ⁽ᵏ⁺¹⁾ = (1-ω)xᵢ⁽ᵏ⁾ + ω · xᵢᴳˢ</p>
    <p><strong>Factor ω:</strong> debe estar en (0, 2).</p>
    <ul>
      <li>ω = 1 → equivale a Gauss-Seidel</li>
      <li>ω &lt; 1 → sub-relajación</li>
      <li>ω &gt; 1 → sobre-relajación (más rápido)</li>
    </ul>
  </>
)

function makeMatrix(n) { return Array.from({ length: n }, () => Array(n).fill('')) }
function makeVector(n) { return Array(n).fill('') }

export default function SOR() {
  const [n, setN] = useState(3)
  const [A, setA] = useState(makeMatrix(3))
  const [b, setB] = useState(makeVector(3))
  const [x0, setX0] = useState(makeVector(3))
  const [tol, setTol] = useState('1e-7')
  const [maxIter, setMaxIter] = useState('100')
  const [omega, setOmega] = useState('1.25')
  const [errorType, setErrorType] = useState('absolute')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleN = (e) => {
    const val = parseInt(e.target.value)
    setN(val)
    setA(makeMatrix(val))
    setB(makeVector(val))
    setX0(makeVector(val))
    setResult(null)
  }

  const handleA  = (i, j, v) => { const next = A.map((r) => [...r]); next[i][j] = v; setA(next) }
  const handleB  = (i, v) => { const next = [...b]; next[i] = v; setB(next) }
  const handleX0 = (i, v) => { const next = [...x0]; next[i] = v; setX0(next) }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const res = sor({
        A:  A.map((r) => r.map(Number)),
        b:  b.map(Number),
        x0: x0.map(Number),
        tol: parseFloat(tol),
        maxIter: parseInt(maxIter),
        omega: parseFloat(omega),
        errorType,
      })
      setResult(res)
    } catch {
      setError('Error al procesar los datos. Verifica que todos los campos estén completos.')
    }
  }

  const columns = [
    { key: 'iter', label: 'N' },
    ...Array.from({ length: n }, (_, i) => ({ key: `x${i + 1}`, label: `x${i + 1}` })),
    { key: 'error', label: 'Error' },
  ]

  return (
    <MethodLayout title="SOR" category="Sistemas de Ecuaciones" helpText={HELP}>
      <form className="method-form" onSubmit={handleSubmit}>
        <div className="method-form__group">
          <label>Tamaño del sistema (n×n)</label>
          <select value={n} onChange={handleN}>
            {[2, 3, 4, 5].map((v) => <option key={v} value={v}>{v}×{v}</option>)}
          </select>
        </div>

        <MatrixInput n={n} A={A} b={b} x0={x0}
          onChangeA={handleA} onChangeB={handleB} onChangeX0={handleX0} />

        <div className="method-form__row">
          <div className="method-form__group">
            <label>Factor ω (omega)</label>
            <input
              type="number" step="0.01" min="0.01" max="1.99"
              value={omega} onChange={(e) => setOmega(e.target.value)}
              placeholder="ej: 1.25" required
            />
          </div>
          <div className="method-form__group">
            <label>Tolerancia</label>
            <input value={tol} onChange={(e) => setTol(e.target.value)} placeholder="ej: 1e-7" required />
          </div>
        </div>
        <div className="method-form__row">
          <div className="method-form__group">
            <label>Máx. iteraciones</label>
            <input type="number" value={maxIter} onChange={(e) => setMaxIter(e.target.value)} required />
          </div>
          <div className="method-form__group">
            <label>Tipo de error</label>
            <select value={errorType} onChange={(e) => setErrorType(e.target.value)}>
              <option value="absolute">Absoluto</option>
              <option value="relative">Relativo</option>
            </select>
          </div>
        </div>
        {error && <p className="method-form__error">{error}</p>}
        <button type="submit" className="method-form__btn">Calcular</button>
      </form>

      <div className="method-results">
        {result && (
          <>
            {result.solution && (
              <div className="solution-box">
                <p className="solution-box__title">Solución</p>
                {result.solution.map((v, i) => (
                  <p key={i} className="solution-box__item">
                    x<sub>{i + 1}</sub> = <span>{v.toFixed(8)}</span>
                  </p>
                ))}
              </div>
            )}
            <ResultsTable columns={columns} rows={result.table} message={result.message} success={result.success} />
          </>
        )}
      </div>
    </MethodLayout>
  )
}