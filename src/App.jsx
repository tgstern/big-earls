import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Inventory from './pages/Inventory.jsx'
import Testimonials from './Testimonials.jsx'
import { users } from './user.js'

export default function App() {
  const [userId, setUserId] = useState(users[0].id)
  const currentUser = users.find((u) => u.id === userId)
  const isCustomer = currentUser.kind === 'customer'

  useEffect(() => {
    pendo.identify({
      visitor: {
        id: currentUser.id,
        full_name: currentUser.name,
        role: currentUser.role,
        kind: currentUser.kind,
        lotId: currentUser.lot.id,
      },
      account: {
        id: currentUser.lot.id,
        name: currentUser.lot.name,
      },
    })
  }, [currentUser])

  return (
    <div className="app">
      <div className="marquee">
        <span>
          *** BAD CREDIT? NO CREDIT? NO PROBLEM!! *** ASK ABOUT OUR FAMOUS RUST-PROOFING UPSELL ***
          FREE HOT DOG WITH EVERY TEST DRIVE (SATURDAYS ONLY) *** ALL SALES FINAL!!! ***
          TRADE-INS WELCOME: CARS, BOATS, CHICKENS (CALL FIRST) *** WE'LL BEAT ANY PRICE YOU SAW IN A DREAM ***
          29 YEARS IN BUSINESS (NOT CONSECUTIVE) *** IF THE INFLATABLE TUBE MAN IS UP, WE'RE OPEN ***
          TEST DRIVES LIMITED TO 11 MINUTES *** NOW WITH 40% MORE GRAVEL PARKING ***
        </span>
      </div>
      <header className="topbar">
        <div className="logo">
          <span className="logo-big">BIG EARL'S</span>
          <span className="logo-small">DISCOUNT AUTO BARN</span>
        </div>
        <nav>
          {!isCustomer && <NavLink id="nav-dashboard" to="/" end>Dashboard</NavLink>}
          <NavLink id="nav-inventory" to="/inventory">Inventory</NavLink>
        </nav>
        <label className="user-switch">
          Logged in as
          <select id="user-select" value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name} — {u.role}</option>
            ))}
          </select>
          <span id="user-badge">{currentUser.role} · {currentUser.lot.name}</span>
        </label>
      </header>
      <main className={isCustomer ? 'with-sidebar' : undefined}>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={isCustomer ? <Navigate to="/inventory" replace /> : <Dashboard currentUser={currentUser} />}
            />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
        {isCustomer && <Testimonials />}
      </main>
      <footer>
        *All vehicles sold AS-IS. No refunds, exchanges, or warranties. Mileage approximate.
      </footer>
    </div>
  )
}
