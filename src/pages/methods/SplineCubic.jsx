import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import InterpolationPlot from '../../components/InterpolationPlot'
import PointsInput from '../../components/PointsInput'
import ResultsTable from '../../components/ResultsTable'
import { splineCubic } from '../../methods/splineCubic'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>Spline Cúbico Natural</strong> conecta los puntos con polinomios cúbicos garantizando continuidad de la función, primera y segunda derivada.</p>
    <p><strong>Cada tramo:</strong> S(x) = a + b(x-xᵢ) + c(x-xᵢ)² + d(x-xᵢ)³</p>
    <p><strong>Condición natural:</strong> S''(x₀) = S''(xₙ) = 0</p>
    <p><strong>Ventaja:</strong> Muy suave, sin oscilaciones bruscas.</p>
    <p><strong>Nota:</strong> Se necesitan al menos 3 puntos.</p>
  </>
)

const COLUMNS = [
  { key: 'tramo', label: 'Tramo' },
  { key: 'a',     label: 'a' },
  { key: 'b',     label: 'b' },
  { key: 'c',     label: 'c' },
  { key: 'd',     label: 'd' },
]

export default function SplineCubic() {
  const [points, setPoints] = useState([
    { x: '', y: '' }, { x: '', y: '' },
    { x: '', y: '' }, { x: '', y: '' }
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
    if (parsed.length < 3)
      return setError('Se necesitan al menos 3 puntos.')
    try {
      setResult(splineCubic({ points: parsed }))
    } catch {
      setError('Error al calcular. Verifica los puntos ingresados.')
    }
  }

  return (
    <MethodLayout title="Spline Cúbico" category="Interpolación" helpText={HELP}>
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
            <ResultsTable
              columns={COLUMNS}
              rows={result.table}
              message={result.message}
              success={result.success}
            />
          </>
        )}
      </div>
    </MethodLayout>
  )
}