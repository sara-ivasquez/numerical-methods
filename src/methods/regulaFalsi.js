import { evaluate } from 'mathjs'

export function regulaFalsi({ a, b, tol, maxIter, fx, errorType }) {
  const f = (x) => evaluate(fx, { x })

  const fa = f(a)
  const fb = f(b)

  if (isNaN(fa) || isNaN(fb))
    return { success: false, message: 'La función no es válida o tiene errores de sintaxis.' }

  if (fa * fb > 0)
    return { success: false, message: 'El intervalo es inadecuado: f(a) y f(b) deben tener signos opuestos.' }

  if (fa === 0) return { success: true, root: a, message: `${a} es raíz exacta.`, table: [] }
  if (fb === 0) return { success: true, root: b, message: `${b} es raíz exacta.`, table: [] }

  const table = []
  let lo = a, hi = b
  let flo = fa, fhi = fb
  let prevXr = null

  for (let i = 1; i <= maxIter; i++) {
    // Fórmula de Regula Falsi (interpolación lineal)
    const xr = hi - (fhi * (hi - lo)) / (fhi - flo)
    const fxr = f(xr)

    let error = i === 1 ? Infinity
      : errorType === 'absolute'
        ? Math.abs(xr - prevXr)
        : Math.abs((xr - prevXr) / xr)

    table.push({
      iter: i, a: lo, b: hi, xr, fxr,
      error: i === 1 ? '∞' : error,
    })

    if (fxr === 0)
      return { success: true, root: xr, message: `${xr} es raíz exacta.`, table }

    if (i > 1 && error < tol)
      return { success: true, root: xr, message: `Raíz aproximada: ${xr} con error ${error.toExponential(4)}`, table }

    if (flo * fxr < 0) { hi = xr; fhi = fxr }
    else { lo = xr; flo = fxr }

    prevXr = xr
  }

  const last = table[table.length - 1].xr
  return {
    success: false, root: last,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones. Última aproximación: ${last}`,
    table,
  }
}