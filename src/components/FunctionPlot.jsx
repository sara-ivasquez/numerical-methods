import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { evaluate } from 'mathjs'
import './FunctionPlot.css'

export default function FunctionPlot({ fx, root }) {
  const data = useMemo(() => {
    if (!fx) return []
    const center = root ?? 0
    const range = 4
    const steps = 200
    const result = []
    for (let i = 0; i <= steps; i++) {
      const x = center - range + (2 * range * i) / steps
      try {
        const y = evaluate(fx, { x })
        if (isFinite(y) && Math.abs(y) < 1e6)
          result.push({ x: +x.toFixed(6), y: +y.toFixed(6) })
      } catch { }
    }
    return result
  }, [fx, root])

  if (!data.length) return null

  return (
    <div className="function-plot">
      <p className="function-plot__label">f(x) = <span>{fx}</span></p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="x" stroke="#495670" tick={{ fontSize: 10, fontFamily: 'Space Mono' }} />
          <YAxis stroke="#495670" tick={{ fontSize: 10, fontFamily: 'Space Mono' }} />
          <Tooltip
            contentStyle={{ background: '#1a1d27', border: '1px solid #1f2335', borderRadius: 8, fontFamily: 'Space Mono', fontSize: 11 }}
            labelStyle={{ color: '#66fcf1' }}
            itemStyle={{ color: '#ccd6f6' }}
          />
          <ReferenceLine y={0} stroke="#495670" strokeWidth={1} />
          {root != null && (
            <ReferenceLine x={+root.toFixed(6)} stroke="#66fcf1" strokeDasharray="4 2" strokeWidth={1.5}
              label={{ value: `x≈${root.toFixed(4)}`, fill: '#66fcf1', fontSize: 10 }} />
          )}
          <Line type="monotone" dataKey="y" stroke="#66fcf1" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#66fcf1' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}