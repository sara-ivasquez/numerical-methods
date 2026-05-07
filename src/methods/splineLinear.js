export function splineLinear({ points }) {
  const n = points.length
  const sorted = [...points].sort((a, b) => a.x - b.x)
  const x = sorted.map((p) => p.x)
  const y = sorted.map((p) => p.y)

  // Calcular tramos lineales
  const segments = []
  for (let i = 0; i < n - 1; i++) {
    const m = (y[i + 1] - y[i]) / (x[i + 1] - x[i])
    const b = y[i] - m * x[i]
    segments.push({ x0: x[i], x1: x[i + 1], m, b })
  }

  // Función spline
  const polyFn = (xVal) => {
    if (xVal <= x[0]) return y[0]
    if (xVal >= x[n - 1]) return y[n - 1]
    const seg = segments.find((s) => xVal >= s.x0 && xVal <= s.x1)
    return seg ? seg.m * xVal + seg.b : NaN
  }

  // Tabla de tramos
  const table = segments.map((s, i) => ({
    tramo: `[${s.x0}, ${s.x1}]`,
    pendiente: s.m,
    intercepto: s.b,
    ecuacion: `${s.m.toFixed(4)}x + ${s.b.toFixed(4)}`,
  }))

  return {
    success: true,
    message: `${n - 1} tramos lineales construidos con ${n} puntos.`,
    segments, polyFn, table,
    polynomial: `Spline lineal con ${n - 1} tramos`,
  }
}