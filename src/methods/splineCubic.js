export function splineCubic({ points }) {
  const sorted = [...points].sort((a, b) => a.x - b.x)
  const n = sorted.length
  const x = sorted.map((p) => p.x)
  const y = sorted.map((p) => p.y)
  const m = n - 1 // número de tramos

  // Diferencias h
  const h = Array.from({ length: m }, (_, i) => x[i + 1] - x[i])

  // Sistema tridiagonal para las segundas derivadas (M)
  const size = n - 2
  if (size <= 0) {
    // Solo 2 puntos — spline lineal
    const slope = (y[1] - y[0]) / h[0]
    const polyFn = (xVal) => y[0] + slope * (xVal - x[0])
    return {
      success: true,
      message: 'Solo 2 puntos: tramo lineal.',
      polyFn, table: [],
      polynomial: 'Spline cúbico (2 puntos)',
    }
  }

  // Construir sistema tridiagonal
  const diag  = Array(size).fill(0)
  const upper = Array(size - 1).fill(0)
  const lower = Array(size - 1).fill(0)
  const rhs   = Array(size).fill(0)

  for (let i = 0; i < size; i++) {
    diag[i] = 2 * (h[i] + h[i + 1])
    if (i > 0)        lower[i - 1] = h[i]
    if (i < size - 1) upper[i]     = h[i + 1]
    rhs[i] = 6 * ((y[i + 2] - y[i + 1]) / h[i + 1] - (y[i + 1] - y[i]) / h[i])
  }

  // Resolver sistema tridiagonal (Thomas algorithm)
  const c = [...diag]
  const d = [...rhs]
  for (let i = 1; i < size; i++) {
    const w = lower[i - 1] / c[i - 1]
    c[i] -= w * upper[i - 1]
    d[i] -= w * d[i - 1]
  }

  const M = Array(n).fill(0) // condiciones de frontera natural: M[0]=M[n-1]=0
  M[size] = d[size - 1] / c[size - 1]
  for (let i = size - 2; i >= 0; i--) {
    M[i + 1] = (d[i] - upper[i] * M[i + 2]) / c[i]
  }

  // Coeficientes de cada tramo
  const segments = Array.from({ length: m }, (_, i) => {
    const a = y[i]
    const b = (y[i + 1] - y[i]) / h[i] - h[i] * (2 * M[i] + M[i + 1]) / 6
    const c = M[i] / 2
    const d = (M[i + 1] - M[i]) / (6 * h[i])
    return { x0: x[i], x1: x[i + 1], a, b, c, d }
  })

  const polyFn = (xVal) => {
    if (xVal <= x[0]) {
      const s = segments[0]
      const dx = xVal - s.x0
      return s.a + s.b * dx + s.c * dx ** 2 + s.d * dx ** 3
    }
    if (xVal >= x[n - 1]) {
      const s = segments[m - 1]
      const dx = xVal - s.x0
      return s.a + s.b * dx + s.c * dx ** 2 + s.d * dx ** 3
    }
    const seg = segments.find((s) => xVal >= s.x0 && xVal <= s.x1)
    if (!seg) return NaN
    const dx = xVal - seg.x0
    return seg.a + seg.b * dx + seg.c * dx ** 2 + seg.d * dx ** 3
  }

  const table = segments.map((s, i) => ({
    tramo: `[${s.x0}, ${s.x1}]`,
    a: s.a, b: s.b, c: s.c, d: s.d,
  }))

  return {
    success: true,
    message: `${m} tramos cúbicos construidos con ${n} puntos.`,
    segments, polyFn, table,
    polynomial: `Spline cúbico natural con ${m} tramos`,
  }
}