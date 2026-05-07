import './PointsInput.css'

export default function PointsInput({ points, onChange, onAdd, onRemove }) {
  return (
    <div className="points-input">
      <p className="points-input__label">Puntos (x, y)</p>
      {points.map((p, i) => (
        <div key={i} className="points-input__row">
          <span className="points-input__idx">P{i + 1}</span>
          <input
            type="number" step="any"
            placeholder="x"
            value={p.x}
            onChange={(e) => onChange(i, 'x', e.target.value)}
          />
          <input
            type="number" step="any"
            placeholder="y"
            value={p.y}
            onChange={(e) => onChange(i, 'y', e.target.value)}
          />
          {points.length > 2 && (
            <button type="button" className="points-input__remove" onClick={() => onRemove(i)}>✕</button>
          )}
        </div>
      ))}
      <button type="button" className="points-input__add" onClick={onAdd}>+ Agregar punto</button>
    </div>
  )
}