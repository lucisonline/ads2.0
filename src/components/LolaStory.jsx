import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const STORY_STEPS = [
  {
    id: 'meet',
    lola: {
      title: 'Meet Lola',
      text: "It's 2030. Lola is a 28-year-old designer living in Paris. She has a companion AI that knows her routines, preferences, and goals — always working in the background to make her life easier.",
      emoji: '👋',
    },
    companion: {
      title: 'Background awareness',
      text: "Knows Lola usually holidays around this time of year. Already scanning for signals — waiting for the right moment to start planning.",
      icon: '🧠',
    },
  },
  {
    id: 'video',
    lola: {
      title: 'A spark of inspiration',
      text: "Scrolling through her feed, Lola watches a surfing influencer's video from Lanzarote. Crystal-clear water, volcanic landscapes, perfect waves. Something clicks.",
      emoji: '🏄‍♀️',
    },
    companion: {
      title: 'Feed negotiation',
      text: "Negotiated with the social feed's agent to surface content matching Lola's current context — travel-ready, adventure-seeking, budget available. The influencer video wasn't random.",
      icon: '🤝',
    },
  },
  {
    id: 'message',
    lola: {
      title: 'She messages her best friend',
      text: '"Hey, have you seen Lanzarote? We should go!" Lola sends the video to her best friend Marie. The excitement is mutual.',
      emoji: '💬',
    },
    companion: {
      title: 'Cross-surface tracking',
      text: "Following Lola across surfaces — social feed, messaging app, browser. Feeding her context to other agents in the ecosystem, building a richer picture of intent.",
      icon: '🔗',
    },
  },
  {
    id: 'agree',
    lola: {
      title: 'They agree on Lanzarote',
      text: 'After a few excited voice messages, the decision is made. Lanzarote it is. Two weeks from now. Lola starts daydreaming about the trip.',
      emoji: '✈️',
    },
    companion: {
      title: 'Itinerary building begins',
      text: "The moment they agree, starts building an itinerary. Stores destination + travel dates in memory. Sends intent signals to airline, hotel, and activity agents — triggering a bidding process.",
      icon: '📋',
    },
  },
  {
    id: 'book',
    lola: {
      title: 'She books flights and hotels',
      text: "Her companion surfaces three flight options and two hotels — all matching her budget, preferred airlines, and the dates she mentioned. She picks in under a minute.",
      emoji: '🏨',
    },
    companion: {
      title: 'Agentic ad formats at work',
      text: "Gathered best options using agentic negotiable ad formats. Airlines and hotels bid based on Lola's context + rules. The companion decided what gets surfaced — balancing her preferences with the best available deals.",
      icon: '💰',
    },
  },
  {
    id: 'payment',
    lola: {
      title: 'Booked!',
      text: 'One tap. Flights and hotel confirmed. Lola gets a clean summary in her trip page — dates, confirmation numbers, packing suggestions.',
      emoji: '✅',
    },
    companion: {
      title: 'Payment & signal cascade',
      text: "Handles payment through Lola's preferred method. Informs airline, hotel, and activity agents to anticipate her arrival. Other agents now know she's Lanzarote-bound.",
      icon: '📡',
    },
  },
  {
    id: 'land',
    lola: {
      title: 'She lands and explores',
      text: "Lola arrives in Lanzarote. Her trip page already has recommendations — a local surf school, a volcanic hike, a seafood spot near the hotel.",
      emoji: '🌴',
    },
    companion: {
      title: 'Local recommendations engine',
      text: "Pushes activity recommendations sourced from the Lanzarote tourist office via partner agents. Handles reservations for the surf school. Each recommendation is contextual — not generic ads, but curated options.",
      icon: '🗺️',
    },
  },
  {
    id: 'shop',
    lola: {
      title: 'Shopping for a surf suit',
      text: "Before her first lesson, Lola needs a surf suit. She asks her companion. Three options appear — different brands, styles, price points. One from Decathlon catches her eye.",
      emoji: '🛍️',
    },
    companion: {
      title: 'Retail agent interaction',
      text: "Interacts with retailers' agents, showing both organic and sponsored products. Retrieves a virtual asset of the surf suit (Virtual Asset ad format). Finds the best deal at Decathlon based on Lola's size, style, and budget.",
      icon: '🏷️',
    },
  },
  {
    id: 'enjoy',
    lola: {
      title: 'She enjoys her trip',
      text: "Surf lessons, local food, sunset hikes. Lola has the trip of a lifetime — and every recommendation felt natural, not forced. She never felt \"advertised to.\"",
      emoji: '🌅',
    },
    companion: {
      title: 'Continuous optimization',
      text: "Continues following her trip, pushing the best options at every moment. Learning from each interaction to make the next suggestion even better. The advertising was invisible — but it was everywhere.",
      icon: '♾️',
    },
  },
]

function StoryStep({ step, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="story-step" id={`step-${step.id}`}>
      <div className="story-step__number">
        <motion.span
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      <div className="story-step__content">
        <motion.div
          className="lola-card"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="lola-card__emoji">{step.lola.emoji}</div>
          <div className="lola-card__label">Lola</div>
          <h3 className="lola-card__title">{step.lola.title}</h3>
          <p className="lola-card__text">{step.lola.text}</p>
        </motion.div>

        <motion.div
          className="companion-card"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="companion-card__icon">{step.companion.icon}</div>
          <div className="companion-card__label">
            <span className="companion-pulse" />
            Companion Agent
          </div>
          <h4 className="companion-card__title">{step.companion.title}</h4>
          <p className="companion-card__text">{step.companion.text}</p>
        </motion.div>
      </div>

      {index < STORY_STEPS.length - 1 && (
        <motion.div
          className="story-step__connector"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      )}
    </div>
  )
}

export default function LolaStory() {
  return (
    <section className="lola-story" id="lola">
      <div className="lola-story__header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="label label--light">Lola's Story — 2030</span>
          <h2 className="lola-story__title">Two layers. One experience.</h2>
          <p className="lola-story__subtitle">
            Follow Lola's journey on the left. Watch what her AI companion does behind the scenes on the right.
          </p>
          <div className="lola-story__legend">
            <div className="legend-item">
              <div className="legend-dot legend-dot--lola" />
              <span>What Lola sees</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot legend-dot--companion" />
              <span>What her agent does</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="lola-story__timeline">
        {STORY_STEPS.map((step, i) => (
          <StoryStep key={step.id} step={step} index={i} />
        ))}
      </div>

      <div className="lola-story__footer">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="lola-story__footer-title">
            She never felt "advertised to."
          </h2>
          <p className="lola-story__footer-text">
            Every recommendation was contextual, timely, and useful. The advertising was invisible —
            but it powered the entire experience. This is Ads 2.0.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
