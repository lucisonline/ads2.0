import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const cards = [
  {
    title: 'Personalization At Scale',
    subtitle: 'Industry Report',
    year: '2025',
    variant: 'cream',
  },
  {
    title: 'MCP Protocol & Ad Delivery',
    subtitle: 'Technical Whitepaper',
    year: '2025',
    variant: 'purple',
  },
  {
    title: 'Agent-Based Shopping Behaviors',
    subtitle: 'Research Paper',
    year: '2025',
    variant: 'dark',
  },
  {
    title: 'The Future Of AI In Commerce',
    subtitle: 'Criteo AI Lab',
    year: '2025–2030',
    variant: 'cream',
  },
]

const links = [
  { label: 'Download The AI Commerce Whitepaper', href: '#' },
  { label: 'Download The Agent Protocol Specification', href: '#' },
  { label: 'Download The Personalization Report', href: '#' },
  { label: 'Download The Shopping Behavior Study', href: '#' },
]

/* Each card drops at a different rate — top cards move more */
const cardScrollOffsets = [180, 120, 60, 20]

function ScrollCard({ card, index, scrollYProgress }) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, cardScrollOffsets[index]]
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [
      [-6, -3, 1, 5][index],
      [-2, 0, 3, 8][index],
    ]
  )

  return (
    <motion.div
      className={`resources__card resources__card--${card.variant}`}
      style={{ y, rotate, zIndex: cards.length - index }}
    >
      <span className="resources__card-year">{card.year}</span>
      <h3 className="resources__card-title">{card.title}</h3>
      <span className="resources__card-subtitle">{card.subtitle}</span>
    </motion.div>
  )
}

export default function Resources() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section className="resources" ref={sectionRef}>
      <div className="resources__grid">
        <motion.div
          className="resources__text"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="resources__title">Resources</h2>
          <p className="resources__desc">
            Explore the research, data, and technical
            foundations behind the shift to agentic
            advertising — from protocol specifications
            to behavioral studies.
          </p>
          <a className="resources__cta" href="#">
            Watch the press release &nbsp;→
          </a>
        </motion.div>

        <motion.div
          className="resources__cards"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {cards.map((card, i) => (
            <ScrollCard
              key={i}
              card={card}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="resources__links"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {links.map((link, i) => (
          <a key={i} className="resources__link" href={link.href}>
            <span>{link.label}</span>
            <span className="resources__link-arrow">→</span>
          </a>
        ))}
        <p className="resources__disclaimer">
          This content is provided for strategic planning purposes.
          Sources and studies referenced are subject to update.
        </p>
      </motion.div>
    </section>
  )
}
