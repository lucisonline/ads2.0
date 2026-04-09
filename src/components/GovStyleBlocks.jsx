import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

/* ============================
   Shared: word-by-word scroll reveal
   Words go from dim gray → bright cream as you scroll
   ============================ */

function Word({ word, range, progress }) {
  const color = useTransform(progress, range, ['#7a7570', '#f0ebe3'])
  return (
    <motion.span className="gov-word" style={{ color }}>
      {word}
    </motion.span>
  )
}

function InlineIcon({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <motion.div className="gov__inline-icon-wrap" style={{ opacity }}>
      {children}
    </motion.div>
  )
}

function RevealPara({ text, start, end, progress, className, inlineIcon }) {
  const words = text.split(' ')
  const span = end - start
  const iconStart = start + ((words.length - 1) / words.length) * span
  const iconEnd = start + span
  return (
    <div className={className}>
      {words.map((word, i) => {
        const ws = start + (i / words.length) * span
        const we = start + ((i + 1) / words.length) * span
        return <Word key={i} word={word} range={[ws, we]} progress={progress} />
      })}
      {inlineIcon}
    </div>
  )
}

/* ============================
   BLOCK 1 — Full statement
   "AI is redefining advertising as we know it."
   ============================ */

const BLOCK1_TEXT = ['AI is redefining advertising as we know it.']

export function GovBlock1() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="gov gov--1" ref={ref}>
      <div className="gov__sticky">
        <div className="gov__center">
          {BLOCK1_TEXT.map((text, i) => (
            <RevealPara
              key={i}
              text={text}
              start={0}
              end={0.7}
              progress={scrollYProgress}
              className="gov__mega"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================
   BLOCK 2 — Big scrolling text
   Larger words light up as you scroll
   ============================ */

const BLOCK2_PARAS = [
  'Advertising was built on capturing human attention.',
  "But agents don't have attention, they have instructions.",
]

export function GovBlock2() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const total = BLOCK2_PARAS.length
  const slices = BLOCK2_PARAS.map((_, i) => ({
    start: (i / total) * 0.85,
    end: ((i + 1) / total) * 0.85,
  }))

  const inlineIcons = [
    <DotLottieReact
      key="lottie-eye"
      src="/animation-visibility.lottie"
      loop
      autoplay
      style={{ width: 60, height: 60 }}
    />,
    <img
      key="gif-cursor"
      src="/replace-gif-color.gif"
      alt=""
      style={{ width: 60, height: 60, objectFit: 'contain' }}
    />,
  ]

  return (
    <section className="gov gov--2" ref={ref}>
      <div className="gov__sticky">
        <div className="gov__content">
          {BLOCK2_PARAS.map((text, i) => (
            <RevealPara
              key={i}
              text={text}
              start={slices[i].start}
              end={slices[i].end}
              progress={scrollYProgress}
              className="gov__big"
              inlineIcon={inlineIcons[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================
   BLOCK 3 — Smaller text
   ============================ */

const BLOCK3_PARAS = [
  'Shoppers no longer scroll, click, and compare.',
  'Their AI agent does it — filtering, negotiating, deciding at machine speed.',
  'With MCP and agents, AI learns user habits, context, and shapes purchases.',
  'New modular formats are needed to serve agents as a new customer segment.',
]

export function GovBlock3() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const total = BLOCK3_PARAS.length
  const slices = BLOCK3_PARAS.map((_, i) => ({
    start: (i / total) * 0.85,
    end: ((i + 1) / total) * 0.85,
  }))

  return (
    <section className="gov gov--3" ref={ref}>
      <div className="gov__sticky">
        <div className="gov__content">
          {BLOCK3_PARAS.map((text, i) => (
            <RevealPara
              key={i}
              text={text}
              start={slices[i].start}
              end={slices[i].end}
              progress={scrollYProgress}
              className="gov__body"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
