import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import Floating, { FloatingElement } from './ParallaxFloating'

export default function CriteoStatement() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      '.criteo-stmt__float-img',
      { opacity: [0, 1] },
      { duration: 0.6, delay: stagger(0.18) }
    )
  }, [animate])

  return (
    <section className="criteo-stmt" ref={scope}>
      <div className="criteo-stmt__sticky">
        <motion.p
          className="criteo-stmt__quote"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          To survive, Criteo needs to be embedded in the agentic layer –
          providing signals, formats, and bidding infrastructure that agents
          consume natively.
        </motion.p>

        <Floating sensitivity={-1} className="criteo-stmt__floating">
          <FloatingElement depth={0.5} style={{ top: '3%', left: '-5%' }}>
            <div className="criteo-stmt__img-wrap criteo-stmt__img-wrap--bordered">
              <motion.img
                initial={{ opacity: 0 }}
                className="criteo-stmt__float-img"
                src="/ezgif-2b23517990657606.gif"
                alt="Robot shoppers from above"
              />
            </div>
          </FloatingElement>

          <FloatingElement depth={1.5} style={{ top: '-12%', right: '-2%', left: 'auto' }}>
            <motion.img
              initial={{ opacity: 0 }}
              className="criteo-stmt__float-img criteo-stmt__float-img--large"
              src="/shoppers-click-compare.png"
              alt="Robot carrying shopping bag"
            />
          </FloatingElement>

          <FloatingElement depth={1} style={{ bottom: '2%', top: 'auto', left: '-5%' }}>
            <div className="criteo-stmt__img-wrap criteo-stmt__img-wrap--bordered">
              <motion.img
                initial={{ opacity: 0 }}
                className="criteo-stmt__float-img"
                src="/Make the Robot Shop.gif"
                alt="Robot browsing store shelves"
              />
            </div>
          </FloatingElement>

          <FloatingElement depth={2} style={{ bottom: '-2%', top: 'auto', right: '-2%', left: 'auto' }}>
            <div className="criteo-stmt__img-wrap criteo-stmt__img-wrap--bordered">
              <motion.img
                initial={{ opacity: 0 }}
                className="criteo-stmt__float-img criteo-stmt__float-img--wide"
                src="/shoppers-no-scroll.png"
                alt="Shoppers walking with robots"
              />
            </div>
          </FloatingElement>
        </Floating>
      </div>
    </section>
  )
}
