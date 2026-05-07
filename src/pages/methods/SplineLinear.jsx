import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import InterpolationPlot from '../../components/InterpolationPlot'
import PointsInput from '../../components/PointsInput'
import ResultsTable from '../../components/ResultsTable'
import { splineLinear } from '../../methods/splineLinear'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>Spline Lineal</strong> conecta cada par de puntos consecutivos con una línea recta.</p>
    <p><strong>Cada tramo:</strong> S(x) = mᵢ·x + bᵢ para x ∈ [xᵢ, xᵢ₊₁]</p>
    <p><strong>Donde:</strong> mᵢ = (yᵢ₊₁ - yᵢ) / (xᵢ₊₁ - xᵢ)</p>
    <p><strong>Ventaja:</strong> Simple y siempre continuo.</p>
    <p><strong>Desventaja:</strong> No es diferenciable en los nodos.</p>
  </>
)

const COLUMNS = [
  { key: 'tramo',      label: 'Tramo' },
  { key: 'pendiente',  label: 'Pendiente m' },
  { key: 'intercepto', label: 'Intercepto b' },
  { key: 'ecuacion',   label: 'Ecuación' },
]

export default function SplineLinear() {
  const [points, setPoints] = useState([
    { x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }
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
    if (parsed.length < 2)
      return setError('Se necesitan al menos 2 puntos.')
    try {
      setResult(splineLinear({ points: parsed }))
    } catch {
      setError('Error al calcular. Verifica los puntos ingresados.')
    }
  }

  return (
    <MethodLayout title="Spline Lineal" category="Interpolación" helpText={HELP}>
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