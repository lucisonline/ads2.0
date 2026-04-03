import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function useReveal(margin = '-100px') {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin })
  return [ref, inView]
}

export function TitleScreen() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -80])

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero__content" style={{ opacity, y }}>
        <p className="hero__eyebrow">Design Strategy / Research</p>
        <h1 className="hero__title">Ads&nbsp;2.0</h1>
        <p className="hero__sub">
          How advertising changes when<br />
          AI agents become the customer.
        </p>
      </motion.div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}

export function TheThreat() {
  const [ref, inView] = useReveal()

  return (
    <section className="threat" ref={ref}>
      <div className="threat__inner">
        <motion.p
          className="threat__counter"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          01
        </motion.p>

        <motion.h2
          className="threat__headline"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          AI is an existential threat to advertising as we know&nbsp;it.
        </motion.h2>

        <div className="threat__columns">
          <motion.div
            className="threat__left"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              The ad industry was built on capturing human attention. But agents don't
              have attention — they have <em>instructions</em>.
            </p>
            <p>
              The consumer no longer scrolls, clicks, and compares.
              Their AI agent does it — filtering, negotiating, deciding at machine speed.
              The shopper journey has fragmented across agents, surfaces, and protocols.
            </p>
          </motion.div>
          <motion.div
            className="threat__right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <blockquote>
              There is no<br />single funnel<br />anymore.
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function TheSplit() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Both circles sit at center; x transform spreads / merges them
  const leftX = useTransform(scrollYProgress, [0.15, 0.45], [-220, -90])
  const rightX = useTransform(scrollYProgress, [0.15, 0.45], [220, 90])
  const centerOpacity = useTransform(scrollYProgress, [0.36, 0.46], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])

  return (
    <section className="split" ref={sectionRef}>
      <div className="split__sticky">
        <motion.div className="split__title" style={{ opacity: textOpacity }}>
          <p className="split__num">01</p>
          <h2 className="split__heading">Two types of companies are emerging.</h2>
        </motion.div>

        <div className="split__venn">
          {/* Left circle — Experience Providers */}
          <motion.div
            className="split__circle split__circle--left"
            style={{ x: leftX }}
          >
            <div className="split__circle-ring" />
            <p className="split__circle-label">Experience<br />Providers</p>
          </motion.div>

          {/* Right circle — Data Providers */}
          <motion.div
            className="split__circle split__circle--right"
            style={{ x: rightX }}
          >
            <div className="split__circle-ring" />
            <p className="split__circle-label">Data<br />Providers</p>
          </motion.div>

          {/* Center label — appears on overlap */}
          <motion.div
            className="split__center-label"
            style={{ opacity: centerOpacity }}
          >
            <span className="split__center-united">united by</span>
            <strong className="split__center-hyper">Hyperpersonalisation</strong>
          </motion.div>
        </div>

        {/* Descriptions below the Venn */}
        <motion.div className="split__descriptions" style={{ opacity: textOpacity }}>
          <p className="split__desc split__desc--left">
            Own the user relationship. Deliver personalised experiences through their own surfaces.
          </p>
          <p className="split__desc split__desc--right">
            Power the ecosystem. Provide context, preferences, and signals to agents and platforms.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function ProtocolAgnostic() {
  const [ref, inView] = useReveal()

  return (
    <section className="protocol" ref={ref}>
      <motion.div
        className="protocol__inner"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="protocol__num">02</p>
        <p className="protocol__text">
          <strong>MCP</strong> lets apps learn user workflows and shape purchases.
          New modular formats are needed to serve agents as a new customer segment.
          Protocols are app-agnostic — the companion could be anything.
        </p>
        <div className="protocol__chips">
          {['ChatGPT', 'Replika', 'Custom Agent', 'Companion App'].map((n) => (
            <span key={n} className="protocol__chip">{n}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export function CriteoPosition() {
  const [ref, inView] = useReveal()

  return (
    <section className="criteo" ref={ref}>
      <motion.div
        className="criteo__inner"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <p className="criteo__num">03</p>
        <h2 className="criteo__quote">
          To survive, Criteo needs to be embedded in the agentic layer — providing
          signals, formats, and bidding infrastructure that agents consume&nbsp;natively.
        </h2>
      </motion.div>
    </section>
  )
}

export function Transition() {
  const [ref, inView] = useReveal()

  return (
    <section className="trans" ref={ref}>
      <motion.div
        className="trans__inner"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="trans__title">
          Let's jump into<br />the&nbsp;future.
        </h2>
        <p className="trans__sub">Meet Lola. It's&nbsp;2030.</p>
      </motion.div>
    </section>
  )
}
