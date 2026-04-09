import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from 'lenis/react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Bot } from 'lucide-react'
import AgentNotificationCard from './AgentNotificationCard'

// Photos
import lolaWindow from '../assets/story/photos/lola-window.jpg'
import surferBeach from '../assets/story/photos/surfer-beach.jpg'
import lolaPhone from '../assets/story/photos/lola-phone.jpg'
import lolaSurfsuit from '../assets/story/photos/lola-surfsuit.jpg'
import surferSitting from '../assets/story/photos/surfer-sitting.jpeg'
import carteIsometrique from '../assets/story/photos/carte-isometrique-2.png'
import ticketsSvg from '../assets/story/photos/tickets.svg'
import costalHotelCardSvg from '../assets/story/photos/costal-hotel-card.svg'
import mapPinSvg from '../assets/story/icons/map-pin.svg'

// Videos
import videoSurf from '../assets/story/videos/video-surf.gif'
import hotelTour from '../assets/story/videos/hotel-tour.gif'


/* ============================
   SCREEN DATA
   ============================ */

const SCREENS_BEFORE_TRAVEL = [
  { id: 'intro', type: 'intro', bg: '#000000', label: 'No Plan', context: 'Three months before summer', theme: 'dark' },
  { id: 'spark', type: 'spark', bg: '#0d1f33', label: 'Feed', context: 'Surfing influencer in Lanzarote', theme: 'dark' },
  { id: 'messages', type: 'messages', bg: '#ffffff', label: 'Chat', context: 'Sharing Lanzarote with a friend', theme: 'light' },
  { id: 'agent-relay', type: 'agent-relay', bg: '#f0ebe3', label: 'Relay', context: 'Agent relays to other agents', theme: 'light' },
  { id: 'booking-wins', type: 'booking-wins', bg: '#ffffff', label: 'Booking', context: 'Booking.com wins the bid', theme: 'light' },
]

const SCREENS_AFTER_TRAVEL = [
  { id: 'local-discovery', type: 'local-discovery', bg: '#f5f0eb', label: 'Personalized itinary', context: 'Lanzarote Tourist Office', theme: 'light' },
  { id: 'surf-suit', type: 'surf-suit', bg: '#1a1545', label: 'Surf Suit', context: 'Decathlon surf suit match', theme: 'dark' },
]

const SCREENS = [...SCREENS_BEFORE_TRAVEL, { id: 'travel-planning', type: 'travel-planning', bg: '#f8f7f4', label: 'Itinerary', context: 'Full travel package built', theme: 'light' }, ...SCREENS_AFTER_TRAVEL]

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
  const [showAgent, setShowAgent] = useState(false)
  const [cycle, setCycle] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (!inView) {
      setVisibleMessages([])
      setTyping(false)
      setShowAgent(false)
      return
    }

    setVisibleMessages([])
    setTyping(false)
    setShowAgent(false)
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

    // Agent notification slides in ~1.5s after the last chat message
    const agentTimeout = setTimeout(() => {
      setShowAgent(true)
    }, 5000)
    timeouts.push(agentTimeout)

    const resetTimeout = setTimeout(() => {
      setVisibleMessages([])
      setTyping(false)
      setShowAgent(false)
      setCycle((c) => c + 1)
    }, 10500)
    timeouts.push(resetTimeout)

    return () => timeouts.forEach(clearTimeout)
  }, [inView, cycle])

  // Find the next received message that isn't visible yet
  const nextReceivedId = CHAT_MESSAGES.find(m => !m.sent && !visibleMessages.includes(m.id))?.id

  return (
    <div ref={ref} className="story-chat">
      <AnimatePresence mode="popLayout">
        {showAgent && (
          <AgentNotificationCard
            key="agent-notif"
            className="agent-notification-card--chat"
            title="Find a surf trip for this summer"
            time="now"
            description={
              <>
                3 options found. Best match: <strong>Lanzarote</strong> &mdash;{' '}
                <strong>&euro;420</strong>, conditions optimal. Want me to handle everything?
              </>
            }
          />
        )}
      </AnimatePresence>
      <motion.div
        layout="position"
        transition={{ type: 'spring', stiffness: 220, damping: 30 }}
        className="story-chat__window"
      >
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
      </motion.div>
    </div>
  )
}

/* ============================
   TRAVEL PACKAGE COMPONENT
   ============================ */

function TravelPackage({ ticketStyle, hotelStyle }) {
  return (
    <div className="travel-package">
      <motion.img
        className="travel-package__ticket"
        src={ticketsSvg}
        alt="Flight ticket — Paris CDG to Lanzarote ACE"
        style={ticketStyle}
      />
      <motion.img
        className="travel-package__hotel"
        src={costalHotelCardSvg}
        alt="Costal Hotel — Lanzarote"
        style={hotelStyle}
      />
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
import logoCriteo from '../assets/story/logos/crt-logo.svg'
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
      <motion.h2
        className="story-intro__title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        Three months before summer vacation, Lola still doesn&rsquo;t know where to go.
      </motion.h2>

      <div className="story-intro__icons">
        <div className="story-intro__icon-slot" />
        <div className="story-intro__icon-slot" />
        <div className="story-intro__icon-slot" />
        <div className="story-intro__icon-slot" />
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
        As soon as she shows interest - I will relaying her informations to other agents to bid on her trip
      </motion.h3>
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
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Ticket — enters from below-left with rotation
  const ticketYRaw = useTransform(scrollYProgress, [0.05, 0.5], [420, 0])
  const ticketRotateRaw = useTransform(scrollYProgress, [0.05, 0.5], [-16, -4])
  const ticketY = useSpring(ticketYRaw, { stiffness: 110, damping: 24 })
  const ticketRotate = useSpring(ticketRotateRaw, { stiffness: 110, damping: 24 })

  // Hotel card — enters slightly later from below-right
  const hotelYRaw = useTransform(scrollYProgress, [0.12, 0.58], [520, 0])
  const hotelRotateRaw = useTransform(scrollYProgress, [0.12, 0.58], [18, 3])
  const hotelY = useSpring(hotelYRaw, { stiffness: 110, damping: 24 })
  const hotelRotate = useSpring(hotelRotateRaw, { stiffness: 110, damping: 24 })

  // Agent notification — fades in only after ticket + hotel have landed
  const notifOpacityRaw = useTransform(scrollYProgress, [0.62, 0.75], [0, 1])
  const notifYRaw = useTransform(scrollYProgress, [0.62, 0.75], [-24, 0])
  const notifScaleRaw = useTransform(scrollYProgress, [0.62, 0.75], [0.96, 1])
  const notifOpacity = useSpring(notifOpacityRaw, { stiffness: 140, damping: 24 })
  const notifY = useSpring(notifYRaw, { stiffness: 140, damping: 24 })
  const notifScale = useSpring(notifScaleRaw, { stiffness: 140, damping: 24 })

  return (
    <section ref={sectionRef} className="story-travel-section" style={{ background: '#ffffff' }} data-story-id="travel-planning">
      <div className="story-travel-sticky">
        {/* Title + checkmarks */}
        <div className="story-travel__text-block">
          <motion.h3
            className="story-travel__title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          >
            Your trip is ready, you saved 18% compare to average price
          </motion.h3>
          <motion.div
            className="story-travel__checks"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="story-travel__check">
              <span className="story-travel__check-mark">✓</span> Flights booked
            </span>
            <span className="story-travel__check">
              <span className="story-travel__check-mark">✓</span> Hotel reserved
            </span>
          </motion.div>
        </div>

        {/* Travel package — ticket + hotel card rise into place on scroll */}
        <div className="story-travel__preview">
          <TravelPackage
            ticketStyle={{ y: ticketY, rotate: ticketRotate }}
            hotelStyle={{ y: hotelY, rotate: hotelRotate }}
          />
        </div>

        {/* Agent notification — appears after the flight + hotel visuals. */}
        <AgentNotificationCard
          className="agent-notification-card--travel"
          controlled
          style={{ opacity: notifOpacity, y: notifY, scale: notifScale }}
          title="Found the best flight and the best hotel for you"
          description="Should I book it?"
          time="just now"
        />
      </div>
    </section>
  )
}

const DISCOVERY_PINS = [
  { id: 'rentals', label: 'Rentals', x: '28%', y: '52%' },
  { id: 'shop', label: 'Shop', x: '55%', y: '58%' },
  { id: 'food', label: 'Restaurants', x: '72%', y: '66%' },
  { id: 'bars', label: 'Bars', x: '42%', y: '82%' },
]

function MapPin({ pin, index }) {
  return (
    <motion.div
      className="story-discovery__pin"
      style={{ left: pin.x, top: pin.y }}
      initial={{ opacity: 0, y: -90, scale: 0.3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 16,
        delay: 0.5 + index * 0.3,
      }}
    >
      <img src={mapPinSvg} alt="" className="story-discovery__pin-shape" />
      <span className="story-discovery__pin-label">{pin.label}</span>
    </motion.div>
  )
}

function LocalDiscoveryBackground() {
  return (
    <div className="story-discovery__map-wrap" aria-hidden="true">
      <div
        className="story-discovery__map"
        style={{ backgroundImage: `url(${carteIsometrique})` }}
      />
      <div className="story-discovery__pins">
        {DISCOVERY_PINS.map((pin, i) => (
          <MapPin key={pin.id} pin={pin} index={i} />
        ))}
      </div>
    </div>
  )
}

function ScreenLocalDiscovery() {
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
          I&rsquo;ve updated your itinerary with the best options
        </motion.h3>
        <motion.p
          className="story-discovery__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Lanzarote Tourist Office, Get your Guide, Booking provided those informations
        </motion.p>
      </div>
    </div>
  )
}

function ScreenSurfSuit() {
  return (
    <div className="story-screen__layout story-screen__layout--suit">
      <AgentNotificationCard
        className="agent-notification-card--suit"
        title="You’ll need a wetsuit"
        description={(
          <>
            Selected for you: Size: M
            <br />
            Based on past purchases and compatible with your allergies
            <br />
            Let&rsquo;s see what it could look like on your AI avatar
          </>
        )}
        time="just now"
      />
      <div className="story-suit__content" />
      <motion.div
        className="story-suit__visual"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 2 }}
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
  'local-discovery': ScreenLocalDiscovery,
  'surf-suit': ScreenSurfSuit,
}

function ArrivalSection() {
  const total = SCREENS.length + 1
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [showNotif1, setShowNotif1] = useState(false)
  const [showNotif2, setShowNotif2] = useState(false)

  useEffect(() => {
    if (!inView) {
      setShowNotif1(false)
      setShowNotif2(false)
      return
    }
    const t1 = setTimeout(() => setShowNotif1(true), 1000)
    const t2 = setTimeout(() => setShowNotif2(true), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [inView])

  return (
    <section ref={ref} className="arrival story-screen--dark" data-story-id="arrival" data-lenis-snap>
      <div className="arrival__content">
        <motion.h2
          className="arrival__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Lanzarote
        </motion.h2>
        <div className="arrival__notifs">
          <AnimatePresence>
            {showNotif1 && (
              <AgentNotificationCard
                key="arrival-notif-1"
                className="agent-notification-card--arrival"
                title="Your agent booked a surf session for Saturday."
                time="just now"
                description={(
                  <>
                    Reason:
                    <br />
                    – Weather window optimal
                    <br />
                    – Price dropped 12%
                  </>
                )}
              />
            )}
            {showNotif2 && (
              <AgentNotificationCard
                key="arrival-notif-2"
                className="agent-notification-card--arrival"
                title="Next"
                time="in 1h20"
                description="Your surf session starts in 1h20"
              />
            )}
          </AnimatePresence>
        </div>
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
  const Renderer = SCREEN_RENDERERS[screen.type]
  const isDark = ['intro', 'spark'].includes(screen.type)

  return (
    <section
      ref={ref}
      className={`story-screen ${isDark ? 'story-screen--dark' : 'story-screen--light'}`}
      style={{ background: screen.bg }}
      data-story-id={screen.id}
      data-lenis-snap
    >
      {screen.type === 'agent-relay' && <AgentRelayLogos />}
      {screen.type === 'local-discovery' && <LocalDiscoveryBackground />}

      <div className="story-screen__inner">
        {Renderer && <Renderer />}
      </div>

      <div className="story-screen__num">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </section>
  )
}

/* ============================
   END CARD
   ============================ */

const ENDCARD_PARAGRAPHS = [
  'From the TikTok video to Lanzarote, Lola interacted with many ad formats, and was targeted by several advertisers.',
  'All this without even feeling advertised to. She never felt “advertised to.”',
  'Everything just… happened.',
  'No banners. No clicks. No decisions.',
]

function EndCardWord({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span className="sr-word" style={{ opacity }}>
      {word}
    </motion.span>
  )
}

function EndCardParagraph({ text, startProgress, endProgress, progress }) {
  const words = text.split(' ')
  const range = endProgress - startProgress
  return (
    <p className="sr-para">
      {words.map((word, i) => {
        const wordStart = startProgress + (i / words.length) * range
        const wordEnd = startProgress + ((i + 1) / words.length) * range
        return (
          <EndCardWord
            key={i}
            word={word}
            range={[wordStart, wordEnd]}
            progress={progress}
          />
        )
      })}
    </p>
  )
}

function EndCard() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const total = ENDCARD_PARAGRAPHS.length
  const slices = ENDCARD_PARAGRAPHS.map((_, i) => {
    const start = (i / total) * 0.85
    const end = ((i + 1) / total) * 0.85
    return [start, end]
  })

  return (
    <section ref={containerRef} className="sr" data-story-id="endcard">
      <div className="sr__sticky">
        <div className="sr__content">
          {ENDCARD_PARAGRAPHS.map((text, i) => (
            <EndCardParagraph
              key={i}
              text={text}
              startProgress={slices[i][0]}
              endProgress={slices[i][1]}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================
   STRUCTURAL CARD (final)
   ============================ */

function StructuralCard() {
  return (
    <section className="structural" data-story-id="structural">
      <div className="structural__inner">
        <h2 className="structural__title">
          Advertising didn&rsquo;t disappear.
          <br />
          It became structural.
        </h2>

        <p className="structural__line">
          From a single video&hellip; <strong>6 formats activated</strong> and multiple signals captured &hellip;to a full trip.
        </p>

        <p className="structural__kicker">
          All of it orchestrated by a trusted agent.
        </p>
      </div>
    </section>
  )
}

/* ============================
   STORY TIMELINE
   ============================ */

const TIMELINE_STEPS = [
  ...SCREENS.map((s) => ({ id: s.id, label: s.label, context: s.context, theme: s.theme })),
  { id: 'arrival', label: 'Arrival', context: 'She arrives in Lanzarote', theme: 'dark' },
]

function StoryTimeline() {
  const [activeId, setActiveId] = useState(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const storyIds = TIMELINE_STEPS.map((s) => s.id)
    let cachedSections = null
    const getSections = () => {
      if (!cachedSections) {
        cachedSections = []
        storyIds.forEach((id) => {
          const el = document.querySelector(`[data-story-id="${id}"]`)
          if (el) cachedSections.push(el)
        })
      }
      return cachedSections
    }

    let rafId
    const loop = () => {
      const sections = getSections()
      if (sections.length) {
        const vh = window.innerHeight
        let best = null
        let bestScore = -1
        let anyVisible = false

        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect()
          const visTop = Math.max(rect.top, 0)
          const visBot = Math.min(rect.bottom, vh)
          const coverage = Math.max(0, visBot - visTop) / vh

          if (coverage > 0) {
            anyVisible = true
            // Section qui entre par le bas (top > 0) : boost x3
            // pour basculer dès ~25% de visibilité
            const score = rect.top > 0 ? coverage * 3 : coverage
            if (score > bestScore) {
              bestScore = score
              best = sections[i]
            }
          }
        }

        setVisible(anyVisible)
        if (best) setActiveId(best.dataset.storyId)
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const activeIndex = TIMELINE_STEPS.findIndex((s) => s.id === activeId)
  const activeTheme = TIMELINE_STEPS[activeIndex]?.theme ?? 'dark'

  return createPortal(
    <nav
      ref={ref}
      className={`story-timeline story-timeline--${activeTheme}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      <div className="story-timeline__pill">
        <div className="story-timeline__steps">
          {TIMELINE_STEPS.map((step, i) => {
            const isPast = i < activeIndex
            const isActive = i === activeIndex

            return (
              <button
                key={step.id}
                className={`story-timeline__step ${isActive ? 'story-timeline__step--active' : ''} ${isPast ? 'story-timeline__step--past' : ''}`}
                onClick={() => {
                  const el = document.querySelector(`[data-story-id="${step.id}"]`)
                  if (!el) return
                  if (lenis) {
                    lenis.scrollTo(el, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) })
                  } else {
                    el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span className="story-timeline__dot" />
                <span className="story-timeline__label">{step.label}</span>
                <span className="story-timeline__tooltip">
                  <span className="story-timeline__tooltip-prefix">I can jump you back to:</span>
                  <span className="story-timeline__tooltip-value">{step.context}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>,
    document.body
  )
}

/* ============================
   MAIN EXPORT
   ============================ */

export default function LolaCarousel() {
  const totalScreens = SCREENS.length

  return (
    <>
      <StoryTimeline />

      {SCREENS_BEFORE_TRAVEL.map((screen, i) => (
        <StoryScreen
          key={screen.id}
          screen={screen}
          index={i}
          total={totalScreens}
        />
      ))}

      <ScreenTravelPlanning />

      {SCREENS_AFTER_TRAVEL.map((screen, i) => (
        <StoryScreen
          key={screen.id}
          screen={screen}
          index={SCREENS_BEFORE_TRAVEL.length + 1 + i}
          total={totalScreens}
        />
      ))}

      <ArrivalSection />
      <EndCard />
      <StructuralCard />
    </>
  )
}
