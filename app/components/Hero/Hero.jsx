import clsx from 'clsx';
import {Button, Link} from '~/components';

/**
 * Hero component that renders metafields attached to collection resources
 **/

export function Hero({ data }) {

  return (
      <section
        className={clsx(
          'w-full hero'
        )}>
          <div className="hero-text">
            <div dangerouslySetInnerHTML={{ __html: data.rawHtml}}></div>
            
            {data?.cta && <Link
                to="/products/">
                <Button variant='primary' className="hero-shop-btn">
                {data.cta}
                </Button>
            </Link>}
            <Link
                    to={data.learnMoreBtnLink}>
                    <Button variant='inline' className="hero-learn-more-btn">
                        {data.learnMoreBtnText}
                    </Button>
            </Link>
            
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
