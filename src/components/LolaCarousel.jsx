import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Bot } from 'lucide-react'

// Photos
import lolaWindow from '../assets/story/photos/lola-window.jpg'
import surferBeach from '../assets/story/photos/surfer-beach.jpg'
import lolaPhone from '../assets/story/photos/lola-phone.jpg'
import lolaSurfsuit from '../assets/story/photos/lola-surfsuit.jpg'
import surferSitting from '../assets/story/photos/surfer-sitting.jpeg'

// Videos
import videoSurf from '../assets/story/videos/video-surf.gif'
import hotelTour from '../assets/story/videos/hotel-tour.gif'

// Icons
import iconCocktail from '../assets/story/icons/cocktail.png'
import iconRental from '../assets/story/icons/rental.png'
import iconPlaces from '../assets/story/icons/places.png'
import iconFood from '../assets/story/icons/food-bowl.png'

/* ============================
   SCREEN DATA
   ============================ */

const SCREENS = [
  { id: 'intro', type: 'intro', bg: '#000000' },
  { id: 'spark', type: 'spark', bg: '#0d1f33' },
  { id: 'messages', type: 'messages', bg: '#f5f5f0' },
  { id: 'agent-relay', type: 'agent-relay', bg: '#f0ebe3' },
  { id: 'booking-wins', type: 'booking-wins', bg: '#ffffff' },
  { id: 'travel-planning', type: 'travel-planning', bg: '#f8f7f4' },
  { id: 'local-discovery', type: 'local-discovery', bg: '#f5f0eb' },
  { id: 'surf-suit', type: 'surf-suit', bg: '#1a1545' },
]

/* ============================
   CHAT MESSAGES COMPONENT
   ============================ */

const CHAT_MESSAGES = [
  { id: 1, text: 'Hey! What do you think about surfing in Lanzarote this summer? Looks amazing omgggg', sent: true, delay: 0 },
  { id: 2, text: 'OMGGG love it', sent: false, delay: 2 },
  { id: 3, text: "Let's go 🏄‍♀️🌴☀️", sent: false, delay: 3.5 },
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
   VALIDATE OVERLAY COMPONENT (looping click animation)
   ============================ */

function ValidateOverlay() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [phase, setPhase] = useState('idle') // idle → press → validated → fade → idle
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!inView) {
      setPhase('idle')
      return
    }

    const timers = []

    // 1. Show cursor approaching (idle state lasts 1.5s)
    setPhase('idle')

    // 2. Press the button
    timers.push(setTimeout(() => setPhase('press'), 1800))

    // 3. Button validates
    timers.push(setTimeout(() => setPhase('validated'), 2100))

    // 4. Hold validated state
    timers.push(setTimeout(() => setPhase('fade'), 4600))

    // 5. Reset and loop
    timers.push(setTimeout(() => {
      setPhase('idle')
      setCycle((c) => c + 1)
    }, 5600))

    return () => timers.forEach(clearTimeout)
  }, [inView, cycle])

  const isValidated = phase === 'validated' || phase === 'fade'
  const isFading = phase === 'fade'

  return (
    <div ref={ref} className="story-validate-overlay">
      <motion.div
        className="story-validate-overlay__card"
        animate={{
          opacity: isFading ? 0 : 1,
        }}
        transition={{
          opacity: { duration: isFading ? 0.9 : 0.4, ease: 'easeInOut' },
        }}
      >
        <motion.div
          className={`story-validate-overlay__btn ${isValidated ? 'story-validate-overlay__btn--done' : ''}`}
          animate={{
            scale: phase === 'press' ? 0.9 : phase === 'validated' ? [1, 1.08, 1] : 1,
          }}
          transition={
            phase === 'press'
              ? { type: 'spring', stiffness: 500, damping: 15 }
              : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
          }
        >
          <span className="story-validate-overlay__check">
            {isValidated ? '✓' : ''}
          </span>
          {isValidated ? 'Journey Approved' : 'Approve Journey'}
        </motion.div>

        {/* Animated cursor */}
        <motion.div
          className="story-validate-overlay__cursor"
          animate={{
            opacity: phase === 'idle' || phase === 'press' ? 1 : 0,
            x: phase === 'idle' ? [24, 0] : 0,
            y: phase === 'idle' ? [18, 0] : 0,
            scale: phase === 'press' ? 0.8 : 1,
          }}
          transition={{
            opacity: { duration: 0.25 },
            x: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
            y: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
            scale: { duration: 0.12, ease: 'easeIn' },
          }}
        >
          <svg width="20" height="24" viewBox="0 0 18 22" fill="none">
            <path d="M1 1L1 15.5L5.5 11.5L9.5 19.5L12.5 18L8.5 10H14.5L1 1Z" fill="white" stroke="#333" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ============================
   MINI TRAVEL WEBSITE COMPONENT
   ============================ */

function MiniTravelWebsite() {
  return (
    <div className="mini-travel">
      {/* Header */}
      <div className="mini-travel__header">
        <div className="mini-travel__header-dot" />
        <div className="mini-travel__header-dot" />
        <div className="mini-travel__header-dot" />
        <span className="mini-travel__header-url">lola-travel.companion.ai</span>
      </div>

      {/* Hero banner */}
      <div className="mini-travel__hero">
        <span className="mini-travel__hero-tag">Summer 2030</span>
        <h4 className="mini-travel__hero-title">Lanzarote</h4>
        <p className="mini-travel__hero-dates">Jul 12 — Jul 26 &middot; 2 travelers</p>
      </div>

      {/* Flight card */}
      <div className="mini-travel__card">
        <div className="mini-travel__card-icon">✈</div>
        <div className="mini-travel__card-info">
          <span className="mini-travel__card-label">Flight</span>
          <span className="mini-travel__card-value">Paris CDG → Lanzarote ACE</span>
          <span className="mini-travel__card-detail">Jul 12, 08:30 &middot; Direct &middot; 4h15</span>
        </div>
        <div className="mini-travel__card-price">&euro;186</div>
      </div>

      {/* Hotel card */}
      <div className="mini-travel__card">
        <div className="mini-travel__card-icon">🏨</div>
        <div className="mini-travel__card-info">
          <span className="mini-travel__card-label">Hotel</span>
          <span className="mini-travel__card-value">Casa del Sol Boutique</span>
          <span className="mini-travel__card-detail">14 nights &middot; Ocean view &middot; Breakfast incl.</span>
        </div>
        <div className="mini-travel__card-price">&euro;1,240</div>
      </div>

      {/* Activities */}
      <div className="mini-travel__section">
        <span className="mini-travel__section-title">Activities</span>
        <div className="mini-travel__activities">
          <div className="mini-travel__activity">
            <span className="mini-travel__activity-emoji">🏄‍♀️</span>
            <span>Surf Camp</span>
          </div>
          <div className="mini-travel__activity">
            <span className="mini-travel__activity-emoji">🌋</span>
            <span>Volcano Hike</span>
          </div>
          <div className="mini-travel__activity">
            <span className="mini-travel__activity-emoji">🍽</span>
            <span>Food Tour</span>
          </div>
          <div className="mini-travel__activity">
            <span className="mini-travel__activity-emoji">🚗</span>
            <span>Car Rental</span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mini-travel__total">
        <span>Total estimated</span>
        <span className="mini-travel__total-price">&euro;1,892</span>
      </div>
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
import logoDecathlon from '../assets/story/logos/decathlon.png'
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
      <div className="story-intro__content">
        <motion.h3
          className="story-intro__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          Three months before summer vacation, Lola still doesn&rsquo;t know where to go on holiday.
        </motion.h3>
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
          <img src={videoSurf} alt="Surfing influencer video from Lanzarote" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
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
      <div className="story-booking__content">
        <motion.h3
          className="story-booking__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span>Booking.com</span> wins the bid and dynamically generates an AI influencer in her personalized feed.
        </motion.h3>
        <motion.p
          className="story-booking__companion"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Bot size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          Starts building instructions to gather all best options — flight tickets and hotels using agentic negotiable ad formats.
        </motion.p>
      </div>
      <motion.div
        className="story-booking__visual"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
      >
        <div className="story-booking__image">
          <img src={hotelTour} alt="AI influencer hotel tour - personalized ad" />
        </div>
      </motion.div>
    </div>
  )
}

function ScreenTravelPlanning() {
  return (
    <div className="story-screen__layout story-screen__layout--travel">
      <div className="story-travel__content">
        <motion.h3
          className="story-travel__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          Her companion has built her itinerary within a travel package. She approves, and the companion handle everything.
        </motion.h3>
      </div>
      <div className="story-travel__visual">
        <motion.div
          className="story-travel__app-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <MiniTravelWebsite />
          <ValidateOverlay />
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
      <div className="story-suit__content">
        <motion.h3
          className="story-suit__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          Her Companion knows she&rsquo;s missing a surf suit. He finds the best one using her personal context &mdash; allergies, materials, past injuries.
        </motion.h3>
        <motion.p
          className="story-suit__companion"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Bot size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          Retrieves the virtual asset of the surf suit and finds the best deal. Displays organic and sponsored products.
        </motion.p>
      </div>
      <motion.div
        className="story-suit__visual"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="story-suit__brand">
          <img src={logoDecathlon} alt="Decathlon" className="story-suit__brand-logo" />
        </div>
        <div className="story-suit__avatar">
          <img src={lolaSurfsuit} alt="Lola virtual avatar with surf suit" />
        </div>
      </motion.div>
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
}

function ArrivalSection() {
  const total = SCREENS.length + 1
  return (
    <section className="arrival story-screen--dark" data-lenis-snap>
      <img className="arrival__bg" src={surferBeach} alt="" />
      <div className="arrival__content">
        <motion.h3
          className="arrival__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          She arrives in Lanzarote.<br />
          She can&rsquo;t wait to start the surf camp and explore the island.
        </motion.h3>
      </div>
      <div className="story-screen__num">
        {String(total).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </section>
  )
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
  const isDark = ['intro', 'spark'].includes(screen.type)

  return (
    <motion.section
      ref={ref}
      className={`story-screen ${isDark ? 'story-screen--dark' : 'story-screen--light'}`}
      style={{ background: screen.bg }}
      data-lenis-snap
    >
      {/* Rendered at section level — outside parallax inner */}
      {screen.type === 'intro' && (
        <div className="story-intro__photo">
          <img src={lolaWindow} alt="" />
        </div>
      )}
      {screen.type === 'agent-relay' && <AgentRelayLogos />}

      <motion.div
        className="story-screen__inner"
        style={{ y: smoothY, opacity, scale }}
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

      <ArrivalSection />
      <EndCard />
    </>
  )
}
