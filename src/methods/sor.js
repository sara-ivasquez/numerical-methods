export function sor({ A, b, x0, tol, maxIter, omega, errorType }) {
  const n = A.length

  for (let i = 0; i < n; i++) {
    if (A[i][i] === 0)
      return { success: false, message: `Elemento diagonal cero en fila ${i + 1}.`, table: [] }
  }

  if (omega <= 0 || omega >= 2)
    return { success: false, message: 'El factor ω debe estar en el intervalo (0, 2).', table: [] }

  const table = []
  let x = [...x0]

  for (let iter = 1; iter <= maxIter; iter++) {
    const xPrev = [...x]

    for (let j = 0; j < n; j++) {
      let sum = b[j]
      for (let k = 0; k < n; k++) {
        if (k !== j) sum -= A[j][k] * x[k]
      }
      const xGs = sum / A[j][j]
      // Aplica factor de relajación
      x[j] = (1 - omega) * x[j] + omega * xGs
    }

    const errors = x.map((v, j) =>
      errorType === 'absolute'
        ? Math.abs(v - xPrev[j])
        : Math.abs((v - xPrev[j]) / (v === 0 ? 1e-14 : v))
    )
    const error = iter === 1 ? Infinity : Math.max(...errors)

    const row = { iter, error: iter === 1 ? '∞' : error }
    x.forEach((v, j) => { row[`x${j + 1}`] = v })
    table.push(row)

    if (iter > 1 && error < tol)
      return {
        success: true,
        message: `Convergencia alcanzada con error ${error.toExponential(4)}`,
        solution: [...x], table,
      }
  }

  return {
    success: false,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones.`,
    solution: [...x], table,
  }
}