/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import SwitcherLanguage from '@common_language';
import SwitcherCurrency from '@common_currency';
import config from '@config';
import { makeStyles } from '@material-ui/core/styles';

const useCustomStyles = makeStyles({
    ul: {
        display: 'flex',
        '& > li': {
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid #ccc',
        },
    },
});

const ViewTop = (props) => {
    const {
        isLogin, t, data, handleLogout, storeConfig,
    } = props;
    const { modules } = config;

    const customStyles = useCustomStyles();

    return (
        <ul className={customStyles.ul}>
            <li>
                {!isLogin ? (
                    t('common:header:welcome')
                ) : (
                    <>
                        <Link href="/customer/account">
                            <a>
                                {data.customer
                                    ? `${t('common:header:hi').replace('$', `${data.customer.firstname} ${data.customer.lastname}`)}`
                                    : null}
                            </a>
                        </Link>
                        <ul>
                            <li>
                                <Link href="/customer/account">
                                    <a>{t('common:menu:myaccount')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist">
                                    <a>
                                        {t('common:menu:mywishlist')}
                                        {' '}
                                        (
                                        {data.wishlist ? data.wishlist.items.length : 0}
                                        {' '}
                                        items )
                                        {' '}
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={handleLogout}>
                                    {t('common:menu:signout')}
                                </a>
                            </li>
                        </ul>
                    </>
                )}
            </li>
            {modules.confirmpayment.enabled ? (
                <li>
                    <Link href="/confirmpayment">
                        <a>{t('common:menu:confirmpayment')}</a>
                    </Link>
                </li>
            ) : null}
            {modules.trackingorder.enabled ? (
                <li>
                    <Link href="/sales/order/track">
                        <a>{t('common:menu:trackingorder')}</a>
                    </Link>
                </li>
            ) : null}
            {!isLogin ? (
                <li>
                    <Link href="/customer/account/login">
                        <a id="header-menu-btnsign">{t('common:menu:sign')}</a>
                    </Link>
                    <span style={{ paddingRight: '0.25rem' }} />
                    {t('common:menu:or')}
                    <span style={{ paddingRight: '0.25rem' }} />
                    <Link href="/customer/account/create">
                        <a id="header-menu-btnregister">{t('common:menu:register')}</a>
                    </Link>
                    {' '}
                </li>
            ) : null}
            <li>
                <SwitcherLanguage {...props} />
            </li>
            <li>
                <SwitcherCurrency {...props} />
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        text-transform: uppercase;
                    }

                    li {
                        padding: 5px 10px;
                        position: relative;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        padding: 5px 10px;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                    }
                    ul ul li {
                        display: block;
                    }

                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a {
                        color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.primary_color} !important;
                        text-decoration: none;
                    }

                    a:hover {
                        border-bottom: 1px dashed #fff;
                        color: #b9acac;
                    }
                `}
            </style>
        </ul>
    );
};
export default ViewTop;
