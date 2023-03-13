import { Button, Link } from '~/components';

export function ProductHeader({ title, data }) {

    return (
        <>
        {data.map((dataItem, dataIndex) => 
        <section className="product-header" key={dataIndex}>
            <div className="product-name">
                <h1 className="product-title">
                    Buy {title}
                </h1>
                <div className="product-subtitle">
                    <p className="subtitle">{dataItem.productSubtitle}</p>
                    <Link to={dataItem.learnMoreBtnLink}>
                        <Button className="learn-more-btn" variant="secondary">
                            {dataItem.learnMoreBtnText}
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="product-key-features">
                <div className="key-features-inner">
                    {dataItem.keyFeatures.map((item, index) => (
                        <div className="key-feature" key={index}>
                            <span className="key-feature-icon">
                                <img src={item.iconImg} />
                            </span>
                            <span className="key-feature-text">
                                {item.iconText}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        )}
        </>
    )
}