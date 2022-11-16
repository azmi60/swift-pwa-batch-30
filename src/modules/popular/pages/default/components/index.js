import GridList from '@common_gridlist';
import ProductItem from '@core_modules/catalog/plugins/ProductItem';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    box: {
        maxWidth: '1440px',
        width: '97%',
        margin: '0 auto',
    },
});

export default function Content({ t, data, storeConfig }) {
    const { products } = data;
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <h2>{t('popular:title')}</h2>
            <GridList
                data={products.items}
                ItemComponent={ProductItem}
                gridItemProps={{
                    xs: 6,
                    sm: 4,
                    md: storeConfig?.pwa?.drawer_filter_on_desktop_enable ? 3 : 2,
                }}
            />
        </Box>
    );
}
