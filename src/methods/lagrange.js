export function lagrange({ points }) {
  const n = points.length
  const x = points.map((p) => p.x)
  const y = points.map((p) => p.y)

  // Calcular polinomios base de Lagrange
  const polyFn = (xVal) => {
    let result = 0
    for (let i = 0; i < n; i++) {
      let Li = 1
      for (let j = 0; j < n; j++) {
        if (j !== i) Li *= (xVal - x[j]) / (x[i] - x[j])
      }
      result += y[i] * Li
    }
    return result
  }

  // Tabla de coeficientes Li en los puntos dados
  const table = points.map((p, i) => {
    const row = { punto: `(${p.x}, ${p.y})` }
    for (let j = 0; j < n; j++) {
      let Li = 1
      for (let k = 0; k < n; k++) {
        if (k !== j) Li *= (p.x - x[k]) / (x[j] - x[k])
      }
      row[`L${j}`] = Li
    }
    row['P(x)'] = polyFn(p.x)
    return row
  })

  return {
    success: true,
    message: `Polinomio de Lagrange de grado ${n - 1} construido con ${n} puntos.`,
    polyFn, table,
    polynomial: `Σ yᵢ·Lᵢ(x) con ${n} puntos`,
  }
}