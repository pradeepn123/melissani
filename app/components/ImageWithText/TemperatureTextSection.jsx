import { motion } from 'framer-motion';

export function TemperatureTextSection({data}) {
    return (
        <>
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
                className="text-section" id={data.id && data.id}
            >
                <div className="warrentyIcon_section md:hidden block">
                    <img src={data.warrenty_icon} alt="" />
                </div>
                <h2 className="text-section-heading text-section-title">
                    {data.title}
                </h2>
                {data.description && <p className="text-section-description font-tertiary">
                    {data.description}
                </p>}
                
                <div className="text-section-icons">
                {data.iconWithText.map((item, index) => (
                    <div className="text-section-icon" id="temp-section-icon" key={index}>
                        <img src={item.icon} />
                        { item.text && <div className="text-section-icon-text font-tertiary">
                            {item.text}
                        </div> }
                        { item.html_text && <div className="text-section-icon-text font-tertiary"
                            dangerouslySetInnerHTML={{ __html: item.html_text}}>
                        </div> }
                    </div>))}
                </div>
            </motion.div>
            <div className="warrentyIcon_section hidden md:block">
                <img src={data.warrenty_icon} alt="" />
            </div>
        </>
    )
}