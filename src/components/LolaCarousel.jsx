import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Bot } from 'lucide-react'

// Photos
import lolaWindow from '../assets/story/photos/lola-window.jpg'
import surferBeach from '../assets/story/photos/surfer-beach.jpg'
import lolaPhone from '../assets/story/photos/lola-phone.jpg'
import surferSitting from '../assets/story/photos/surfer-sitting.jpeg'

// Icons
import iconCocktail from '../assets/story/icons/cocktail.png'
import iconRental from '../assets/story/icons/rental.png'
import iconPlaces from '../assets/story/icons/places.png'
import iconFood from '../assets/story/icons/food-bowl.png'

/* ============================
   SCREEN DATA
   ============================ */

const SCREENS = [
  { id: 'intro', type: 'intro', bg: '#0c0820' },
  { id: 'spark', type: 'spark', bg: '#1a0e08' },
  { id: 'messages', type: 'messages', bg: '#f5f5f0' },
  { id: 'agent-relay', type: 'agent-relay', bg: '#ffffff' },
  { id: 'booking-wins', type: 'booking-wins', bg: '#ffffff' },
  { id: 'travel-planning', type: 'travel-planning', bg: '#f8f7f4' },
  { id: 'local-discovery', type: 'local-discovery', bg: '#f5f0eb' },
  { id: 'surf-suit', type: 'surf-suit', bg: '#d4c5a9' },
  { id: 'arrival', type: 'arrival', bg: 'transparent' },
]

/* ============================
   CHAT MESSAGES COMPONENT
   ============================ */

const CHAT_MESSAGES = [
  { id: 1, text: 'Hey! What do you think about surfing in Lanzarote this summer? Looks amazing omgggg', sent: true, delay: 0 },
  { id: 2, text: 'OMGGG love it', sent: false, delay: 2 },
  { id: 3, text: "Let's go", sent: false, delay: 3.5 },
]

function TypingIndicator({ isVisible }) {
  return (
    <motion.div
      className="story-chat__bubble story-chat__bubble--received story-chat__typing"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <span className="story-chat__dot" />
      <span className="story-chat__dot" />
      <span className="story-chat__dot" />
    </motion.div>
  )
}

function ChatBubble({ message, isVisible }) {
  return (
    <motion.div
      className={`story-chat__bubble ${message.sent ? 'story-chat__bubble--sent' : 'story-chat__bubble--received'}`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {message.text}
    </motion.div>
  )
}

function ChatScreen() {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [cycle, setCycle] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (!inView) {
      setVisibleMessages([])
      setTyping(false)
      return
    }

    setVisibleMessages([])
    setTyping(false)
    const timeouts = []

    CHAT_MESSAGES.forEach((msg) => {
      if (!msg.sent) {
        // Show typing indicator before received messages
        const typingStart = setTimeout(() => {
          setTyping(true)
        }, (msg.delay - 1) * 1000)
        timeouts.push(typingStart)
      }

      const t = setTimeout(() => {
        if (!msg.sent) setTyping(false)
        setVisibleMessages((prev) => [...prev, msg.id])
      }, msg.delay * 1000)
      timeouts.push(t)
    })

    const resetTimeout = setTimeout(() => {
      setVisibleMessages([])
      setTyping(false)
      setCycle((c) => c + 1)
    }, 6000)
    timeouts.push(resetTimeout)

    return () => timeouts.forEach(clearTimeout)
  }, [inView, cycle])

  // Find the next received message that isn't visible yet
  const nextReceivedId = CHAT_MESSAGES.find(m => !m.sent && !visibleMessages.includes(m.id))?.id

  return (
    <div ref={ref} className="story-chat">
      <div className="story-chat__window">
        {CHAT_MESSAGES.map((msg) => {
          const isVisible = visibleMessages.includes(msg.id)
          // Show typing in place of the next received message about to appear
          if (!msg.sent && !isVisible && typing && msg.id === nextReceivedId) {
            return <TypingIndicator key={`typing-${msg.id}-${cycle}`} isVisible />
          }
          return (
            <ChatBubble
              key={`${msg.id}-${cycle}`}
              message={msg}
              isVisible={isVisible}
            />
          )
        })}
      </div>
    </div>
  )
}

/* ============================
   VALIDATE CTA COMPONENT
   ============================ */

function ValidateCTA() {
  const [validated, setValidated] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (!inView) {
      setValidated(false)
      return
    }
    const t = setTimeout(() => setValidated(true), 3000)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <div ref={ref} className="story-validate">
      <motion.button
        className={`story-validate__btn ${validated ? 'story-validate__btn--done' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={validated ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {validated ? '\u2713 Validated' : 'Validate CTA'}
      </motion.button>
      <p className="story-validate__note">
        afficher quelques secondes apr&egrave;s,<br />
        et ajouter une animation qu&rsquo;on clic a &eacute;t&eacute; fait et que c&rsquo;est valid&eacute;
      </p>
    </div>
  )
}

/* ============================
   BRAND LOGOS (images — swap files in src/assets/story/logos/)
   ============================ */

import logoGetYourGuide from '../assets/story/logos/getyourguide.svg'
import logoExpedia from '../assets/story/logos/expedia.svg'
import logoBooking from '../assets/story/logos/booking.svg'
import logoAirbnb from '../assets/story/logos/airbnb.svg'
import logoCriteo from '../assets/story/logos/criteo.svg'
import logoKayak from '../assets/story/logos/kayak.svg'

// Each logo is positioned around the central text block via CSS (top/left %).
// parallaxY = vertical float range in px, floatDuration = bobbing speed in seconds.
const BRANDS = [
  { name: 'GetYourGuide', logo: logoGetYourGuide, pos: 'pos-tl', parallaxY: [-14, 14], floatDuration: 5.5 },
  { name: 'Expedia',      logo: logoExpedia,      pos: 'pos-tc', parallaxY: [-10, 10], floatDuration: 6.0 },
  { name: 'Booking.com',  logo: logoBooking,      pos: 'pos-tr', parallaxY: [-16, 16], floatDuration: 5.0 },
  { name: 'airbnb',       logo: logoAirbnb,       pos: 'pos-bl', parallaxY: [-12, 12], floatDuration: 6.5 },
  { name: 'CRITEO',       logo: logoCriteo,       pos: 'pos-bc', parallaxY: [-8, 8],   floatDuration: 5.8 },
  { name: 'KAYAK',        logo: logoKayak,        pos: 'pos-br', parallaxY: [-15, 15], floatDuration: 5.2 },
]

/* ============================
   INDIVIDUAL SCREEN RENDERERS
   ============================ */

function ScreenIntro() {
  return (
    <div className="story-screen__layout story-screen__layout--intro">
      <div className="story-intro__photo">
        <img src={lolaWindow} alt="Lola looking out the window" />
      </div>
      <div className="story-intro__content">
        <motion.p
          className="story-intro__label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          Meet Lola
        </motion.p>
        <motion.p
          className="story-intro__year"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          it&rsquo;s 2030.
        </motion.p>
        <motion.p
          className="story-intro__text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Three months before summer vacation, Lola still doesn&rsquo;t know where to go on holiday.
        </motion.p>
      </div>
    </div>
  )
}

function ScreenSpark() {
  return (
    <div className="story-screen__layout story-screen__layout--spark">
      <div className="story-spark__content">
        <motion.h3
          className="story-spark__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          She is exposed to a personalized feed and watches a video of a surfing influencer in Lanzarote.
        </motion.h3>
        <motion.p
          className="story-spark__companion"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Bot size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          Her companion follows her through her journey, no matter the surface. Feeds Lola&rsquo;s context to other agents.
        </motion.p>
      </div>
      <div className="story-spark__images">
        <motion.div
          className="story-spark__img"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <img src={surferBeach} alt="Surfer on beach in Lanzarote" />
        </motion.div>
        <motion.div
          className="story-spark__img story-spark__img--offset"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <img src={surferSitting} alt="Surfer sitting on beach" />
        </motion.div>
      </div>
    </div>
  )
}

function ScreenMessages() {
  return (
    <div className="story-screen__layout story-screen__layout--messages">
      <ChatScreen />
    </div>
  )
}

function BrandLogo({ brand, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], brand.parallaxY)
  const smoothY = useSpring(y, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      ref={ref}
      className={`story-relay__logo story-relay__logo--${brand.pos}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
    >
      <motion.img
        src={brand.logo}
        alt={brand.name}
        className="story-relay__logo-img"
        style={{ y: smoothY }}
        animate={{ y: [0, -6, 0, 6, 0] }}
        transition={{
          y: { duration: brand.floatDuration, repeat: Infinity, ease: 'easeInOut' },
        }}
        draggable={false}
      />
    </motion.div>
  )
}

function ScreenAgentRelay() {
  return (
    <div className="story-screen__layout story-screen__layout--relay">
      <motion.h3
        className="story-relay__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Her personal agent relays informations to other agents.
      </motion.h3>
      <motion.p
        className="story-relay__sub"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Behind the scenes, agents start bidding and making choices with her personal context and rules to decide what she&rsquo;ll be exposed to.
      </motion.p>
    </div>
  )
}

// Rendered outside story-screen__inner, directly in the 100vh section
function AgentRelayLogos() {
  return (
    <>
      {BRANDS.map((brand, i) => (
        <BrandLogo key={brand.name} brand={brand} index={i} />
      ))}
    </>
  )
}

function ScreenBookingWins() {
  return (
    <div className="story-screen__layout story-screen__layout--booking">
      <motion.div
        className="story-booking__visual"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
      >
        <div className="story-booking__brand">
          <span className="story-booking__brand-name">Booking<span className="story-booking__brand-dot">.com</span></span>
        </div>
        <div className="story-booking__image">
          <img src={surferBeach} alt="Lanzarote beach - personalized ad" />
        </div>
      </motion.div>
      <motion.div
        className="story-booking__content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <p className="story-booking__text">
          <strong>Booking.com wins the bid</strong> and dynamically &amp; generates an AI influencer in her personalized feed, talking about hotels tailored for Lola in Lanzarote
        </p>
      </motion.div>
    </div>
  )
}

function ScreenTravelPlanning() {
  return (
    <div className="story-screen__layout story-screen__layout--travel">
      <motion.div
        className="story-travel__content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
      >
        <p className="story-travel__text">
          When she opens the app the agent has built her itinerary.
        </p>
        <p className="story-travel__text story-travel__text--sub">
          Lola consults the travel package in her companion app, built just for them, and approves the journey.
        </p>
        <p className="story-travel__text story-travel__text--companion">
          <Bot size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          In the background the companion Manages everything about payment. Informs other agents about her trip to anticipate other needs to book ahead.
        </p>
      </motion.div>
      <div className="story-travel__app">
        <motion.div
          className="story-travel__app-window"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="story-travel__app-header">Personal website travel planning</div>
          <div className="story-travel__app-body">
            <div className="story-travel__app-placeholder" />
          </div>
          <ValidateCTA />
        </motion.div>
      </div>
    </div>
  )
}

function ScreenLocalDiscovery() {
  const discoveryItems = [
    { src: iconRental, alt: 'Beach & rentals', label: 'Rentals', className: 'story-discovery__item--surf' },
    { src: iconPlaces, alt: 'Market & shops', label: 'Shop', className: 'story-discovery__item--places' },
    { src: iconFood, alt: 'Vegetarian food', label: 'Restaurants', className: 'story-discovery__item--food' },
    { src: iconCocktail, alt: 'Cocktails & bars', label: 'Bars', className: 'story-discovery__item--cocktail' },
  ]

  return (
    <div className="story-screen__layout story-screen__layout--discovery">
      <div className="story-discovery__narrative">
        <motion.h3
          className="story-discovery__title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          In parallel Lanzarote Tourist Office wins the bidding and provides the best trip activities.
        </motion.h3>
      </div>

      <div className="story-discovery__scatter">
        {discoveryItems.map((item, i) => (
          <motion.div
            key={item.label}
            className={`story-discovery__item ${item.className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
          >
            <div className="story-discovery__item-img">
              <img src={item.src} alt={item.alt} />
            </div>
            <span className="story-discovery__item-label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ScreenSurfSuit() {
  return (
    <div className="story-screen__layout story-screen__layout--suit">
      <motion.div
        className="story-suit__content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
      >
        <p className="story-suit__text">
          Her Companion knows she&rsquo;s missing a surf suit. He finds the best one using her personal context and preferences &mdash; allergies, materials, past injuries.
        </p>
        <p className="story-suit__text story-suit__text--sub">
          He shows the surf suit directly on her virtual avatar. Retrieves the virtual asset (Virtual Asset ad format) and finds the best deal &mdash; Decathlon.
        </p>
      </motion.div>
      <motion.div
        className="story-suit__visual"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="story-suit__avatar">
          <img src={lolaPhone} alt="Lola virtual avatar" />
        </div>
        <div className="story-suit__brand">
          <span className="story-suit__brand-logo">DECATHLON</span>
          <p className="story-suit__brand-note">AI avatar with the suit</p>
        </div>
      </motion.div>
    </div>
  )
}

function ScreenArrival() {
  return (
    <div className="story-screen__layout story-screen__layout--arrival">
      <div className="story-arrival__content">
        <motion.h3
          className="story-arrival__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          She arrives in Lanzarote.<br />
          She can&rsquo;t wait to start the surf camp and explore the island.
        </motion.h3>
      </div>
    </div>
  )
}

const SCREEN_RENDERERS = {
  'intro': ScreenIntro,
  'spark': ScreenSpark,
  'messages': ScreenMessages,
  'agent-relay': ScreenAgentRelay,
  'booking-wins': ScreenBookingWins,
  'travel-planning': ScreenTravelPlanning,
  'local-discovery': ScreenLocalDiscovery,
  'surf-suit': ScreenSurfSuit,
  'arrival': ScreenArrival,
}

/* ============================
   FULLSCREEN SCREEN WRAPPER
   ============================ */

function StoryScreen({ screen, index, total }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const smoothY = useSpring(y, { stiffness: 200, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1.02, 1, 1, 0.98])

  const Renderer = SCREEN_RENDERERS[screen.type]
  const isDark = ['intro', 'spark', 'arrival'].includes(screen.type)
  const isArrival = screen.type === 'arrival'

  return (
    <motion.section
      ref={ref}
      className={`story-screen ${isDark ? 'story-screen--dark' : 'story-screen--light'} ${isArrival ? 'story-screen--arrival' : ''}`}
      style={isArrival
        ? { backgroundImage: `url(${surferBeach})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { background: screen.bg }
      }
      data-lenis-snap
    >
      {/* Floating logos — rendered at section level (100vh) for correct absolute positioning */}
      {screen.type === 'agent-relay' && <AgentRelayLogos />}

      <motion.div
        className="story-screen__inner"
        style={isArrival ? { opacity } : { y: smoothY, opacity, scale }}
      >
        {Renderer && <Renderer />}
      </motion.div>

      <div className="story-screen__num">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </motion.section>
  )
}

/* ============================
   END CARD
   ============================ */

function EndCard() {
  return (
    <section className="fs-endcard" data-lenis-snap>
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
          The advertising was invisible &mdash; but it powered the entire experience.
        </p>
      </motion.div>
    </section>
  )
}

/* ============================
   MAIN EXPORT
   ============================ */

export default function LolaCarousel() {
  return (
    <>
      {SCREENS.map((screen, i) => (
        <StoryScreen
          key={screen.id}
          screen={screen}
          index={i}
          total={SCREENS.length}
        />
      ))}

      <EndCard />
    </>
  )
}
