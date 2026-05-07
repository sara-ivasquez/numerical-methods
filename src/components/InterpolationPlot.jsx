import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ComposedChart, ResponsiveContainer } from 'recharts'
import './FunctionPlot.css'

export default function InterpolationPlot({ points, polyFn, polynomial }) {
  const { curve, dots } = useMemo(() => {
    if (!polyFn || !points.length) return { curve: [], dots: [] }

    const xs = points.map((p) => p.x)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const pad  = (maxX - minX) * 0.2 || 1
    const steps = 200

    const curve = []
    for (let i = 0; i <= steps; i++) {
      const x = (minX - pad) + ((maxX - minX + 2 * pad) * i) / steps
      const y = polyFn(x)
      if (isFinite(y) && Math.abs(y) < 1e6)
        curve.push({ x: +x.toFixed(6), y: +y.toFixed(6) })
    }

    const dots = points.map((p) => ({ x: +p.x, y: +p.y }))
    return { curve, dots }
  }, [points, polyFn])

  if (!curve.length) return null

  return (
    <div className="function-plot">
      <p className="function-plot__label">P(x) = <span>{polynomial}</span></p>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="x" type="number" domain={['auto','auto']} stroke="#495670" tick={{ fontSize: 10, fontFamily: 'Space Mono' }} />
          <YAxis stroke="#495670" tick={{ fontSize: 10, fontFamily: 'Space Mono' }} />
          <Tooltip
            contentStyle={{ background: '#1a1d27', border: '1px solid #1f2335', borderRadius: 8, fontFamily: 'Space Mono', fontSize: 11 }}
            labelStyle={{ color: '#66fcf1' }}
            itemStyle={{ color: '#ccd6f6' }}
          />
          <Line data={curve} type="monotone" dataKey="y" stroke="#66fcf1" strokeWidth={2} dot={false} />
          <Scatter data={dots} fill="#c3073f" r={5} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}