import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ============================
   Frame 1 — "To illustrate this paradigm shift…"
   Full-viewport scene: text left, terrace photo right, robot avatar overlapping.
   Images float gently on scroll.
   ============================ */

export function LolaTransition() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Content fades in at the start, stays, then fades out at the end
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.75, 1], [0, 1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.1, 0.75, 1], [60, 0, 0, -80])

  // Terrace image floats gently
  const terraceY = useTransform(scrollYProgress, [0, 1], [30, -50])
  const terraceRotate = useTransform(scrollYProgress, [0, 1], [-1, 1.5])

  // Robot avatar drifts and scales in
  const robotY = useTransform(scrollYProgress, [0, 1], [20, -40])
  const robotScale = useTransform(scrollYProgress, [0, 0.15, 1], [0.7, 1, 1])

  return (
    <section className="lola-transition" ref={ref}>
      <div className="lola-transition__sticky">
        <motion.div className="lola-transition__layout" style={{ opacity: contentOpacity, y: contentY }}>
          <div className="lola-transition__text">
            <p>
              To illustrate this paradigm shift{' '}
              let&rsquo;s follow the story of Lola from the point of view of her agent
            </p>
          </div>

          <motion.div
            className="lola-transition__photo"
            style={{ y: terraceY, rotate: terraceRotate }}
          >
            <img src="/lola-terrace.jpg" alt="Lola at a terrace in Paris" />
          </motion.div>

          <motion.div
            className="lola-transition__robot"
            style={{ y: robotY, scale: robotScale }}
          >
            <img src="/robot-avatar.png" alt="Companion agent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================
   Frame 2 — Agent story lines
   Three text blocks revealed one by one on scroll,
   with a floating luggage image.
   ============================ */

const LINES = [
  '3 months before summer she doesn\u2019t know where to go on vacations',
  'As her agent I will expose her to a video of a surfing influencer to nudge her',
  'I know her budget and I know her priorities',
]

export function LolaAgentStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Each line gets its own reveal window
  const line1Opacity = useTransform(scrollYProgress, [0.0, 0.08, 0.25, 0.33], [0, 1, 1, 0.25])
  const line1Y = useTransform(scrollYProgress, [0.0, 0.08], [50, 0])

  const line2Opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.55, 0.63], [0, 1, 1, 0.25])
  const line2Y = useTransform(scrollYProgress, [0.28, 0.36], [50, 0])

  const line3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 0.85, 0.95], [0, 1, 1, 1])
  const line3Y = useTransform(scrollYProgress, [0.58, 0.66], [50, 0])

  // Luggage image floats throughout
  const luggageY = useTransform(scrollYProgress, [0, 1], [80, -100])
  const luggageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0])
  const luggageX = useTransform(scrollYProgress, [0, 1], [-10, 40])

  return (
    <section className="lola-story" ref={ref}>
      <div className="lola-story__sticky">
        <motion.div
          className="lola-story__luggage"
          style={{ y: luggageY, opacity: luggageOpacity, x: luggageX }}
        >
          <img src="/lola-luggage.jpg" alt="Lola with luggage" />
        </motion.div>

        <div className="lola-story__lines">
          <motion.p
            className="lola-story__line lola-story__line--1"
            style={{ opacity: line1Opacity, y: line1Y }}
          >
            {LINES[0]}
          </motion.p>

          <motion.p
            className="lola-story__line lola-story__line--2"
            style={{ opacity: line2Opacity, y: line2Y }}
          >
            {LINES[1]}
          </motion.p>

          <motion.p
            className="lola-story__line lola-story__line--3"
            style={{ opacity: line3Opacity, y: line3Y }}
          >
            {LINES[2]}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
