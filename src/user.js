// Fake personas for the "Logged in as" dropdown — stands in for real auth.
// `kind` gates what each persona sees: internal staff get the sales
// dashboard, customers only get inventory + testimonials.
export const users = [
  { id: 'earl', name: 'Big Earl', role: 'Owner', kind: 'internal', lot: { id: 'lot-main', name: 'Main Lot' } },
  { id: 'darlene', name: 'Darlene Price', role: 'Sales Manager', kind: 'internal', lot: { id: 'lot-main', name: 'Main Lot' } },
  { id: 'chuck', name: 'Chuck Biggs', role: 'Salesman', kind: 'internal', lot: { id: 'lot-annex', name: 'Westside Annex' } },
  { id: 'rita', name: 'Rita Ledger', role: 'Finance', kind: 'internal', lot: { id: 'lot-main', name: 'Main Lot' } },
  { id: 'visitor', name: 'Walk-In Customer', role: 'Potential Customer', kind: 'customer', lot: { id: 'public', name: 'Open Lot' } },
]
