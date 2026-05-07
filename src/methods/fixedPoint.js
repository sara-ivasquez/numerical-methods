import { evaluate } from 'mathjs'

export function fixedPoint({ x0, tol, maxIter, fx, gx, errorType }) {
  const f = (x) => evaluate(fx, { x })
  const g = (x) => evaluate(gx, { x })

  // Validación
  try { f(x0); g(x0) } catch {
    return { success: false, message: 'Error al evaluar las funciones. Verifica la sintaxis.', table: [] }
  }

  const table = []
  let xn = x0

  for (let i = 1; i <= maxIter; i++) {
    let xn1
    try { xn1 = g(xn) } catch {
      return { success: false, message: `Error al evaluar g(x) en x=${xn}`, table }
    }

    const fxn1 = f(xn1)
    const error = i === 1 ? Infinity
      : errorType === 'absolute'
        ? Math.abs(xn1 - xn)
        : Math.abs((xn1 - xn) / xn1)

    table.push({
      iter: i, xn, xn1, fxn1,
      error: i === 1 ? '∞' : error,
    })

    if (Math.abs(fxn1) === 0)
      return { success: true, root: xn1, message: `${xn1} es raíz exacta.`, table }

    if (i > 1 && error < tol)
      return { success: true, root: xn1, message: `Raíz aproximada: ${xn1} con error ${error.toExponential(4)}`, table }

    if (!isFinite(xn1))
      return { success: false, message: 'El método diverge. Intenta con otra g(x) o valor inicial.', table }

    xn = xn1
  }

  const last = table[table.length - 1].xn1
  return {
    success: false, root: last,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones. Última aproximación: ${last}`,
    table,
  }
}