import clsx from 'clsx';
import {Button, Link} from '~/components';

/**
 * Hero component that renders metafields attached to collection resources
 **/

export function Hero({
  metafields
}) {
  const data = metafields && JSON.parse(metafields.value)
  
  return (
      <section
        className={clsx(
          'w-full hero'
        )}>
          <div className="hero-text">
            {data?.heading && (
              <h1 className="hero-banner-title">
                {data.heading}
                <span className="hero-banner-subtitle">
                  {data.sub_heading}
                </span>
              </h1>
            )}
            {data?.cta && <Link
                to="/products/">
                <Button className="shop-btn">
                {data.cta}
                </Button>
            </Link>}
          </div>
          <div className="hero-image-wrapper">
            <img src={data?.banner_image} className="hero-image"/>
          </div>
          <div className="mobile-heading-wrapper">
              {data?.heading && (
              <h1 className="mobile-heading-text">
                {data.heading}
                <span className="mobile-heading-subtitle">
                  {data.sub_heading}
                </span>
              </h1>
            )}
              <div className="mobile-button-wrapper">
                {data?.cta && <>
                    <Link
                      to="/products/">
                      <Button className="shop-btn" variant="primary">
                        {data.cta}
                      </Button>
                    </Link>
                </>}
                {data?.cta && <>
                    <Link
                      to="/pages/melissani-club/">
                      <Button className="club-btn" variant="secondary">
                        {data.club_btn_text}
                      </Button>
                    </Link>
                </>}
              </div>
          </div>
      </section>
  );
}
