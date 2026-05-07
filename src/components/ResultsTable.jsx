import './ResultsTable.css'

const fmt = (v) =>
  typeof v === 'number'
    ? (Math.abs(v) < 1e-4 && v !== 0 ? v.toExponential(4) : Number(v.toFixed(8)))
    : v

export default function ResultsTable({ columns, rows, message, success }) {
  if (!rows || rows.length === 0) return null
  return (
    <div className="results-table-wrap">
      <div className={`results-banner ${success ? 'results-banner--ok' : 'results-banner--fail'}`}>
        {success ? '✓' : '✗'} {message}
      </div>
      <div className="results-table-scroll">
        <table className="results-table">
          <thead>
            <tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i === rows.length - 1 ? 'results-table__last' : ''}>
                {columns.map((c) => <td key={c.key}>{fmt(row[c.key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}