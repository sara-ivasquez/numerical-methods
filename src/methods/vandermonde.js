export function vandermonde({ points }) {
  const n = points.length
  const x = points.map((p) => p.x)
  const y = points.map((p) => p.y)

  // Construir matriz de Vandermonde
  const V = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Math.pow(x[i], n - 1 - j))
  )

  // Eliminación gaussiana con pivoteo parcial
  const A = V.map((row, i) => [...row, y[i]])

  for (let col = 0; col < n; col++) {
    // Pivoteo parcial
    let maxRow = col
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(A[row][col]) > Math.abs(A[maxRow][col])) maxRow = row
    }
    ;[A[col], A[maxRow]] = [A[maxRow], A[col]]

    if (Math.abs(A[col][col]) < 1e-14)
      return { success: false, message: 'Puntos con x repetidos o matriz singular.', table: [] }

    for (let row = col + 1; row < n; row++) {
      const factor = A[row][col] / A[col][col]
      for (let k = col; k <= n; k++) {
        A[row][k] -= factor * A[col][k]
      }
    }
  }

  // Sustitución hacia atrás
  const coeffs = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    coeffs[i] = A[i][n]
    for (let j = i + 1; j < n; j++) {
      coeffs[i] -= A[i][j] * coeffs[j]
    }
    coeffs[i] /= A[i][i]
  }

  // Tabla de coeficientes
  const table = coeffs.map((c, i) => ({
    term: `a${i}`,
    power: n - 1 - i,
    coeff: c,
  }))

  // Función polinomial resultante
  const polyFn = (xVal) =>
    coeffs.reduce((sum, c, i) => sum + c * Math.pow(xVal, n - 1 - i), 0)

  return {
    success: true,
    message: `Polinomio de grado ${n - 1} encontrado con ${n} puntos.`,
    coeffs, polyFn, table,
    polynomial: buildPolyString(coeffs, n),
  }
}

function buildPolyString(coeffs, n) {
  return coeffs.map((c, i) => {
    const pow = n - 1 - i
    const val = c.toFixed(4)
    if (pow === 0) return `${val}`
    if (pow === 1) return `${val}x`
    return `${val}x^${pow}`
  }).join(' + ').replace(/\+ -/g, '- ')
}