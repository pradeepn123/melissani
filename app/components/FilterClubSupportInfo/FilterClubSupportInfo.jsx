import { motion } from 'framer-motion';

export function FilterClubSupportInfo({filterclubsupportinfo}) {
    return (
        <motion.section
            initial={{ opacity: 0, transform: "translateY(60px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            animate="visible"
            transition={{
            ease: "easeInOut",
            duration: 0.8,
                x: { duration: 1 }
            }}
            exit={{ opacity: 0, transform: "translateY(60px)" }}
        >
            <div className="filter_club_support_info">
                <div className="flex flex-col-reverse md:flex-row">
                    {(filterclubsupportinfo?.filterclubsupportinfo || []).map((info, index) => (
                        <div className={`filter_club_support_info_bg md:w-6/12 ${index % 2 == 0 ? 'left_background' : 'right_background'}`} key={`support-${index}`}>
                            <div className="support_icon">
                                <img src={info.icon} alt="" />
                            </div>
                            <div className="support_info">
                                <h2>{info.heading}</h2>
                                <p>{info.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
