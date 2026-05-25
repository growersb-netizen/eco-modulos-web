interface FaqItem {
  q: string
  r: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>
            <span className="flex-1 pr-2">{item.q}</span>
            <span className="faq-icon" aria-hidden>+</span>
          </summary>
          <div className="faq-body">{item.r}</div>
        </details>
      ))}
    </div>
  )
}
