export function newtonInterpolation({ points }) {
  const n = points.length
  const x = points.map((p) => p.x)
  const y = points.map((p) => p.y)

  // Tabla de diferencias divididas
  const dd = Array.from({ length: n }, (_, i) => Array(n).fill(0))
  for (let i = 0; i < n; i++) dd[i][0] = y[i]

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      dd[i][j] = (dd[i + 1][j - 1] - dd[i][j - 1]) / (x[i + j] - x[i])
    }
  }

  // Coeficientes son la primera fila
  const coeffs = dd[0].slice(0, n)

  // Función polinomial resultante
  const polyFn = (xVal) => {
    let result = coeffs[0]
    let term   = 1
    for (let i = 1; i < n; i++) {
      term   *= (xVal - x[i - 1])
      result += coeffs[i] * term
    }
    return result
  }

  // Tabla de diferencias divididas para mostrar
  const table = Array.from({ length: n }, (_, i) => {
    const row = { punto: `(${x[i]}, ${y[i]})` }
    for (let j = 0; j < n - i; j++) {
      row[`d${j}`] = dd[i][j]
    }
    return row
  })

  return {
    success: true,
    message: `Polinomio de grado ${n - 1} construido con ${n} puntos.`,
    coeffs, polyFn, table,
    polynomial: buildPolyString(coeffs, x),
  }
}

function buildPolyString(coeffs, x) {
  let str = `${coeffs[0].toFixed(4)}`
  let term = ''
  for (let i = 1; i < coeffs.length; i++) {
    term += `(x - ${x[i - 1]})`
    str  += ` + ${coeffs[i].toFixed(4)}·${term}`
  }
  return str
}