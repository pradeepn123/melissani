import Flickity from 'react-flickity-component'

export function ImageCarousel({ data, className, boxContents }) {
    return (
        <>
            <section className={`image-carousel md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-1 ${className}`}>
                {boxContents &&
                <div className="box-content-section">
                    <h2 className="box-content-heading">
                        {boxContents.title}
                    </h2>
                    <div className="box-contents">
                        {boxContents.content.map((contentItem, contentIndex) =>
                            <div className="box-content" key={contentIndex}>
                                <p className="content-text">
                                    {contentItem.contentText}
                                </p>
                                {contentIndex == 0 && <div className="vertical-line"></div>}
                                <img src={contentItem.contentImg} className="content-image"/>
                            </div>
                        )}
                    </div>
                    
                    <Flickity
                        className="box-content-flickity"
                        prevNextButtons="false"
                        groupCells="100%"
                        >
                        {boxContents.content.map((contentItem, contentIndex) =>
                            <div className="slider" key={contentIndex}>
                                <p className="content-text">
                                    {contentItem.contentText}
                                </p>
                                <img src={contentItem.contentImg} />
                            </div>
                        )}
                    </Flickity>
                </div>}
                <Flickity
                    pageDots="true"
                    prevNextButtons="true"
                    >
                    {data && data.map((item, index) =>
                        <div className="slider" key={index}>
                            <img src={item.image.url} />
                        </div>
                    )}
                </Flickity>
            </section>
        </>
    )
}