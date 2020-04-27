import Banner from '@components/Slider/Banner';
import Carousel from '@components/Slider/Carousel';
import SpanCategory from '@components/SpanCategory';
import { Fragment } from 'react';
import Link from 'next/link';
import { Skeleton } from '@material-ui/lab';
import gqlService from './service/graphql';
import useStyles from './style';

const BannerSlider = ({ storeConfig }) => {
    const styles = useStyles();
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    const { loading, data, error } = gqlService.getBannerSlider();

    if (loading) {
        return (
            <div className={styles.skeletonWrapper}>
                <Skeleton className={styles.skeleton} variant="rect" width="30%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="80%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="45%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="100%" height={250} animation="wave" />
            </div>
        );
    }
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    const bannerImages = data.getHomepageSlider.images.map((image) => ({
        imageUrl: image.mobile_image_url || image.image_url,
        link: '/ChangeUrl',
    }));

    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                </div>
                {bannerImages && bannerImages.length && (
                    <Banner data={bannerImages} height="95vh" />
                )}
            </div>
        </>
    );
};

const FeaturedProducts = () => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getFeaturedProducts(
        { url_key: 'homepage-featured-products' },
    );

    if (loading) {
        return (
            <div className={styles.skeletonWrapper}>
                <Skeleton className={styles.skeleton} variant="rect" width="50%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="95%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="100%" height={125} animation="wave" />
            </div>
        );
    }
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            {data.categoryList[0].children.map((category, i) => {
                const products = category.products.items.map((product) => ({
                    ...product,
                    name: product.name,
                    url: product.url_key,
                    imageSrc: product.image.url,
                    price: product.price_range.minimum_price.regular_price.value,
                }));
                return (
                    <Fragment key={i}>
                        {category.image_path && (
                            <Link href="[...slug]" as={category.url_path}>
                                <img src={category.image_path} alt={category.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </Link>
                        )}
                        <div className={styles.slider}>
                            <Carousel data={products} />
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
};

const CategoryList = ({ storeConfig }) => {
    const styles = useStyles();
    const { loading, data, error } = gqlService.getCategoryList(
        { url_key: 'homepage-featured-categories' },
    );

    if (loading) {
        return (
            <div className={styles.skeletonWrapper}>
                <Skeleton className={styles.skeleton} variant="rect" width="80%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="60%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="100%" height={200} animation="wave" />
            </div>
        );
    }
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            {data.categoryList[0].children.map((category, i) => (
                <div className={styles.slider} key={i}>
                    <SpanCategory
                        storeConfig={storeConfig}
                        imageSrc={category.image_path}
                        name={category.name}
                        description={category.description}
                        url={category.url_path}
                    />
                </div>
            ))}
        </>
    );
};

const HomePage = ({ storeConfig }) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <BannerSlider storeConfig={storeConfig} />
            <FeaturedProducts storeConfig={storeConfig} />
            <CategoryList storeConfig={storeConfig} />
        </div>
    );
};

export default HomePage;
