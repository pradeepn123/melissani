import {SingleProductCard, Section, MultipleProductsCard} from '~/components';

export function ProductSwimlane({...props}) {
  return (
    <Section className={props.className}>
      <div className={`swimlane hiddenScroll card-wrapper grid-cols-${props.count}`}>
        {props.products.map((products, index) => (<div key={index}>
          {products.length == 1 && <SingleProductCard
            product={products[0]}
            key={products[0].id}
            className="product-card-wrapper single-product-card-wrapper"
            showLabel={false}
            quickAdd={true}
            learnMore={true}
          />}

          {products.length > 1 && <MultipleProductsCard
            products={products}
            key={`product-${index}`}
            className="product-card-wrapper multiple-product-card-wrapper"
            showLabel={false}
            quickAdd={true}
            learnMore={true}
          />}
        </div>))}
      </div>
    </Section>
  );
}
