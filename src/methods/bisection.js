import { evaluate } from 'mathjs'

export function bisection({ a, b, tol, maxIter, fx, errorType }) {
  const f = (x) => evaluate(fx, { x })

  const fa = f(a)
  const fb = f(b)

  if (isNaN(fa) || isNaN(fb))
    return { success: false, message: 'La función no es válida o tiene errores de sintaxis.' }

  if (fa * fb > 0)
    return { success: false, message: 'El intervalo es inadecuado: f(a) y f(b) deben tener signos opuestos.' }

  if (fa === 0) return { success: true, root: a, message: `${a} es raíz exacta (extremo inferior).`, table: [] }
  if (fb === 0) return { success: true, root: b, message: `${b} es raíz exacta (extremo superior).`, table: [] }

  const table = []
  let lo = a, hi = b
  let flo = fa
  let prevXm = null

  for (let i = 1; i <= maxIter; i++) {
    const xm = (lo + hi) / 2
    const fxm = f(xm)

    let error = i === 1 ? Infinity
      : errorType === 'absolute'
        ? Math.abs(xm - prevXm)
        : Math.abs((xm - prevXm) / xm)

    table.push({
      iter: i, a: lo, b: hi, xm, fxm,
      error: i === 1 ? '∞' : error,
    })

    if (fxm === 0)
      return { success: true, root: xm, message: `${xm} es raíz exacta.`, table }

    if (i > 1 && error < tol)
      return { success: true, root: xm, message: `Raíz aproximada: ${xm} con error ${error.toExponential(4)}`, table }

    if (flo * fxm < 0) { hi = xm }
    else { lo = xm; flo = fxm }

    prevXm = xm
  }

  const lastXm = table[table.length - 1].xm
  return {
    success: false, root: lastXm,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones. Última aproximación: ${lastXm}`,
    table,
  }
}