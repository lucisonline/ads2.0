import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/*
  Scroll-driven intro: across 400vh.
  Phase 1 (0–30%):   Hand peeks from right, "Design strategy presents" fades in top-center
  Phase 2 (30–60%):  Cursors swarm in, hand drifts left, subtitle rises from below
  Phase 3 (60–100%): Both titles visible, cursors scattered across left half
*/

const CURSORS = [
  // top-left corner
  { startX: 2,  startY: 5,  endX: 5,  endY: 10,  rot: 126 },
  // left, row 2
  { startX: 5,  startY: 22, endX: 8,  endY: 26,  rot: 126 },
  // center-left, upper
  { startX: 18, startY: 16, endX: 22, endY: 20,  rot: 122 },
  // center, near hand — pulled back for gap
  { startX: 26, startY: 28, endX: 32, endY: 32,  rot: 110 },
  // below hand, with gap from fingers
  { startX: 30, startY: 46, endX: 36, endY: 50,  rot: 95 },
  // left, mid row
  { startX: 3,  startY: 42, endX: 7,  endY: 46,  rot: 80 },
  // center-left, lower
  { startX: 15, startY: 52, endX: 20, endY: 56,  rot: 85 },
  // bottom-left
  { startX: 4,  startY: 72, endX: 7,  endY: 78,  rot: 59 },
  // extra: between rows 1 & 3
  { startX: 25, startY: 18, endX: 30, endY: 22,  rot: 115 },
]

function CursorSVG() {
  return (
    <svg viewBox="0 0 88.58 102.74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3449 12.4403L27.0829 10.3669L28.1196 14.2359L31.9886 13.1992L36.1353 28.6751L43.8733 26.6018L44.91 30.4708L56.517 27.3607L57.5536 31.2297L65.2916 29.1563L66.3283 33.0253L70.1973 31.9886L71.234 35.8576L75.103 34.8209L82.3598 61.9038L78.4908 62.9404L81.6009 74.5474L77.7319 75.5841L80.842 87.1911L42.1521 97.558L39.0421 85.951L35.1731 86.9877L33.0997 79.2497L29.2307 80.2864L27.1573 72.5485L23.2883 73.5851L21.215 65.8472L17.346 66.8839L16.3093 63.0149L12.4403 64.0516L9.33022 52.4446L20.9372 49.3345L21.9739 53.2035L25.8429 52.1668L16.5126 17.346L20.3816 16.3093" fill="black"/>
      <path d="M28.1209 14.2355L37.4511 49.0564L41.3201 48.0197L37.1733 32.5438L44.9113 30.4704L49.058 45.9463L52.927 44.9096L49.8169 33.3027L57.5549 31.2293L61.7017 46.7052L65.5707 45.6685L62.4606 34.0616L66.3296 33.0249L67.3663 36.8939L71.2353 35.8572L78.4921 62.9401L74.6231 63.9768L77.7332 75.5837L73.8642 76.6204L75.9376 84.3584L44.9857 92.6519L42.9123 84.9139L39.0433 85.9506L36.97 78.2127L33.101 79.2494L31.0276 71.5114L27.1586 72.5481L25.0852 64.8101L21.2162 65.8468L20.1795 61.9778L16.3106 63.0145L14.2372 55.2765L21.9751 53.2032L23.0118 57.0721L26.8808 56.0354L27.9175 59.9044L31.7865 58.8677L20.3829 16.3089" fill="white"/>
    </svg>
  )
}

function AnimatedCursor({ cursor, progress, index }) {
  const { startX, startY, endX, endY, rot } = cursor
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2

  const x = useTransform(progress, [0, 0.5, 1], [`${startX}%`, `${midX}%`, `${endX}%`])
  const y = useTransform(progress, [0, 0.5, 1], [`${startY}%`, `${midY}%`, `${endY}%`])

  return (
    <motion.div
      className="endpage-cursor"
      style={{
        left: x,
        top: y,
        rotate: rot,
        animationDelay: `${index * -0.7}s`,
      }}
    >
      <CursorSVG />
    </motion.div>
  )
}

export default function EndPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Hand: barely peeks in phase 1, slides fully into view by phase 3
  const handLeft = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['95%', '65%', '40%', '29%'])
  const handRight = useTransform(scrollYProgress, [0, 0.66, 1], ['-2%', '-15%', '-21%'])
  const handTop = useTransform(scrollYProgress, [0, 0.66, 1], ['-5%', '-12%', '-19%'])

  // "Design strategy presents" — drops down from top, centered horizontally
  const t1Opacity = useTransform(scrollYProgress, [0.02, 0.10], [0, 1])
  const t1Top = useTransform(scrollYProgress, [0, 0.33, 0.66], ['-5%', '5%', '12%'])

  // "Advertising in the age of agents" — floats up from below as user starts scrolling
  const t2Opacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1])
  const t2Bottom = useTransform(scrollYProgress, [0.02, 0.35], ['-8%', '16%'])

  return (
    <section className="endpage" ref={ref}>
      <div className="endpage__sticky">
        {CURSORS.map((cursor, i) => (
          <AnimatedCursor key={i} cursor={cursor} progress={scrollYProgress} index={i} />
        ))}

        <motion.div
          className="endpage__hand"
          style={{ left: handLeft, right: handRight, top: handTop }}
        >
          <img src="/hand.png" alt="" />
        </motion.div>

        <motion.h1
          className="endpage__title1"
          style={{ opacity: t1Opacity, top: t1Top }}
        >
          Design strategy presents
        </motion.h1>

        <motion.h2
          className="endpage__title2"
          style={{ opacity: t2Opacity, bottom: t2Bottom }}
        >
          Advertising in the age of agents
        </motion.h2>
      </div>
    </section>
  )
}
