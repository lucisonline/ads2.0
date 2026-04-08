import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Word({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span className="sr-word" style={{ opacity }}>
      {word}
    </motion.span>
  )
}

function Paragraph({ text, startProgress, endProgress, progress }) {
  const words = text.split(' ')
  const range = endProgress - startProgress
  return (
    <p className="sr-para">
      {words.map((word, i) => {
        const wordStart = startProgress + (i / words.length) * range
        const wordEnd = startProgress + ((i + 1) / words.length) * range
        return (
          <Word
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

const PARAGRAPHS = [
  'AI is an existential threat to advertising.',
  'Audiences used to browse. Now agents browse for them. If an AI is picking your flights, comparing your options, buying your groceries — who exactly is the ad for?',
  'The ad industry was built on attention. Agents don\'t have attention. They have instructions.',
  'The ecosystem is shifting.',
  'The shopper journey is now everywhere.',
]

export default function ScrollRevealText() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const total = PARAGRAPHS.length
  const slices = PARAGRAPHS.map((_, i) => {
    const start = (i / total) * 0.85
    const end = ((i + 1) / total) * 0.85
    return [start, end]
  })

  return (
    <section ref={containerRef} className="sr" >
      <div className="sr__sticky">
        <div className="sr__content">
          {PARAGRAPHS.map((text, i) => (
            <Paragraph
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
