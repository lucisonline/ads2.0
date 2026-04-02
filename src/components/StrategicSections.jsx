import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function Section({ children, className = '', dark = true, id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      id={id}
      className={`section ${dark ? 'section--dark' : 'section--light'} ${className}`}
    >
      <motion.div
        className="section__inner"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

function Label({ children }) {
  return <span className="label">{children}</span>
}

export function TitleScreen() {
  return (
    <section className="section section--dark section--hero">
      <motion.div
        className="section__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Label>Design Strategy / Research</Label>
        </motion.div>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Ads 2.0
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          How advertising changes when AI agents become the customer.
        </motion.p>
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span>Scroll</span>
          <motion.div
            className="scroll-hint__line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export function TheThreat() {
  return (
    <Section id="threat">
      <Label>01 — The Threat</Label>
      <h2 className="section-title">
        AI is an existential threat<br />to advertising as we know it.
      </h2>
      <div className="card-grid">
        <div className="card">
          <div className="card__icon">🤖</div>
          <h3>Agents browse for users now</h3>
          <p>
            The consumer no longer scrolls, clicks, and compares. Their AI agent does it for them —
            filtering, negotiating, and deciding at machine speed.
          </p>
        </div>
        <div className="card">
          <div className="card__icon">🎯</div>
          <h3>Attention is obsolete</h3>
          <p>
            The ad industry was built on capturing human attention. Agents don't have attention — they have instructions.
          </p>
        </div>
        <div className="card">
          <div className="card__icon">🌐</div>
          <h3>The journey is everywhere</h3>
          <p>
            The shopper journey has fragmented across agents, surfaces, and protocols. There is no single funnel anymore.
          </p>
        </div>
      </div>
    </Section>
  )
}

export function TheSplit() {
  return (
    <Section id="split">
      <Label>02 — The Split</Label>
      <h2 className="section-title">
        Two types of companies are emerging.
      </h2>
      <div className="split-container">
        <motion.div
          className="split-card split-card--left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Experience Providers</h3>
          <p>Companies that own the user relationship and deliver personalised experiences through their own surfaces.</p>
        </motion.div>
        <div className="split-divider">
          <span>united by</span>
          <strong>Hyperpersonalisation</strong>
        </div>
        <motion.div
          className="split-card split-card--right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Data Providers</h3>
          <p>Companies that power the ecosystem by providing context, preferences, and signals to agents and platforms.</p>
        </motion.div>
      </div>
      <div className="section-note">
        <p>
          <strong>MCP</strong> (Model Context Protocol) lets apps learn user workflows and shape purchases.
          New modular ad formats are needed to serve agents as a new customer segment.
        </p>
      </div>
    </Section>
  )
}

export function ProtocolAgnostic() {
  return (
    <Section id="protocol">
      <Label>03 — Protocol Agnostic</Label>
      <h2 className="section-title">
        Protocols don't care about the app.
      </h2>
      <p className="section-body">
        The companion could be ChatGPT, Replika, a custom enterprise agent, or something that doesn't exist yet.
        The protocol layer is neutral — it routes context and intent regardless of which AI is on either end.
      </p>
      <div className="protocol-grid">
        {['ChatGPT', 'Replika', 'Custom Agent', 'Companion App'].map((name, i) => (
          <motion.div
            key={name}
            className="protocol-chip"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            {name}
          </motion.div>
        ))}
      </div>
      <p className="section-body" style={{ marginTop: '2rem' }}>
        For this demo, we use a <strong>companion app</strong> — an always-on AI that knows Lola's context and acts on her behalf.
      </p>
    </Section>
  )
}

export function CriteoPosition() {
  return (
    <Section id="criteo">
      <Label>04 — Criteo's Position</Label>
      <h2 className="section-title">
        To survive, Criteo needs to be there.<br />
        And adapt fast.
      </h2>
      <p className="section-body">
        The companies that thrive will be the ones embedded in the agentic layer —
        providing signals, formats, and bidding infrastructure that agents can consume natively.
        Criteo's commerce data and retail relationships become the foundation for agent-native advertising.
      </p>
    </Section>
  )
}

export function Transition() {
  return (
    <section className="section section--transition">
      <motion.div
        className="section__inner"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <p className="transition-pre">Now that we've set the stage...</p>
        <h2 className="transition-title">
          Let's jump into the future.
        </h2>
        <p className="transition-sub">Meet Lola. She lives in 2030.</p>
        <motion.div
          className="transition-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
