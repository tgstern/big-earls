// Sales figures are fixed, but their dates are derived from "today" at load
// time so the lot always looks freshly busy.
function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toLocaleDateString('en-CA') // YYYY-MM-DD
}

function weekLabel(weeksBack) {
  const d = new Date()
  d.setDate(d.getDate() - weeksBack * 7)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const vehicles = [
  { id: 'v-001', type: 'Car', year: 2009, make: 'Pontiac', model: 'G6', miles: 188402, price: 3995, was: 5495, note: 'New air freshener', badge: 'HOT DEAL' },
  { id: 'v-002', type: 'Truck', year: 2003, make: 'Ford', model: 'F-150 XL', miles: 241173, price: 6995, was: 8995, note: 'Tailgate from a different truck', badge: 'WORK READY' },
  { id: 'v-003', type: 'Motorcycle', year: 2012, make: 'Suzuki', model: 'Boulevard', miles: 33210, price: 4250, was: 4995, note: 'Louder than it needs to be', badge: '' },
  { id: 'v-004', type: 'Jet Ski', year: 2007, make: 'Sea-Doo', model: 'GTI 130', miles: 0, price: 3499, was: 4999, note: 'Trailer included*', badge: 'SUMMER SPECIAL' },
  { id: 'v-005', type: 'Car', year: 2014, make: 'Chrysler', model: '200', miles: 132890, price: 5995, was: 7495, note: 'One owner (a rental fleet)', badge: '' },
  { id: 'v-006', type: 'Misc', year: 1999, make: 'E-Z-GO', model: 'Golf Cart', miles: 0, price: 1850, was: 2400, note: 'Top speed: brisk walk', badge: 'CASH ONLY' },
  { id: 'v-007', type: 'Truck', year: 2008, make: 'Chevrolet', model: 'Silverado 1500', miles: 198554, price: 7995, was: 9995, note: 'Bed liner hides a lot', badge: '' },
  { id: 'v-008', type: 'Car', year: 2006, make: 'Honda', model: 'Civic', miles: 221340, price: 4495, was: 5995, note: 'Runs great, looks okay', badge: 'GAS SAVER' },
  { id: 'v-009', type: 'Motorcycle', year: 1998, make: 'Honda', model: 'Shadow', miles: 41877, price: 2995, was: 3495, note: 'Some chrome is stickers', badge: '' },
  { id: 'v-010', type: 'Misc', year: 1994, make: 'Grumman', model: 'Step Van (ex–ice cream)', miles: 167002, price: 8500, was: 12000, note: 'Jingle plays at random', badge: 'ONE OF A KIND' },
  { id: 'v-011', type: 'Jet Ski', year: 2015, make: 'Yamaha', model: 'WaveRunner VX', miles: 0, price: 5995, was: 6995, note: 'Winterized, probably', badge: '' },
  { id: 'v-012', type: 'Misc', year: 2001, make: 'John Deere', model: 'Riding Mower', miles: 0, price: 1200, was: 1500, note: 'Cuts grass and corners', badge: 'AS-IS' },
]

// Units moved per week, most recent week last; labels roll with the calendar.
const unitsByWeek = [4, 6, 3, 7, 5, 9, 6, 8]
const grossByWeek = [21500, 31200, 14800, 40100, 22900, 51300, 33400, 45650]
export const weeklySales = unitsByWeek.map((units, i) => ({
  week: weekLabel(unitsByWeek.length - 1 - i),
  units,
  gross: grossByWeek[i],
}))

export const recentSales = [
  { id: 's-101', vehicle: '2010 Dodge Charger', price: 7995, soldBy: 'Chuck Biggs', date: daysAgo(1) },
  { id: 's-102', vehicle: '2005 Toyota Camry', price: 4495, soldBy: 'Darlene Price', date: daysAgo(2) },
  { id: 's-103', vehicle: '2011 Kawasaki Ninja 650', price: 4995, soldBy: 'Chuck Biggs', date: daysAgo(3) },
  { id: 's-104', vehicle: '2002 Coleman Pop-Up Camper', price: 2250, soldBy: 'Big Earl himself', date: daysAgo(5) },
  { id: 's-105', vehicle: '2013 Ford Escape', price: 6595, soldBy: 'Rita Ledger', date: daysAgo(6) },
]

export const testimonials = [
  { id: 't-1', quote: 'Earl personally guaranteed it would start most mornings. And it does!', name: 'Randy P.', stars: 5 },
  { id: 't-2', quote: 'The mower runs better than my last car.', name: 'Denise H.', stars: 4 },
  { id: 't-3', quote: 'Bought a jet ski in February. No regrets yet.', name: 'Tammy W.', stars: 5 },
  { id: 't-4', quote: 'Five stars because there was no six star option.', name: "Dale (Earl's cousin)", stars: 5 },
  { id: 't-5', quote: 'The hot dog was cold but the deal was hot.', name: 'Walt F.', stars: 3 },
]
