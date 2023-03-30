import { useEffect, useRef, useState } from 'react';

const OkendoStarRating = (props) => {
  const widgetContainer = useRef(null);
  const [showWriteReview, setShowWriteReview] = useState(false)

  const initialiseReviewsWidget = () => {
    window.okeWidgetApi.initWidget(widgetContainer.current);
  }

  useEffect(() => {
    if (window.okeWidgetApi) {
      initialiseReviewsWidget();
    }
    else {
      window.addEventListener('oke-script-loaded', initialiseReviewsWidget);
    }
  }, []);

  useEffect(() => {
    console.log(widgetContainer?.current.innerHTML)
    if (widgetContainer?.current?.querySelector(".oke-is-clickable")) {
      setShowWriteReview(true)
    }
    console.log()
  }, [])

  return <div className="okendo-star-rating-wraper">
    <div
      ref={widgetContainer}
      data-oke-star-rating
      data-oke-reviews-product-id={`shopify-${props.productId}`}
    ></div>
    {showWriteReview && <a
        href={`https://okendo.reviews/?subscriberId=a0ca6b07-0ad6-4495-9f6b-5a1ac98d0fe6&productId=shopify-${props.productId}&locale=en`}
        target="__blank"
      >
      Write a Review
    </a>}
  </div>
}

const OkendoReviewsWidget = (props) => {
  const widgetContainer = useRef(null);

  const initialiseReviewsWidget = () => {
    window.okeWidgetApi.initWidget(widgetContainer.current);
  }

  useEffect(() => {
    if (window.okeWidgetApi) {
      initialiseReviewsWidget();
    }
    else {
      window.addEventListener('oke-script-loaded', initialiseReviewsWidget);
    }
  }, []);

  return (
    <div ref={widgetContainer} data-oke-widget data-oke-reviews-product-id={`shopify-${props.productId}`}></div>
  );
}

export {
  OkendoStarRating,
  OkendoReviewsWidget
}
