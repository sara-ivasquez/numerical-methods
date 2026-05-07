import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import MatrixInput from '../../components/MatrixInput'
import { jacobi } from '../../methods/jacobi'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de Jacobi</strong> resuelve sistemas Ax=b de forma iterativa, actualizando todas las variables simultáneamente en cada iteración.</p>
    <p><strong>Fórmula:</strong> xᵢ⁽ᵏ⁺¹⁾ = (bᵢ - Σaᵢⱼxⱼ⁽ᵏ⁾) / aᵢᵢ , j≠i</p>
    <p><strong>Condición:</strong> Converge si la matriz es diagonal dominante.</p>
    <p><strong>Error:</strong> Norma infinito del vector de diferencias entre iteraciones.</p>
  </>
)

const DEFAULT_N = 3

function makeMatrix(n) { return Array.from({ length: n }, () => Array(n).fill('')) }
function makeVector(n) { return Array(n).fill('') }

export default function Jacobi() {
  const [n, setN] = useState(DEFAULT_N)
  const [A, setA] = useState(makeMatrix(DEFAULT_N))
  const [b, setB] = useState(makeVector(DEFAULT_N))
  const [x0, setX0] = useState(makeVector(DEFAULT_N))
  const [tol, setTol] = useState('1e-7')
  const [maxIter, setMaxIter] = useState('100')
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

  const handleA = (i, j, v) => {
    const next = A.map((r) => [...r])
    next[i][j] = v
    setA(next)
  }
  const handleB = (i, v) => { const next = [...b]; next[i] = v; setB(next) }
  const handleX0 = (i, v) => { const next = [...x0]; next[i] = v; setX0(next) }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const res = jacobi({
        A:  A.map((r) => r.map(Number)),
        b:  b.map(Number),
        x0: x0.map(Number),
        tol: parseFloat(tol),
        maxIter: parseInt(maxIter),
        errorType,
      })
      setResult(res)
    } catch {
      setError('Error al procesar los datos. Verifica que todos los campos estén completos.')
    }
  }

  // Columnas dinámicas según n
  const columns = [
    { key: 'iter', label: 'N' },
    ...Array.from({ length: n }, (_, i) => ({ key: `x${i + 1}`, label: `x${i + 1}` })),
    { key: 'error', label: 'Error' },
  ]

  return (
    <MethodLayout title="Jacobi" category="Sistemas de Ecuaciones" helpText={HELP}>
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
            <label>Tolerancia</label>
            <input value={tol} onChange={(e) => setTol(e.target.value)} placeholder="ej: 1e-7" required />
          </div>
          <div className="method-form__group">
            <label>Máx. iteraciones</label>
            <input type="number" value={maxIter} onChange={(e) => setMaxIter(e.target.value)} required />
          </div>
        </div>
        <div className="method-form__group">
          <label>Tipo de error</label>
          <select value={errorType} onChange={(e) => setErrorType(e.target.value)}>
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