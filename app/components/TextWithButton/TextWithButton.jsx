import { motion } from 'framer-motion';

export function TextWithButton({textwithbutton}) {
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
            <div className="text_with_button_info">
                <div className="mx-auto">
                    <div className="text_with_button_info_inner">
                        <h2>{textwithbutton.heading}</h2>
                        <h3>{textwithbutton.subheading}</h3>
                        <a href={textwithbutton.button_url}>
                            <button className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]">{textwithbutton.button_label}</button>
                        </a>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
