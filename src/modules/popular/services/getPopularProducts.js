import { useQuery, gql } from '@apollo/client';

const GET_POPULAR = gql`
    query GetProducts {
        products(search: "", sort: { relevance: DESC }) {
            total_count
            items {
                id
                name
                sku
                url_key
                review_count
                short_description {
                    html
                }
                price_range {
                    maximum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                    minimum_price {
                        regular_price {
                            value
                        }
                        final_price {
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
                price_tiers {
                    discount {
                        amount_off
                        percent_off
                    }
                    final_price {
                        currency
                        value
                    }
                    quantity
                }
                small_image {
                    label
                    url
                }
            }
        }
    }
`;

export default function getPopularProducts() {
    return useQuery(GET_POPULAR);
}
