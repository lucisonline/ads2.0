import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ============================
   AGENT PAGES — 3 scroll-driven crossfading pages
   Uses rawIndex pattern from LolaCarousel for clean transitions
   ============================ */

const SLIDES = [
  {
    id: 'shoppers',
    layout: 'centered',
    topText: 'Shoppers no longer scroll, click, and compare.',
    bottomText:
      'Their AI agent does it for them, filtering, negotiating, and deciding at machine speed.',
    image: '/ezgif-2b23517990657606.gif',
    imageAlt: 'Shopper with AI agent',
  },
  {
    id: 'mcp-agents',
    layout: 'text-left',
    text: 'Using MCP and agents, these systems learn from user habits and context to guide purchasing decisions.',
    image: '/Make the Robot Shop.gif',
    imageAlt: 'AI robot with shopping carts',
  },
  {
    id: 'modular-ads',
    layout: 'text-right',
    text: 'New modular ad formats are needed to serve AI agents as an entirely new customer segment.',
    image: '/MP4 to GIF Converter.gif',
    imageAlt: 'Modular ad formats',
  },
]

function CenteredSlide({ slide, rawIndex }) {
  // Bottom text fades in after top text + image are visible
  const bottomOpacity = useTransform(rawIndex, (v) => {
    if (v < 0.15) return 0
    if (v > 0.35) return 1
    return (v - 0.15) / 0.2
  })
  const bottomY = useTransform(rawIndex, (v) => {
    if (v < 0.15) return 30
    if (v > 0.35) return 0
    return 30 * (1 - (v - 0.15) / 0.2)
  })

  return (
    <div className="ap-slide__inner ap-slide--centered">
      <p className="ap-text">{slide.topText}</p>
      <div className="ap-image-box">
        {slide.image && (
          <img src={slide.image} alt={slide.imageAlt} className="ap-image-box__img" />
        )}
      </div>
      <motion.p className="ap-text" style={{ opacity: bottomOpacity, y: bottomY }}>
        {slide.bottomText}
      </motion.p>
    </div>
  )
}

function SplitSlide({ slide }) {
  const textFirst = slide.layout === 'text-left'

  const textBlock = (
    <div className="ap-split__text">
      <p className="ap-text">{slide.text}</p>
    </div>
  )

  const mediaBlock = (
    <div className={`ap-split__media${slide.overlayImage ? ' ap-split__media--stacked' : ''}`}>
      <img
        src={slide.image}
        alt={slide.imageAlt}
        className={`ap-split__img${slide.overlayImage ? ' ap-split__img--main' : ''}`}
      />
      {slide.overlayImage && (
        <img
          src={slide.overlayImage}
          alt={slide.overlayAlt}
          className="ap-split__img--robot"
        />
      )}
    </div>
  )

  return (
    <div className="ap-slide__inner ap-slide--split">
      {textFirst ? textBlock : mediaBlock}
      {textFirst ? mediaBlock : textBlock}
    </div>
  )
}

function AgentSlide({ slide, index, rawIndex }) {
  // Hold fully visible within ±0.4 of index, fade out by ±0.6
  const opacity = useTransform(rawIndex, (v) => {
    const dist = Math.abs(v - index)
    if (dist <= 0.4) return 1
    if (dist >= 0.6) return 0
    return 1 - (dist - 0.4) / 0.2
  })

  // Cinematic: outgoing slide drifts up, incoming slides rise from below
  const y = useTransform(rawIndex, (v) => {
    const delta = v - index
    if (Math.abs(delta) > 1) return delta > 0 ? -80 : 80
    return delta * -80
  })

  // Subtle scale punch: 0.96 → 1.0 as slide enters
  const scale = useTransform(rawIndex, (v) => {
    const dist = Math.abs(v - index)
    if (dist >= 1) return 0.96
    return 0.96 + 0.04 * (1 - dist)
  })

  return (
    <motion.div className="ap-slide" style={{ opacity }}>
      <motion.div className="ap-slide__motion" style={{ y, scale }}>
        {slide.layout === 'centered' ? (
          <CenteredSlide slide={slide} rawIndex={rawIndex} />
        ) : (
          <SplitSlide slide={slide} />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function AgentPages() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const total = SLIDES.length
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, total - 1])

  return (
    <section
      ref={containerRef}
      className="ap"
      style={{ height: `${total * 200}vh` }}
    >
      <div className="ap__pin">
        {SLIDES.map((slide, i) => (
          <AgentSlide key={slide.id} slide={slide} index={i} rawIndex={rawIndex} />
        ))}
      </div>
    </section>
  )
}
