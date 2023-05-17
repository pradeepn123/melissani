import { motion } from 'framer-motion';
import Flickity from 'react-flickity-component';

export function ArticleCarousel({articles}){
    var flkty = null;
    return(
           <motion.section 
                className="article-carousel-wrapper"
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
                <h1 className="article-content-title">{articles && articles.heading}</h1>
                <div className="article-content-container">
                    
                    <Flickity
                        className="article-flickity-desktop"
                        flickityRef={c => flkty = c}
                        options={{
                            prevNextButtons: true,
                            pageDots: false,
                            cellAlign: 'left',
                            contain: true,
                            wrapAround: true
                        }}
                    >
                        {articles && articles.content.map((articleContent, index) => (
                            <div className="article-content-block" key={index}>
                                <img src={articleContent.articleLogo} alt="" />
                                <p>"{articleContent.articleContent}"</p>
                                <a className="read-article-link" href={articleContent.readArticleLink} target="_blank">Read Article</a>
                            </div>
                        ))}
                    </Flickity>
                    <Flickity
                        className="article-flickity-mobile"
                        flickityRef={c => flkty = c}
                        options={{
                            prevNextButtons: false,
                            pageDots: true,
                            cellAlign: 'left',
                            groupCells: '100%',
                            contain: true,
                            wrapAround: true
                        }}
                    >
                        {articles && articles.content.map((articleContent, index) => (
                            <div className="article-content-block" key={index}>
                                <img src={articleContent.articleLogo} alt="" />
                                <p>"{articleContent.articleContent}"</p>
                                <a href={articleContent.readArticleLink} target="_blank" className="read-article-link">Read Article</a>
                            </div>
                        ))}
                    </Flickity>    
                </div>
            </motion.section>
    )
}