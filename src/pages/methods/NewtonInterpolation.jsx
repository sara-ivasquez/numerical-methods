import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import InterpolationPlot from '../../components/InterpolationPlot'
import PointsInput from '../../components/PointsInput'
import { newtonInterpolation } from '../../methods/newtonInterpolation'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de Newton</strong> construye el polinomio interpolante usando diferencias divididas.</p>
    <p><strong>Ventaja:</strong> Permite agregar nuevos puntos sin recalcular todo el polinomio.</p>
    <p><strong>Forma:</strong> P(x) = f[x₀] + f[x₀,x₁](x-x₀) + f[x₀,x₁,x₂](x-x₀)(x-x₁) + ...</p>
    <p><strong>Nota:</strong> Los valores de x deben ser distintos.</p>
  </>
)

export default function NewtonInterpolation() {
  const [points, setPoints] = useState([
    { x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }
  ])
  const [result, setResult] = useState(null)
  const [error, setError]   = useState('')

  const handleChange = (i, key, val) => {
    const next = [...points]; next[i] = { ...next[i], [key]: val }; setPoints(next)
  }
  const handleAdd    = () => setPoints([...points, { x: '', y: '' }])
  const handleRemove = (i) => setPoints(points.filter((_, j) => j !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    const parsed = points.map((p) => ({ x: parseFloat(p.x), y: parseFloat(p.y) }))
    if (parsed.some((p) => isNaN(p.x) || isNaN(p.y)))
      return setError('Todos los puntos deben tener valores numéricos.')
    const xs = parsed.map((p) => p.x)
    if (new Set(xs).size !== xs.length)
      return setError('Los valores de x deben ser distintos.')
    try {
      setResult(newtonInterpolation({ points: parsed }))
    } catch {
      setError('Error al calcular. Verifica los puntos ingresados.')
    }
  }

  // Columnas dinámicas de diferencias divididas
  const columns = result ? [
    { key: 'punto', label: 'Punto' },
    ...Array.from({ length: points.length }, (_, i) => ({
      key: `d${i}`, label: i === 0 ? 'f[x]' : `f[x]${Array(i).fill('\'').join('')}`
    }))
  ] : []

  return (
    <MethodLayout title="Newton Interpolación" category="Interpolación" helpText={HELP}>
      <form className="method-form" onSubmit={handleSubmit}>
        <PointsInput
          points={points}
          onChange={handleChange}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
        {error && <p className="method-form__error">{error}</p>}
        <button type="submit" className="method-form__btn">Calcular</button>
      </form>

      <div className="method-results">
        {result && (
          <>
            <InterpolationPlot
              points={points.map((p) => ({ x: parseFloat(p.x), y: parseFloat(p.y) }))}
              polyFn={result.polyFn}
              polynomial={result.polynomial}
            />
            <div className="solution-box">
              <p className="solution-box__title">Tabla de diferencias divididas</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  <thead>
                    <tr>
                      {columns.map((c) => (
                        <th key={c.key} style={{ padding: '0.5rem 0.75rem', color: 'var(--accent)', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.table.map((row, i) => (
                      <tr key={i}>
                        {columns.map((c) => (
                          <td key={c.key} style={{ padding: '0.45rem 0.75rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                            {row[c.key] !== undefined
                              ? typeof row[c.key] === 'number'
                                ? row[c.key].toFixed(6)
                                : row[c.key]
                              : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </MethodLayout>
  )
}