import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bot } from 'lucide-react'

const STEPS = [
  { id: 'meet', lola: 'Lola is a 28-year-old designer in Paris. She has a companion AI that knows her routines, preferences, and goals.', companion: 'Knows she usually holidays around this time. Scanning for signals.' },
  { id: 'video', lola: 'She watches a surfing influencer\'s video from Lanzarote on her feed. Crystal-clear water, volcanic landscape, perfect waves. Something clicks.', companion: 'Negotiated with the social feed\'s agent to push content matching her context — travel-ready, adventure-seeking, budget available. The video wasn\'t random.' },
  { id: 'message', lola: '"Hey, have you seen Lanzarote? We should go!" She sends the video to her best friend Marie.', companion: 'Following her across surfaces — social, messaging, browser. Feeding context to other agents. Building a richer picture of intent.' },
  { id: 'agree', lola: 'After a few voice messages, the decision is made. Lanzarote. Two weeks from now.', companion: 'Starts building an itinerary. Stores destination + dates. Sends intent signals to airline, hotel, and activity agents — triggering a bidding process.' },
  { id: 'book', lola: 'Three flight options, two hotels — all matching her budget and dates. She picks in under a minute.', companion: 'Gathered options using agentic negotiable ad formats. Airlines and hotels bid based on her context + rules. The companion decides what gets surfaced.' },
  { id: 'booked', lola: 'One tap. Flights and hotel confirmed. A clean summary appears on her trip page.', companion: 'Handles payment. Informs airline, hotel, and activity agents to anticipate her arrival. Other agents now know she\'s Lanzarote-bound.' },
  { id: 'land', lola: 'She arrives. Her trip page already has recommendations — surf school, volcanic hike, seafood near the hotel.', companion: 'Pushes recommendations from the Lanzarote tourist office via partner agents. Handles reservations. Each option is contextual, not generic.' },
  { id: 'shop', lola: 'She needs a surf suit. Three options appear — different brands, styles, prices. Decathlon catches her eye.', companion: 'Interacts with retailers\' agents. Shows organic and sponsored products. Retrieves a virtual asset of the suit. Finds the best deal.' },
  { id: 'enjoy', lola: 'Surf lessons, local food, sunset hikes. The trip of a lifetime. Every recommendation felt natural.', companion: 'Continues optimizing. Learning from each interaction. The advertising was invisible — but it was everywhere.' },
]

function Step({ step, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLast = index === total - 1

  return (
    <div ref={ref} className="tl-step">
      <motion.div
        className="tl-lola"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="tl-lola__text">{step.lola}</p>
      </motion.div>

      <div className="tl-rail">
        <motion.div
          className={`tl-rail__dot ${isLast ? 'tl-rail__dot--accent' : ''}`}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        />
        {!isLast && <div className="tl-rail__line" />}
      </div>

      <motion.div
        className="tl-companion"
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <p className="tl-companion__text">{step.companion}</p>
      </motion.div>
    </div>
  )
}

export default function LolaStory() {
  return (
    <section className="story">
      <div className="story__header">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="story__header-cols">
            <div className="story__header-left">
              <h2 className="story__heading">Lola's Story</h2>
            </div>
            <div className="story__header-right">
              <p className="story__header-note">
                On the left, what Lola experiences.<br />
                On the right, what her companion agent does behind the scenes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="story__labels">
        <span className="story__col-label">Lola</span>
        <span />
        <span className="story__col-label story__col-label--right"><Bot size={11} style={{ marginRight: '0.4em', verticalAlign: '-1px' }} />Companion Agent</span>
      </div>

      <div className="story__timeline">
        {STEPS.map((step, i) => (
          <Step key={step.id} step={step} index={i} total={STEPS.length} />
        ))}
      </div>

      <div className="story__close">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="story__close-title">
            She never felt "advertised&nbsp;to."
          </h2>
          <p className="story__close-body">
            The advertising was invisible — but it powered the entire experience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
