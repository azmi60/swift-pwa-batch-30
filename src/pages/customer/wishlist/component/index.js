/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import { GraphCustomer } from '@services/graphql';
import Typography from '@Typography';
import Button from '@Button';
import Alert from '@material-ui/lab/Alert';
import { getCartId, setCartId } from '@helpers/cartId';
import { getCartIdUser } from '@services/graphql/schema/cart';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Router from 'next/router';
import useStyles from './style';
import Loaders from './Loader';
import Item from './Item';
import { addSimpleProductsToCart } from '../services/graphql';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const { token, t } = props;
    let wishlist = [];

    const [addToCart] = addSimpleProductsToCart(token);
    const [removeWishlist] = GraphCustomer.removeWishlist(token);
    const {
        data, loading, error, refetch,
    } = GraphCustomer.getCustomer(token);
    const cartUser = useQuery(getCartIdUser, {
        context: {
            headers: { Authorization: `Bearer ${token}` },
        },
        skip: token === '' || !token,
    });

    if (!data || loading || error) return <Loaders />;
    if (data) {
        wishlist = data.customer.wishlist.items.map(({ id, product }) => ({
            ...product,
            wishlistItemId: id,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url || '/assets/img/placeholder.png',
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const handleToCart = ({
        sku, url_key, wishlistItemId, __typename,
    }) => {
        if (__typename === 'ConfigurableProduct') {
            Router.push('/[...slug]', `/${url_key}`);
        } else {
            window.backdropLoader(true);
            if (cartId === '' || !cartId) {
                const cartToken = cartUser.data.customerCart.id || '';
                cartId = cartToken;
                setCartId(cartToken);
            }
            addToCart({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(1),
                },
            })
                .then(() => {
                    removeWishlist({
                        variables: {
                            wishlistItemId,
                        },
                    }).then(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'success',
                            text: t('wishlist:successAddCart'),
                        });
                        refetch();
                    });
                })
                .catch(async (e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('wishlist:failedAddCart'),
                    });
                });
        }
    };

    const handleRemove = ({ wishlistItemId }) => {
        window.backdropLoader(true);
        removeWishlist({
            variables: {
                wishlistItemId,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('wishlist:removeFailed'),
                });
            });
    };

    const handleAddAlltoBag = async () => {
        window.backdropLoader(true);
        let totalSucces = 0;
        let errorCart = [false, ''];
        if (cartId === '' || !cartId) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
        await wishlist.map(async (item) => {
            addToCart({
                variables: {
                    cartId,
                    sku: item.sku,
                    qty: parseFloat(1),
                },
            })
                .then(async () => {
                    totalSucces += 1;
                    removeWishlist({
                        variables: {
                            wishlistItemId: item.wishlistItemId,
                        },
                    });
                })
                .catch((e) => {
                    errorCart = [true, e.message.split(':')[1]];
                });
        });
        setTimeout(async () => {
            refetch();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: errorCart[0]
                    ? totalSucces > 0
                        // eslint-disable-next-line max-len
                        ? `${t('wishlist:addPartToBagSuccess').split('$'[0])} ${totalSucces} ${t('wishlist:addPartToBagSuccess').split('$'[1])}`
                        : errorCart[1] || t('product:failedAddCart')
                    : t('wishlist:addAllToBagSuccess'),
                variant: errorCart[0] ? 'error' : 'success',
            });
        }, 3000);
    };
    return (
        <div className={styles.root}>
            {wishlist.length === 0 && (
                <Alert className="m-15" severity="warning">
                    {t('wishlist:notFound')}
                </Alert>
            )}
            <div className={styles.content}>
                {wishlist.map((item, index) => (
                    <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                ))}
            </div>
            <div className={styles.footer}>
                <Button onClick={handleAddAlltoBag} disabled={loading || wishlist.length === 0} fullWidth>
                    <Typography variant="title" type="regular" letter="capitalize" color="white">
                        {t('wishlist:addAllToBag')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;
