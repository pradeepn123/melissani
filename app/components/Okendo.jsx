import { useEffect, useRef } from 'react';

const OkendoStarRating = (props) => {
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
    <div ref={widgetContainer} data-oke-star-rating data-oke-reviews-product-id={`shopify-${props.productId}`}></div>
  );
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
