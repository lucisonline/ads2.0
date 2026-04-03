import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Bot } from 'lucide-react'

/* ============================
   DATA
   ============================ */

const HERO_SLIDES = [
  {
    id: 'dreaming',
    title: 'Dreaming',
    lola: "Three months before summer vacation, Lola still doesn't know where to go on holiday.",
    companion: 'Knows she usually goes on vacation around this time. Scanning for signals.',
    gradient: 'linear-gradient(135deg, #3d1ef8 0%, #6b4cff 50%, #140a53 100%)',
  },
  {
    id: 'spark',
    title: 'The Spark',
    lola: "She is exposed to a personalized feed and watches a video of a surfing influencer in Lanzarote — one she'd seen before.",
    companion: "Follows her through her journey, no matter the surface. Feeds Lola's context to other agents (social, etc.).",
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #1e1b4b 100%)',
  },
  {
    id: 'sharing',
    title: 'Sharing Intent',
    lola: 'Lola sends a message to her best friend to talk about their upcoming vacation and suggests Lanzarote.',
    companion: 'Once they agree, starts building an itinerary for her.',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #4c1d95 100%)',
  },
  {
    id: 'signal',
    title: 'Signal to Market',
    lola: "Criteo's agent identifies a strong opportunity with influence and sends the information to brands and retailers.",
    companion: 'Adds info to his memory and sends this signal to other agents for bidding with her profile and context.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #7c2d12 100%)',
  },
  {
    id: 'influence',
    title: 'Personalized Influence',
    lola: "A booking agent dynamically generates an ad with an AI influencer in her personalized feed, talking about Lanzarote being the best offer — hotels tailored for Lola.",
    companion: 'Starts building instructions to gather all best options — flight tickets and hotels using Agentic negotiable ad formats.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #1e3a5f 100%)',
  },
  {
    id: 'bidding',
    title: 'Smart Bidding',
    lola: "Behind the scenes, agents start bidding and making choices with her personal context and rules to decide what she'll be exposed to.",
    companion: 'Surfaces key choices for her. Sells her on influence using her context + rules.',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3d1ef8 50%, #0f172a 100%)',
  },
  {
    id: 'approve',
    title: 'One Tap',
    lola: 'Lola consults the travel package in her companion app, built just for them, and approves the journey.',
    companion: 'Manages everything about payment. Informs other agents about her trip to anticipate other needs to book ahead.',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #134e4a 100%)',
  },
]

const MONTAGE_SLIDES = [
  {
    id: 'activities',
    title: 'Local Discovery',
    lola: 'Lanzarote Tourist Office wins the bidding and provides the best trip activities — vegetarian restaurants, surf camp, places to visit, rentals.',
    companion: 'Adds those recommendations within her trip page.',
  },
  {
    id: 'companion-chat',
    title: 'Companion Chat',
    lola: 'Lola takes time to talk with her Companion, sharing her journey and news.',
    companion: 'Pushes activity recommendations from Lanzarote Tourist Office during their exchange.',
  },
  {
    id: 'confirm',
    title: 'Lola Approves',
    lola: 'She loves the suggestions and approves locations, activities, and restaurants.',
    companion: 'Handles payment and reservation for everything.',
  },
  {
    id: 'surf-suit',
    title: 'The Surf Suit',
    lola: "Her Companion knows she's missing a surf suit. He finds the best one using her personal context — allergies, materials, past injuries.",
    companion: "Interacts with several retailers' agents. Displays organic and sponsored products.",
  },
  {
    id: 'virtual-try',
    title: 'Virtual Try-On',
    lola: 'He shows the surf suit directly on her virtual avatar.',
    companion: 'Retrieves the virtual asset (Virtual Asset ad format) and finds the best deal — Decathlon.',
  },
  {
    id: 'ready',
    title: 'Everything Ready',
    lola: 'Her Companion proactively builds a mini app with all options — hotels, rentals, flights, activities — everything centralized.',
    companion: 'Everything is ready for her trip!',
  },
]

const CLOSING_SLIDE = {
  id: 'arrival',
  title: '3 Months Later\u2026',
  lola: "Lola arrives in Lanzarote. She can't wait to start the surf camp and explore the island. She refers to the travel page built by her agent — all information centralized.",
  companion: 'Follows her trip, continuing to push the best recommendations along the way.',
  gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0e7490 100%)',
}

/* ============================
   FULLSCREEN JOURNEY
   ============================ */

function FullscreenSlide({ slide, index, rawIndex }) {
  const opacity = useTransform(rawIndex, (v) => {
    const dist = Math.abs(v - index)
    return dist > 1 ? 0 : 1 - dist
  })

  const y = useTransform(rawIndex, (v) => (v - index) * -60)

  return (
    <motion.div
      className="fs-slide"
      style={{ opacity, background: slide.gradient }}
    >
      <motion.div className="fs-slide__inner" style={{ y }}>
        <h3 className="fs-slide__title">{slide.title}</h3>
        <p className="fs-slide__lola">{slide.lola}</p>
        <div className="fs-slide__companion">
          <div className="fs-slide__companion-label">
            <Bot size={13} />
            <span>Companion Agent</span>
          </div>
          <p className="fs-slide__companion-text">{slide.companion}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProgressDot({ index, rawIndex }) {
  const opacity = useTransform(rawIndex, (v) =>
    Math.abs(v - index) < 0.5 ? 1 : 0.3
  )
  const scale = useTransform(rawIndex, (v) =>
    Math.abs(v - index) < 0.5 ? 1.5 : 1
  )

  return <motion.div className="fs-progress__dot" style={{ opacity, scale }} />
}

function FullscreenJourney() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const total = HERO_SLIDES.length
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  const counterText = useTransform(rawIndex, (v) => {
    const idx = Math.round(Math.min(Math.max(v, 0), total - 1))
    return `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
  })

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  return (
    <section
      ref={containerRef}
      className="fs-journey"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="fs-journey__pin">
        {/* Persistent header */}
        <div className="fs-journey__header">
          <span className="fs-journey__label">Lola&rsquo;s Story</span>
          <motion.span className="fs-journey__counter">
            {counterText}
          </motion.span>
        </div>

        {/* Slides */}
        {HERO_SLIDES.map((slide, i) => (
          <FullscreenSlide
            key={slide.id}
            slide={slide}
            index={i}
            rawIndex={rawIndex}
          />
        ))}

        {/* Progress dots */}
        <div className="fs-progress">
          {HERO_SLIDES.map((_, i) => (
            <ProgressDot key={i} index={i} rawIndex={rawIndex} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="fs-journey__scroll-hint"
          style={{ opacity: scrollHintOpacity }}
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================
   MONTAGE TIMELINE
   ============================ */

function MontageStep({ slide, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="montage__step"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <div className="montage__step-num">
        {String(index + 8).padStart(2, '0')}
      </div>
      <div className="montage__step-content">
        <h4 className="montage__step-title">{slide.title}</h4>
        <p className="montage__step-lola">{slide.lola}</p>
      </div>
      <div className="montage__step-companion">
        <p>{slide.companion}</p>
      </div>
    </motion.div>
  )
}

function MontageTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="montage" ref={ref}>
      <motion.div
        className="montage__inner"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="montage__header">
          <h3 className="montage__heading">The trip unfolds</h3>
          <p className="montage__sub">What happens next, at a glance.</p>
        </div>
        {MONTAGE_SLIDES.map((slide, i) => (
          <MontageStep key={slide.id} slide={slide} index={i} />
        ))}
      </motion.div>
    </section>
  )
}

/* ============================
   CLOSING SCENE
   ============================ */

function ClosingScene() {
  return (
    <>
      {/* Arrival — full screen */}
      <section
        className="fs-closing"
        style={{ background: CLOSING_SLIDE.gradient }}
      >
        <motion.div
          className="fs-closing__inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="fs-closing__title">{CLOSING_SLIDE.title}</h3>
          <p className="fs-closing__lola">{CLOSING_SLIDE.lola}</p>
          <div className="fs-closing__companion">
            <Bot size={14} />
            <span>{CLOSING_SLIDE.companion}</span>
          </div>
        </motion.div>
      </section>

      {/* End card */}
      <section className="fs-endcard">
        <motion.div
          className="fs-endcard__inner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="fs-endcard__title">
            She never felt &ldquo;advertised&nbsp;to.&rdquo;
          </h2>
          <p className="fs-endcard__body">
            The advertising was invisible — but it powered the entire
            experience.
          </p>
        </motion.div>
      </section>
    </>
  )
}

/* ============================
   MAIN EXPORT
   ============================ */

export default function LolaCarousel() {
  return (
    <>
      <FullscreenJourney />
      <MontageTimeline />
      <ClosingScene />
    </>
  )
}
