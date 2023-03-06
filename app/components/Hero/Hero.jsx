import clsx from 'clsx';
import {Button, Link} from '~/components';

/**
 * Hero component that renders metafields attached to collection resources
 **/

export function Hero({ data, purifier_hero_text_id }) {

  return (
      <section
        className={clsx(
          'w-full hero'
        )}>
          <div className="hero-text" id={`${purifier_hero_text_id}`}>
            <div dangerouslySetInnerHTML={{ __html: data.rawHtml}}></div>
            
            {data?.cta && <Link
                to="/products/">
                <Button variant='primary' className="hero-shop-btn font-medium">
                {data.cta}
                </Button>
            </Link>}
            <Link
                    to={data.learnMoreBtnLink}>
                    <Button variant='inline' className="hero-learn-more-btn font-medium">
                        {data.learnMoreBtnText}
                    </Button>
            </Link>
            
          </div>
          <div className="hero-image-wrapper">
            <img src={data?.banner_image} className="hero-image"/>
          </div>
          <div className="hero-mobile-image-wrapper">
            <img src={data?.mobile_banner_image} className="hero-image"/>
          </div>
          <div className="mobile-heading-wrapper">
              <div dangerouslySetInnerHTML={{ __html: data.rawHtml}}></div>
              <div className="mobile-button-wrapper">
                {data?.cta && <>
                    <Link
                      to="/products/">
                      <Button className="shop-btn font-medium" variant="primary">
                        {data.cta}
                      </Button>
                    </Link>
                </>}
                {data?.cta && <>
                    <Link
                      to="/pages/melissani-club/">
                      <Button className="club-btn font-medium" variant="secondary">
                        {data.club_btn_text}
                      </Button>
                    </Link>
                </>}
              </div>
          </div>
      </section>
  );
}
