import { motion } from 'framer-motion';

export function AnnouncementBar({ announcementbar, id, animation }) {
    return ( <>
        {animation ? 
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
        className="w-full py-6 md:py-8 lg:py-12 px-6 md:px-8 lg:px-12 text-center announcementbar_main">
            <div dangerouslySetInnerHTML={{ __html: announcementbar.rawHtml}}></div>
        </motion.div> : <div className="w-full text-center announcementbar_main" id={id}>
        <div dangerouslySetInnerHTML={{ __html: announcementbar.rawHtml}}></div></div>}
        </>
    )
}