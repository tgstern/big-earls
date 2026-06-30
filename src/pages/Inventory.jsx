import { useState } from 'react'
import { vehicles } from '../data.js'

const types = ['All', 'Car', 'Truck', 'Motorcycle', 'Jet Ski', 'Misc']

export default function Inventory() {
  const [type, setType] = useState('All')
  const [approved, setApproved] = useState(false)
  const shown = type === 'All' ? vehicles : vehicles.filter((v) => v.type === type)

  function applyForFinancing() {
    if (approved) return
    setApproved(true)
    setTimeout(() => setApproved(false), 5000)

    pendo.track("financing_application_submitted", {
      vehicleTypeFilter: type,
      vehiclesShown: shown.length,
      totalVehicles: vehicles.length
    })
  }

  function handleFilterChange(e) {
    const newType = e.target.value
    const resultsCount = newType === 'All' ? vehicles.length : vehicles.filter((v) => v.type === newType).length
    setType(newType)

    pendo.track("inventory_filtered", {
      filterType: newType,
      resultsCount: resultsCount,
      totalVehicles: vehicles.length
    })
  }

  return (
    <section>
      <h1>Current Inventory</h1>
      <div className="toolbar">
        <label>
          Show me:
          <select id="filter-type" value={type} onChange={handleFilterChange}>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <span className="count">{shown.length} of {vehicles.length} fine pre-owned units</span>
      </div>
      <table id="inventory-table" className="panel">
        <thead>
          <tr><th>Type</th><th>Vehicle</th><th>Miles</th><th>Price</th><th>Earl says</th><th></th></tr>
        </thead>
        <tbody>
          {shown.map((v) => (
            <tr key={v.id} id={`row-${v.id}`}>
              <td>{v.type}</td>
              <td><strong>{v.year} {v.make} {v.model}</strong></td>
              <td>{v.miles ? v.miles.toLocaleString() : '—'}</td>
              <td>
                <s className="price-was">${v.was.toLocaleString()}</s>{' '}
                <span className="price-now">${v.price.toLocaleString()}</span>
              </td>
              <td className="note">"{v.note}"</td>
              <td>{v.badge && <span className="badge-chip">{v.badge}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="financing">
        <button
          id="btn-financing"
          className={approved ? 'approved' : 'blink'}
          onClick={applyForFinancing}
        >
          {approved ? 'APPROVED! READY FOR PURCHASE' : "APPLY FOR FINANCING — EVERYBODY'S APPROVED!"}
        </button>
      </div>
    </section>
  )
}
