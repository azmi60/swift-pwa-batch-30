import dynamic from 'next/dynamic';
import Layout from '@layout';
import getPopularProducts from '@core_modules/popular/services/getPopularProducts';

const Content = dynamic(() => import('@core_modules/popular/pages/default/components'), { ssr: false });

const Core = (props) => {
    const { storeConfig } = props;
    const config = {
        title: storeConfig.default_title,
    };

    const { loading, data } = getPopularProducts();

    return (
        <Layout {...props} pageConfig={config}>
            {loading ? 'loading...' : <Content {...props} data={data} />}
        </Layout>
    );
};

export default Core;
