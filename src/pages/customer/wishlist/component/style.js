import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, PRIMARY } from '@theme/colors';
import {
    CreatePadding, FlexRow, CenterAbsolute, FlexColumn,
} from '@theme/mixins';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        position: 'relative',
    },
    content: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 70, 0),
    },
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    pageTitle: {
        fontWeight: 700,
        textAlign: 'center',
        color: PRIMARY,
        textTransform: 'uppercase',
        position: 'absolute',
        left: '50px',
        right: '50px',
    },
    wishlistWrapper: {
        // paddingTop: "50px"
    },
    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        left: 0,
        ...CenterAbsolute,
        background: 'rgba(255,255,255,0.7)',
        ...CreatePadding(20, 20, 20, 20),
        textAlign: 'center',
    },
}));

export default useStyles;