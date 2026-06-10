import { recentSales, vehicles, weeklySales } from '../data.js'

function TrendChart() {
  const max = Math.max(...weeklySales.map((w) => w.units))
  const barW = 44
  const gap = 16
  const chartH = 130
  const top = 22
  const width = weeklySales.length * (barW + gap) + gap
  return (
    <svg id="sales-trend" viewBox={`0 0 ${width} ${top + chartH + 26}`} role="img" aria-label="Units sold per week">
      {weeklySales.map((w, i) => {
        const h = Math.round((w.units / max) * chartH)
        const x = gap + i * (barW + gap)
        const y = top + chartH - h
        return (
          <g key={w.week}>
            <rect x={x} y={y} width={barW} height={h} className="bar" />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" className="bar-count">{w.units}</text>
            <text x={x + barW / 2} y={top + chartH + 16} textAnchor="middle" className="bar-label">{w.week}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Dashboard({ currentUser }) {
  const featured = vehicles.filter((v) => v.badge).slice(0, 4)
  const thisMonth = new Date().toLocaleDateString('en-US', { month: 'short' })
  const monthWeeks = weeklySales.filter((w) => w.week.startsWith(thisMonth))
  const soldThisMonth = monthWeeks.reduce((sum, w) => sum + w.units, 0)
  const grossThisMonth = monthWeeks.reduce((sum, w) => sum + w.gross, 0)

  return (
    <section>
      <p className="howdy" id="greeting">
        Howdy, <strong>{currentUser.name}</strong>! Welcome back to the {currentUser.lot.name}.
      </p>

      <h1>Lot Dashboard</h1>
      <div className="cards">
        <div className="card" id="card-on-lot">
          <h2>Units on the lot</h2>
          <p className="metric">{vehicles.length}</p>
        </div>
        <div className="card" id="card-sold-month">
          <h2>Sold this month</h2>
          <p className="metric">{soldThisMonth}</p>
        </div>
        <div className="card" id="card-gross-month">
          <h2>Gross this month</h2>
          <p className="metric">{`$${grossThisMonth.toLocaleString()}`}</p>
        </div>
        <div className="card" id="card-lemon-days">
          <h2>Days since last lemon returned</h2>
          <p className="metric">3</p>
        </div>
      </div>

      <h1>Sales-O-Meter™</h1>
      <div className="panel chart-panel">
        <TrendChart />
        <p className="fine-print">Units moved per week. Upward squiggle = Earl happy.</p>
      </div>

      <h1>Fresh on the lot</h1>
      <div className="featured">
        {featured.map((v) => (
          <div className="vehicle-card" key={v.id} id={`featured-${v.id}`}>
            <span className="starburst">{v.badge}!</span>
            <h3>{v.year} {v.make} {v.model}</h3>
            <p className="vehicle-note">"{v.note}"</p>
            <p className="price">
              <s className="price-was">WAS ${v.was.toLocaleString()}</s>{' '}
              <span className="price-now">NOW ${v.price.toLocaleString()}!!</span>
            </p>
          </div>
        ))}
      </div>

      <h1>Just sold!</h1>
      <table id="recent-sales-table" className="panel">
        <thead>
          <tr><th>Vehicle</th><th>Price</th><th>Sold by</th><th>Date</th></tr>
        </thead>
        <tbody>
          {recentSales.map((s) => (
            <tr key={s.id}>
              <td><strong>{s.vehicle}</strong></td>
              <td>${s.price.toLocaleString()}</td>
              <td>{s.soldBy}</td>
              <td>{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
