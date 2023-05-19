export function KeyFeaturesCarousel({ features, className }) {
    return (
        <>
            <section className={`${className ? className + " product-header" : "product-header"}`}>
                <div className="product-key-features touch-auto">
                    <div className="key-features-inner">
                    {features.map((dataItem, dataIndex) =>
                        <div className="key-feature" key={dataIndex}>
                            <span className="key-feature-icon">
                                <img src={dataItem.iconImg} />
                            </span>
                            <span
                                className="key-feature-text"
                                dangerouslySetInnerHTML={{
                                    __html: dataItem.iconText
                                }}>
                            </span>
                        </div>
                    )}
                    </div>
                </div>
            </section>
        </>
    )
}