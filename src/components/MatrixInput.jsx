import './MatrixInput.css'

export default function MatrixInput({ n, A, b, x0, onChangeA, onChangeB, onChangeX0 }) {
  return (
    <div className="matrix-input">
      <p className="matrix-input__label">Matriz A y vector b</p>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="matrix-input__row">
          {Array.from({ length: n }).map((_, j) => (
            <input
              key={j}
              type="number"
              step="any"
              className="matrix-input__cell"
              value={A[i]?.[j] ?? ''}
              placeholder={`a${i+1}${j+1}`}
              onChange={(e) => onChangeA(i, j, e.target.value)}
            />
          ))}
          <span className="matrix-input__sep">|</span>
          <input
            type="number"
            step="any"
            className="matrix-input__cell matrix-input__cell--b"
            value={b[i] ?? ''}
            placeholder={`b${i+1}`}
            onChange={(e) => onChangeB(i, e.target.value)}
          />
        </div>
      ))}

      <p className="matrix-input__label" style={{ marginTop: '1rem' }}>Vector inicial X0</p>
      <div className="matrix-input__row">
        {Array.from({ length: n }).map((_, i) => (
          <input
            key={i}
            type="number"
            step="any"
            className="matrix-input__cell"
            value={x0[i] ?? ''}
            placeholder={`x${i+1}`}
            onChange={(e) => onChangeX0(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  )
}