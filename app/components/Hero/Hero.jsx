import clsx from 'clsx';
import {Button, Link} from '~/components';

/**
 * Hero component that renders metafields attached to collection resources
 **/

export function Hero({ data, id }) {

  return (
    <section
      className={clsx(
        'w-full hero'
      )} id={id}>
        <div className="hero-text">
          <div dangerouslySetInnerHTML={{ __html: data.rawHtml}}></div>
          
          {data?.cta && <Link
            to="/products/">
            <Button variant='primary' className="hero-shop-btn font-medium">
            {data.cta}
            </Button>
          </Link>}
          {data?.learnMoreBtnText && <Link
            to={data.learnMoreBtnLink}>
            <Button variant='inline' className="hero-learn-more-btn font-medium">
              {data.learnMoreBtnText}
            </Button>
          </Link>}
          
        </div>
        <div className="hero-image-wrapper">
          <img src={data?.banner_image} className="hero-image"/>
        </div>
        <div className={"hero-mobile-image-wrapper"}>
          <img src={data?.mobile_banner_image} className="hero-image" />
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
            {data?.learnMoreBtnText && <>
              <Link
                to={data.learnMoreBtnLink}>
                <Button className="hero-learn-more-btn font-medium" variant='inline'>
                  {data.learnMoreBtnText}
                </Button>
              </Link>
            </>}
          </div>
        </div>
    </section>
  );
}
