import { testimonials } from './data.js'

export default function Testimonials() {
  return (
    <aside id="testimonials" className="sidebar">
      <h2>What folks are sayin'</h2>
      {testimonials.map((t) => (
        <figure className="testimonial" key={t.id} id={`testimonial-${t.id}`}>
          <span className="stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</span>
          <blockquote>"{t.quote}"</blockquote>
          <figcaption>— {t.name}</figcaption>
        </figure>
      ))}
      <p className="fine-print">100% real reviews.* (*Mostly.)</p>
    </aside>
  )
}
