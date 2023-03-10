import { Button, Link } from '~/components';

export function ProductHeader({ title, data }) {

    return (
        <section className="product-header">
            <div className="product-name">
                <h1 className="product-title">
                    Buy {title}
                </h1>
                <div className="product-subtitle">
                    <p className="subtitle">{data.productSubtitle}</p>
                    <Link to={data.learnMoreBtnLink}>
                        <Button className="learn-more-btn" variant="secondary">
                            {data.learnMoreBtnText}
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="product-key-features">
                {data.keyFeatures.map((item, index) => (
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
        </section>
    )
}