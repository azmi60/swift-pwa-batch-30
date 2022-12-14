/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import TagManager from 'react-gtm-module';
import { getProduct, getProductAgragations } from '@core_modules/catalog/services/graphql';
import { getSessionStorage, setSessionStorage } from '@helpers/sessionstorage';
import * as Schema from '@core_modules/catalog/services/graphql/productSchema';
import getCategoryFromAgregations from '@core_modules/catalog/helpers/getCategory';
import generateConfig from '@core_modules/catalog/helpers/generateConfig';
import Content from '@plugin_productlist/components';

const Product = (props) => {
    const {
        catId = 0,
        catalog_search_engine,
        customFilter,
        url_path,
        defaultSort,
        t,
        categoryPath,
        ErrorMessage,
        storeConfig,
        query,
        path,
        availableFilter,
        token,
        isLogin,
        ...other
    } = props;
    const router = useRouter();
    const [products, setProducts] = React.useState({
        total_count: 0,
        items: [],
    });

    const [loadmore, setLoadmore] = React.useState(false);
    const [filterSaved, setFilterSaved] = React.useState(false);
    const elastic = catalog_search_engine === 'elasticsuite';
    let config = {
        customFilter: false,
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
        ...storeConfig.pwa,
    };

    // set default sort when there is no sort in query
    if (defaultSort && !query.sort) {
        query.sort = JSON.stringify(defaultSort);
    }

    const setFiltervalue = (v) => {
        setFilterSaved(true);
        let queryParams = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(v).map((key) => {
            if (key === 'selectedFilter') {
                // eslint-disable-next-line no-restricted-syntax
                for (const idx in v.selectedFilter) {
                    if (v.selectedFilter[idx] !== '' && !v[idx]) {
                        queryParams += `${queryParams !== '' ? '&' : ''}${idx}=${v.selectedFilter[idx]}`;
                    }
                }
            } else if (v[key] !== 0 && v[key] !== '') {
                queryParams += `${queryParams !== '' ? '&' : ''}${key}=${v[key]}`;
            }
        });
        Router.push(`/${url_path || '[...slug]'}`, encodeURI(`${path}${queryParams ? `?${queryParams}` : ''}`));
    };
    if (catId !== 0) {
        config.filter.push({
            type: 'category_id',
            value: catId,
        });
    }

    config = generateConfig(query, config, elastic, availableFilter);
    let context = (isLogin && isLogin === 1) || (config.sort && config.sort.key === 'random') ? { request: 'internal' } : {};
    if (token && token !== '') {
        context = {
            ...context,
            headers: {
                authorization: token,
            },
        };
    }

    const { loading, data, fetchMore } = getProduct(
        config,
        {
            variables: {
                pageSize: parseInt(storeConfig?.pwa?.page_size, 0) || 10,
                currentPage: 1,
            },
            context,
            fetchPolicy: config.sort && config.sort.key === 'random' && filterSaved ? 'cache-and-network' : 'cache-first',
        },
        router,
    );
    // generate filter if donthave custom filter
    const aggregations = [];
    if (!customFilter && !loading && products.aggregations) {
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < products.aggregations.length; index++) {
            aggregations.push({
                field: products.aggregations[index].attribute_code,
                label: products.aggregations[index].label,
                value: products.aggregations[index].options,
            });
        }
    }
    const category = getCategoryFromAgregations(aggregations);

    // eslint-disable-next-line no-shadow
    const renderEmptyMessage = (count, loading) => {
        if (count || loading) {
            return null;
        }
        return <ErrorMessage variant="warning" text={t('catalog:emptyProductSearchResult')} open />;
    };

    const handleLoadMore = async () => {
        setFilterSaved(false);
        const pageSize = storeConfig.pwa ? parseInt(storeConfig?.pwa?.page_size, 0) : 10;
        const pageTemp = (data.products.items.length / (parseInt(storeConfig?.pwa?.page_size, 0) || 10) + 1);
        try {
            if (fetchMore && typeof fetchMore !== 'undefined') {
                setLoadmore(true);
                fetchMore({
                    query: Schema.getProduct({ ...config, currentPage: pageTemp }, router),
                    variables: {
                        pageSize,
                        currentPage: pageTemp,
                    },
                    context,
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        setLoadmore(false);
                        return {
                            products: {
                                ...fetchMoreResult.products,
                                items: [...previousResult.products.items, ...fetchMoreResult.products.items],
                            },
                        };
                    },
                });
            }
        } catch (error) {
            setLoadmore(false);
        }
    };

    React.useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
            // GTM UA dataLayer
            const tagManagerArgs = {
                dataLayer: {
                    event: 'impression',
                    eventCategory: 'Ecommerce',
                    eventAction: 'Impression',
                    eventLabel: categoryPath ? `category ${categoryPath}` : '',
                    ecommerce: {
                        currencyCode: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                        impressions: data.products.items.map((product, index) => {
                            let categoryProduct = '';
                            // eslint-disable-next-line no-unused-expressions
                            product.categories.length > 0
                                && product.categories.map(({ name }, indx) => {
                                    if (indx > 0) categoryProduct += `/${name}`;
                                    else categoryProduct += name;
                                });
                            return {
                                name: product.name,
                                id: product.sku,
                                category: categoryProduct,
                                price: product.price_range.minimum_price.regular_price.value,
                                list: categoryProduct,
                                position: index,
                            };
                        }),
                    },
                },
            };
            // GA 4 dataLayer
            const tagManagerArgsGA4 = {
                dataLayer: {
                    event: 'view_item_list',
                    pageName: categoryPath,
                    pageType: 'category',
                    ecommerce: {
                        items: data.products.items.map((product, index) => {
                            let categoryProduct = '';
                            let categoryOne = '';
                            let categoryTwo = '';
                            // eslint-disable-next-line no-unused-expressions
                            product.categories.length > 0 && (
                                categoryOne = product.categories[0].name,
                                categoryTwo = product.categories[1]?.name,
                                product.categories.map(({ name }, indx) => {
                                    if (indx > 0) categoryProduct += `/${name}`;
                                    else categoryProduct += name;
                                })
                            );
                            return {
                                item_name: product.name,
                                item_id: product.sku,
                                price: product.price_range.minimum_price.regular_price.value,
                                item_category: categoryOne,
                                item_category_2: categoryTwo,
                                item_list_name: categoryProduct,
                                index,
                                currency: product.price_range.minimum_price.regular_price.currency,
                            };
                        }),
                    },
                },
            };
            TagManager.dataLayer(tagManagerArgs);
            TagManager.dataLayer(tagManagerArgsGA4);
        }
    }, [data]);

    React.useEffect(() => {
        const handleRouteChange = () => {
            if (router.pathname === '/catalogsearch/result') {
                window.history.scrollRestoration = 'manual';
                const sessionStorageItems = ['lastCatalogsOffset', 'lastCatalogsVisited', 'lastProductsVisited'];
                const lastCatalogsOffset = getSessionStorage('lastCatalogsOffset') || [];
                const prevUrl = sessionStorage.getItem('prevUrl');
                const lastProductsVisited = getSessionStorage('lastProductsVisited') || [];
                const restoreCatalogPosition = getSessionStorage('restoreCatalogPosition');

                if (prevUrl === lastProductsVisited[0] && restoreCatalogPosition && lastCatalogsOffset[0] !== 0) {
                    window.scrollTo({
                        top: lastCatalogsOffset[0],
                    });
                    sessionStorageItems.forEach((item) => {
                        const itemData = getSessionStorage(item);
                        setSessionStorage(item, itemData.slice(1, itemData.length));
                    });
                    sessionStorage.removeItem('restoreCatalogPosition');
                }
            }
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    React.useEffect(() => {
        if (router.pathname !== '/catalogsearch/result') {
            const sessionStorageItems = ['lastCatalogsOffset', 'lastCatalogsVisited', 'lastProductsVisited'];
            window.history.scrollRestoration = 'manual';
            const prevUrl = sessionStorage.getItem('prevUrl');
            const lastCatalogsOffset = getSessionStorage('lastCatalogsOffset') || [];
            const lastProductsVisited = getSessionStorage('lastProductsVisited') || [];
            const restoreCatalogPosition = getSessionStorage('restoreCatalogPosition');
            if (prevUrl === lastProductsVisited[0] && restoreCatalogPosition && lastCatalogsOffset[0] !== 0) {
                setTimeout(() => {
                    window.scrollTo({
                        top: lastCatalogsOffset[0],
                    });
                }, 800);
                sessionStorageItems.forEach((item) => {
                    const itemData = getSessionStorage(item);
                    setSessionStorage(item, itemData.slice(1, itemData.length));
                });
                sessionStorage.removeItem('restoreCatalogPosition');
            }
        }
    }, [data, !loading]);

    const contentProps = {
        loadmore,
        loading,
        t,
        query,
        customFilter,
        elastic,
        aggregations,
        setFiltervalue,
        category,
        defaultSort,
        config,
        products,
        categoryPath,
        handleLoadMore,
        renderEmptyMessage,
        storeConfig,
    };

    return <Content {...contentProps} {...other} />;
};

Product.propTypes = {
    // eslint-disable-next-line react/require-default-props
    catId: PropTypes.number,
    // eslint-disable-next-line react/require-default-props
    catalog_search_engine: PropTypes.string,
};

const ProductWrapper = (props) => {
    const router = useRouter();
    const { path, query } = getQueryFromPath(router);

    let availableFilter = [];
    let loadingAgg;
    if (Object.keys(query).length > 0) {
        const { data: agg, loading } = getProductAgragations();
        loadingAgg = loading;
        availableFilter = agg && agg.products ? agg.products.aggregations : [];
    }
    if (loadingAgg) {
        return <span />;
    }
    return <Product {...props} availableFilter={availableFilter} path={path} query={query} />;
};

export default ProductWrapper;
