import { Button, Link } from '~/components';

export function SecondaryHero({ data }) {

    return (
        <section>
            <div className="relative">
                <div className="relative">
                    <picture>
                        <source media="(min-width: 768px)" srcset={data.img} />
                        <img className="secondary-hero-img top-0 -left-0 w-full" src={data.smallImg} />
                    </picture>
                </div>

                <div className="secondary-hero-content absolute top-1/2 ">
                    <h2
                        className="secondary-hero-header font-bold text-white md:max-w-xl mb-4">
                        {data.header}
                    </h2>
                    {data?.cta && <Link
                        to="/products/">
                        <Button className="secondary-hero-button">
                            {data.cta}
                        </Button>
                    </Link>}
                </div>

            </div>
        </section>
    )
}