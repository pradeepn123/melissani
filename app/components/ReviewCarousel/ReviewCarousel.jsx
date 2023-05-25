import { motion } from 'framer-motion';
import Flickity from 'react-flickity-component';

export function ReviewCarousel(review){
    let reviewsList = review.review.reviews;
    var flkty = null;
    return(
        <>
            <motion.section 
                className="review-carousel-wrapper"
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
                <h2 className="review-content-heading">Cheers to Health</h2>
                <div className="review-content-container">
                    <Flickity
                        className="review-flickity-desktop"
                        flickityRef={c => flkty = c}
                        options={{
                            prevNextButtons: true,
                            pageDots: false,
                            cellAlign: 'left',
                            contain: true,
                            wrapAround: false,
                            groupCells: 3
                        }}
                    >
                        {reviewsList && reviewsList.map((reviewContent, index) => {
                            if (reviewContent.rating > 3) {
                                return <div className="review-content-block" key={index}>
                                        <h3>{reviewContent.title}</h3>
                                        <div class="Stars" style={{"--rating": reviewContent.rating}}></div>
                                        <p className="review-text">{reviewContent.body}</p>
                                        <p className="reviewer-name">-{reviewContent.reviewer.displayName}</p>
                                </div>
                            }})
                        }
                    </Flickity>
                    <Flickity
                        className="review-flickity-mobile"
                        flickityRef={c => flkty = c}
                        options={{
                            prevNextButtons: false,
                            pageDots: true,
                            cellAlign: 'left',
                            contain: true,
                            wrapAround: false
                        }}
                    >
                        {reviewsList && reviewsList.map((reviewContent, index) => (
                            <div className="review-content-block" key={index}>
                                <h3>{reviewContent.title}</h3>
                                <div class="Stars" style={{"--rating": reviewContent.rating}}></div>
                                <p className="review-text">{reviewContent.body}</p>
                                <p className="reviewer-name">-{reviewContent.reviewer.displayName}</p>
                            </div>
                        ))}
                    </Flickity>    
                </div>
            </motion.section>
        </>
    )
}