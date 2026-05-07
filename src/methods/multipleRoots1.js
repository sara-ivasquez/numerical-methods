import { evaluate, derivative, parse } from 'mathjs'

export function multipleRoots1({ x0, m, tol, maxIter, fx, errorType }) {
  let dfx, d2fx
  try {
    dfx  = derivative(parse(fx), 'x').toString()
    d2fx = derivative(parse(dfx), 'x').toString()
  } catch {
    return { success: false, message: 'No se pudo calcular la derivada. Verifica la función.', table: [] }
  }

  const f   = (x) => evaluate(fx,   { x })
  const df  = (x) => evaluate(dfx,  { x })

  const table = []
  let xn = x0

  for (let i = 1; i <= maxIter; i++) {
    const fxn  = f(xn)
    const dfxn = df(xn)

    if (Math.abs(dfxn) < 1e-14)
      return { success: false, message: `Derivada cero en x=${xn}. Cambia el valor inicial.`, table }

    // Fórmula con multiplicidad m conocida
    const xn1  = xn - m * (fxn / dfxn)
    const fxn1 = f(xn1)

    const error = i === 1 ? Infinity
      : errorType === 'absolute'
        ? Math.abs(xn1 - xn)
        : Math.abs((xn1 - xn) / xn1)

    table.push({
      iter: i, xn, fxn, dfxn, xn1,
      error: i === 1 ? '∞' : error,
    })

    if (Math.abs(fxn1) === 0)
      return { success: true, root: xn1, message: `${xn1} es raíz exacta.`, table }

    if (i > 1 && error < tol)
      return { success: true, root: xn1, message: `Raíz aproximada: ${xn1} con error ${error.toExponential(4)}`, table }

    if (!isFinite(xn1))
      return { success: false, message: 'El método diverge. Intenta con otro valor inicial.', table }

    xn = xn1
  }

  const last = table[table.length - 1].xn1
  return {
    success: false, root: last,
    message: `No se alcanzó la tolerancia en ${maxIter} iteraciones. Última aproximación: ${last}`,
    table,
  }
}