export const MEDIA_FRAGMENT = `#graphql
  fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;


export const PRODUCT_CARD_FRAGMENT = `#graphql
  ${MEDIA_FRAGMENT}
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    media(first: 20) {
      nodes {
        ...Media
      }
    }
    productType
    tags
    requiresSellingPlan
    sellingPlanGroups(first: 1) {
      edges {
        node {
          name
          options {
            name
            values
          }
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
                description
                recurringDeliveries
              }
            }
          }
        }
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
    metafields(
      identifiers: [
        { namespace: "product", key: "product_details" }
      ]
    ) {
      value
      key
    }
  }
`;
