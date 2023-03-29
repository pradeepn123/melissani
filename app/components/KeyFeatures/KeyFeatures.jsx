import { motion } from 'framer-motion';

export function KeyFeatures({features}) {

  return (
      <div className="key-features-section">
          {features && features.map((feature, index) => (
          <motion.span 
          initial={{ opacity: 0, transform: "translateY(60px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          animate="visible"
          transition={{
            ease: "easeInOut",
            duration: 0.8,
            x: { duration: 1 }
          }}
          exit={{ opacity: 0, transform: "translateY(60px)" }}
          className="key-feature" key={index}>
              <span className="key-feature-icon">
                  <img src={feature.icon} />
              </span>
              <p className="key-feature-text font-tertiary">
                  {feature.text}
              </p>
          </motion.span> ))}
      </div>
  )
}
