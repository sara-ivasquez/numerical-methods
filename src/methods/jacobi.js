export function jacobi({ A, b, x0, tol, maxIter, errorType }) {
  const n = A.length

  // Validaciones
  for (let i = 0; i < n; i++) {
    if (A[i][i] === 0)
      return { success: false, message: `Elemento diagonal cero en fila ${i + 1}. El método no puede continuar.`, table: [] }
  }

  const table = []
  let xPrev = [...x0]

  for (let i = 1; i <= maxIter; i++) {
    const xNew = new Array(n).fill(0)

    for (let j = 0; j < n; j++) {
      let sum = b[j]
      for (let k = 0; k < n; k++) {
        if (k !== j) sum -= A[j][k] * xPrev[k]
      }
      xNew[j] = sum / A[j][j]
    }

    // Error como norma infinito
    const errors = xNew.map((v, j) =>
      errorType === 'absolute'
        ? Math.abs(v - xPrev[j])
        : Math.abs((v - xPrev[j]) / (v === 0 ? 1e-14 : v))
    )
    const error = i === 1 ? Infinity : Math.max(...errors)

    const row = { iter: i, error: i === 1 ? '∞' : error }
    xNew.forEach((v, j) => { row[`x${j + 1}`] = v })
    table.push(row)

    if (i > 1 && error < tol)
      return {
        success: true,
        message: `Convergencia alcanzada con error ${error.toExponential(4)}`,
        solution: xNew, table,
      }

    xPrev = [...xNew]
  }

  return {
    success: false,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones.`,
    solution: xPrev, table,
  }
}