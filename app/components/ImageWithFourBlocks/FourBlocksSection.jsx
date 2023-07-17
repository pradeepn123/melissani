import { motion } from 'framer-motion';

export function FourBlocksSection({ data }) {
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
        className="flex-auto w-full right_text_blocks">
            {data.blocks.map((blockItem, blockIndex) => (
                <div className="block-content" key={blockIndex}>
                    <img src={blockItem.blockIcon} className="block-icon" />
                    <div className="block-text pt-6 pb-3">
                        <h2 className='text_block_heading'>{blockItem.blockTitle}</h2>
                        <p className='text_block_description'>{blockItem.blockDescription}</p>
                    </div>
                    <ul className="grid grid-cols-1 block-points">
                        {(blockItem?.blockPoints || []).map((item, index) => (
                            <li key={`blockPoint-${index}`} className="flex items-center">
                                {item.blockPoint}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </motion.div>
    )
}