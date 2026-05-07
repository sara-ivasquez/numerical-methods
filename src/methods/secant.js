import { evaluate } from 'mathjs'

export function secant({ x0, x1, tol, maxIter, fx, errorType }) {
  const f = (x) => evaluate(fx, { x })

  try { f(x0); f(x1) } catch {
    return { success: false, message: 'Error al evaluar la función. Verifica la sintaxis.', table: [] }
  }

  const table = []
  let xa = x0
  let xb = x1

  for (let i = 1; i <= maxIter; i++) {
    const fxa = f(xa)
    const fxb = f(xb)

    if (Math.abs(fxb - fxa) < 1e-14)
      return { success: false, message: 'División por cero: f(x1)-f(x0) ≈ 0. Cambia los valores iniciales.', table }

    const xc = xb - fxb * (xb - xa) / (fxb - fxa)
    const fxc = f(xc)

    const error = i === 1 ? Infinity
      : errorType === 'absolute'
        ? Math.abs(xc - xb)
        : Math.abs((xc - xb) / xc)

    table.push({
      iter: i, xa, xb, xc, fxc,
      error: i === 1 ? '∞' : error,
    })

    if (Math.abs(fxc) === 0)
      return { success: true, root: xc, message: `${xc} es raíz exacta.`, table }

    if (i > 1 && error < tol)
      return { success: true, root: xc, message: `Raíz aproximada: ${xc} con error ${error.toExponential(4)}`, table }

    if (!isFinite(xc))
      return { success: false, message: 'El método diverge. Intenta con otros valores iniciales.', table }

    xa = xb
    xb = xc
  }

  const last = table[table.length - 1].xc
  return {
    success: false, root: last,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones. Última aproximación: ${last}`,
    table,
  }
}