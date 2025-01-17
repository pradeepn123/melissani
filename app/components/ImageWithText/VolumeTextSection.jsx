import { motion } from 'framer-motion';

export function VolumeTextSection({data, id}) {
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
            className="text-section" id="volume-control-section"
        >
            <h2 className="text-section-heading text-section-title">
                {data.title}
            </h2>
            <p className="text-section-description font-tertiary">
                {data.description}
            </p>
            
            <div className="text-section-icons" id={id && id}>
            {data.iconWithText.map((item, index) => (
                <div className="text-section-icon"  id={data.id && `${data.id}`} key={index}>
                    <img src={item.icon} />
                    { item.text && <div className="text-section-icon-text font-tertiary">
                        {item.text}
                </div> }
                </div>))}
            </div>
        </motion.div>
    )
}