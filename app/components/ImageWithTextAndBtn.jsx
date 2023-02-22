import { Button, Link } from '~/components';

export function ImageWithTextAndBtn({ data }) {

    return (
        <section>
            <div className="relative">
                <div className="relative">
                    <picture>
                        <source media="(min-width: 768px)" srcset={data.img} />
                        <img className="footer-banner-img top-0 -left-0 w-full" src={data.smallImg} />
                    </picture>
                </div>

                <div className="footer-banner-content absolute top-1/2 ">
                    <h2
                        className="footer-banner-header font-bold text-white md:max-w-xl mb-4">
                        {data.header}
                    </h2>
                    {data?.cta && <Link
                        to="/products/">
                        <Button className="footer-banner-button">
                            {data.cta}
                        </Button>
                    </Link>}
                </div>

            </div>
        </section>
    )
}