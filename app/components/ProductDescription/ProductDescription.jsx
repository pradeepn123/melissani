import {
  Money
} from '@shopify/hydrogen';

import {
  Heading,
  ProductForm
} from '~/components';


export function ProductDescription ({
    isSubscriptionProduct,
    title,
    selectedVariant,
    parsedProductDetails
}) {
    return <div>
        {isSubscriptionProduct ? <div>
            
        </div> : <div
            className="product-form-wrapper"
        >
            <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal product-title">
                    {title}
                </Heading>
                {selectedVariant && <div className="product-price font-tertiary">
                    <Money
                        withoutTrailingZeros
                        data={selectedVariant?.price}
                        as="span"
                    />
                </div>}
            </div>
            <ProductForm />

            <div className="grid gap-4 py-4">
                {parsedProductDetails?.productDescription && <div
                    className="desc-list"
                    dangerouslySetInnerHTML={{ __html: parsedProductDetails.productDescription}}
                ></div>}
            </div>
        </div>}
    </div>
}
