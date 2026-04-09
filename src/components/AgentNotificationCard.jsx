import { motion } from 'framer-motion'
import companionAvatar from '../assets/story/companion-avatar.png'

/**
 * Reusable agent notification card.
 * Renders the notification-component.svg asset with the companion avatar
 * overlaid on the icon slot. Pass `className` to position per screen.
 */
export default function AgentNotificationCard({
  className = '',
  delay = 0,
  style,
  title,
  description,
  time,
  controlled = false,
}) {
  const motionProps = controlled
    ? {}
    : {
        initial: { opacity: 0, y: -36, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.97 },
        transition: { type: 'spring', stiffness: 260, damping: 26, delay },
      }

  return (
    <motion.div
      className={`agent-notification-card ${className}`}
      style={style}
      {...motionProps}
    >
      <div className="agent-notification-card__bg" aria-hidden="true" />
      <img
        src={companionAvatar}
        alt="Companion"
        className="agent-notification-card__avatar"
        draggable={false}
      />
      {(title || description || time) && (
        <div className="agent-notification-card__text">
          {(title || time) && (
            <div className="agent-notification-card__row">
              {title && <span className="agent-notification-card__title">{title}</span>}
              {time && <span className="agent-notification-card__time">{time}</span>}
            </div>
          )}
          {description && (
            <span className="agent-notification-card__desc">{description}</span>
          )}
        </div>
      )}
    </motion.div>
  )
}
