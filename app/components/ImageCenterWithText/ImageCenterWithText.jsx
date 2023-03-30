import { motion } from 'framer-motion';
import {Button, Link} from '~/components';

export function ImageCenterWithText({ installation, installationHeadingClassName, installationParaClassName }) {
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
            <div className="desktop-convenience-section w-full">
                <img src={installation.desktopImg} />
                <div className="hero-text">
                    <div dangerouslySetInnerHTML={{ __html: installation.rawHtml}}></div>
                    {installation?.cta && <Link to={installation.subscribeBtnLink}>
                        <Button variant='primary' className="font-medium">
                            {installation.cta}
                        </Button>
                    </Link>}
                    {installation?.learnMoreBtnText && <Link to={installation.learnMoreBtnLink}>
                        <Button variant='inline' className="font-medium mx-10 fs-17 hero-learn-more-btn">
                            {installation.learnMoreBtnText}
                        </Button>
                    </Link>}
                </div>
            </div>
            <div className="relative mobile-convenience-section">
                <img className="relative top-0 -left-0 w-full" src={installation.img} />
                <h2
                    className={`md:absolute text-black font-bold sm:text-2xl lg:text-4xl xl:text-5xl top-1/2 lg:max-w-sm md:p-3 sm:text-center sm:p-3 lg:pt-0 ${installationHeadingClassName}`}>
                    {installation.header}
                </h2>
                <p
                    className={`md:absolute text-black font-normal sm:text-base xl:text-2xl lg:text-base top-1/2 left-1/2 lg:max-w-xs xl:max-w-sm sm:p-5 sm:pt-0 ${installationParaClassName}`}>
                    {installation.paragraph}
                </p>
            </div>
        </motion.section>
    )
}
