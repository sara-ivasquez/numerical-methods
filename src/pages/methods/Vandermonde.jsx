import { useState } from 'react'
import MethodLayout from '../../components/MethodLayout'
import ResultsTable from '../../components/ResultsTable'
import InterpolationPlot from '../../components/InterpolationPlot'
import PointsInput from '../../components/PointsInput'
import { vandermonde } from '../../methods/vandermonde'
import './MethodForm.css'

const HELP = (
  <>
    <p>El <strong>método de Vandermonde</strong> construye el polinomio interpolante resolviendo el sistema de ecuaciones formado por la matriz de Vandermonde.</p>
    <p><strong>Matriz:</strong> Vᵢⱼ = xᵢʲ</p>
    <p><strong>Resultado:</strong> Polinomio de grado n-1 que pasa exactamente por los n puntos dados.</p>
    <p><strong>Nota:</strong> Los valores de x deben ser distintos.</p>
  </>
)

const COLUMNS = [
  { key: 'term',  label: 'Término' },
  { key: 'power', label: 'Potencia' },
  { key: 'coeff', label: 'Coeficiente' },
]

export default function Vandermonde() {
  const [points, setPoints] = useState([
    { x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }
  ])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (i, key, val) => {
    const next = [...points]
    next[i] = { ...next[i], [key]: val }
    setPoints(next)
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
      setResult(vandermonde({ points: parsed }))
    } catch {
      setError('Error al calcular. Verifica los puntos ingresados.')
    }
  }

  return (
    <MethodLayout title="Vandermonde" category="Interpolación" helpText={HELP}>
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
            <ResultsTable columns={COLUMNS} rows={result.table} message={result.message} success={result.success} />
          </>
        )}
      </div>
    </MethodLayout>
  )
}