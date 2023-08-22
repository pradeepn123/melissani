import { motion } from 'framer-motion';

export function ContaminantTextSection({ data }) {
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
        className="flex-auto w-full py-8 px-6 md:pl-6 xl:w-6/12 right_text_block">
            <h2 className='right_text_heading xl:pr-32 pb-6 leading-tight'>{data.heading}</h2>
            <p className='right_text_description xl:pr-32 leading-snug font-tertiary'>{data.description}</p>
            <ul className="grid grid-cols-2">
                {(data?.items || []).map((item, index) => (
                    <li key={`googbye-${index}`} className="flex py-4 text-black items-center gap-4 sm:gap-2 font-tertiary">
                        <img src={item.icon} alt="" width="60px" />
                        <p className="contaminants-list font-tertiary">{item.text}</p>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}