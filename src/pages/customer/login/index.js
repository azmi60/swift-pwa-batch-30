import Content from "./component";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("customer:login:pageTitle"),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle : t("customer:login:pageTitle") ,
        headerBackIcon :'close',
        bottomNav: false
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
