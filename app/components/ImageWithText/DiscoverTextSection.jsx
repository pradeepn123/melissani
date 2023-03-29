import { motion } from 'framer-motion';

export function DiscoverTextSection({discover}) {
    return (
        <motion.div 
        initial={{ opacity: 0, transform: "translateY(60px)" }}
        whileInView={{ opacity: 1, transform: "translateY(0px)" }}
        animate="visible"
        transition={{
        ease: "easeInOut",
        duration: 0.8,
            x: { duration: 1 }
        }}
        exit={{ opacity: 0, transform: "translateY(60px)" }}   
        className="discover-section">
            <h2 className="discover-heading">
                {discover.title}
            </h2>
            <p className="discover-description">
                {discover.description}
            </p>
            
            <div className="discover-icons">
            {discover.iconWithText.map((item, index) => (
                <div className="discover-icon" key={index}>
                    <img src={item.icon} />
                    <div className="discover-icon-text">
                        {item.text}
                    </div>
                </div>))}
            </div>
        </motion.div>
    )
}