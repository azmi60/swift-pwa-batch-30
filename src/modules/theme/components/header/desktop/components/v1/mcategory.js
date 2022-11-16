/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { WHITE, PRIMARY } from '@theme_color';
import getPath from '@helper_getpath';
import { setResolver, getResolver } from '@helper_localstorage';
import classNames from 'classnames';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';

const MenuChildren = dynamic(() => import('@common_headerdesktop/components/v1/mcategoryChildren'), { ssr: false });

const Menu = (props) => {
    const { data, storeConfig } = props;
    const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];
    let menu = storeConfig.pwa.ves_menu_enable ? data?.vesMenu?.items : data?.categoryList[0].children;
    if (!menu) {
        menu = [];
    }
    const router = useRouter();
    const generateLink = (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        if (storeConfig.pwa.ves_menu_enable) {
            if (cat.link_type === 'category_link') {
                return ['/[...slug]', link];
            }
            const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
            if (cms) {
                return ['/[...slug]', link];
            }
            return [link, link];
        }
        return ['/[...slug]', link];
    };
    const handleClick = async (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        const urlResolver = getResolver();
        if (storeConfig.pwa.ves_menu_enable) {
            if (cat.link_type === 'category_link') {
                urlResolver[link] = {
                    type: 'CATEGORY',
                    id: cat.category_id,
                };
                await setResolver(urlResolver);
            } else {
                const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
                if (cms) {
                    urlResolver[link] = {
                        type: 'CMS_PAGE',
                    };
                    await setResolver(urlResolver);
                }
            }
        } else {
            urlResolver[link] = {
                type: 'CATEGORY',
                id: cat.id,
            };
            await setResolver(urlResolver);
        }
    };
    return (
        <div className="menu-wrapper" role="navigation">
            <ul className="nav" role="menubar" id="header-nav-menubar">
                {menu.map((val, idx) => {
                    if ((val.include_in_menu || storeConfig.pwa.ves_menu_enable) && val.name) {
                        const useStyles = makeStyles(() => ({
                            linkStyle: {
                                backgroundColor: `${val.bg_color} !important` || WHITE,
                                color: `${val.color} !important` || PRIMARY,
                                '&:hover': {
                                    backgroundColor: `${val.bg_hover_color} !important` || '#F3F3F3',
                                    color: `${val.hover_color} !important` || '#FF0000',
                                },
                            },
                            vesMegaMenu: {
                                backgroundColor: val.dropdown_bgcolor || WHITE,
                            },
                            animationDuration: {
                                animationDuration: `${val.dropdown_animation_time || '1'}s`,
                            },
                        }));

                        const styles = useStyles();

                        const linkEl = useRef(null);
                        const megaMenuRef = useRef(null);

                        let prefix = '';
                        if (val.icon_classes !== '') {
                            prefix = `<i class='${val.icon_classes}'></i>`;
                        }
                        if (val.show_icon === true && val.icon !== '') {
                            prefix += `<img src='${val.icon}' />`;
                        }

                        prefix += ` ${val.name} `;

                        if (val.caret !== '') {
                            prefix += `<i class='${val.caret}'></i>`;
                        }

                        return (
                            <li
                                key={idx}
                                role="menuitem"
                                id={`header-menuitem-${idx}`}
                                onMouseEnter={() => {
                                    if (megaMenuRef && val.dropdown_animation_in) {
                                        megaMenuRef.current.classList.add('animate__animated');
                                        megaMenuRef.current.classList.add(`animate__${val.dropdown_animation_in}`);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (megaMenuRef && val.dropdown_animation_in) {
                                        megaMenuRef.current.classList.remove('animate__animated');
                                        megaMenuRef.current.classList.remove(`animate__${val.dropdown_animation_in}`);
                                    }
                                }}
                            >
                                {val.link ? (
                                    <>
                                        <Link href={generateLink(val)[0]} as={generateLink(val)[1]}>
                                            <>
                                                {val.before_html && <div dangerouslySetInnerHTML={{ __html: val.before_html }} />}
                                                <a
                                                    href={val.link_type === 'category_link' && getPath(val.link)}
                                                    onClick={() => {
                                                        if (val.link_type === 'custom_link') {
                                                            router.push(val.link);
                                                        }
                                                    }}
                                                    ref={linkEl}
                                                    dangerouslySetInnerHTML={{
                                                        __html: prefix !== '' ? `${prefix}` : val.name,
                                                    }}
                                                    onMouseEnter={() => {
                                                        if (val.caret) {
                                                            linkEl.current.innerHTML = linkEl.current.innerHTML.replace(val.caret, val.hover_caret);
                                                        }
                                                    }}
                                                    onMouseLeave={() => {
                                                        if (val.hover_caret) {
                                                            linkEl.current.innerHTML = linkEl.current.innerHTML.replace(val.hover_caret, val.caret);
                                                        }
                                                    }}
                                                    className={styles.linkStyle}
                                                />
                                                {val.after_html && <div dangerouslySetInnerHTML={{ __html: val.after_html }} />}
                                            </>
                                        </Link>
                                        {val.children.length > 0 ? <div className="pointer" /> : null}
                                    </>
                                ) : (
                                    <a href="#" dangerouslySetInnerHTML={{ __html: val.name }} />
                                )}

                                {val.children.length > 0 ? (
                                    <div
                                        className={classNames('mega-menu', 'grid', styles.vesMegaMenu, styles.animationDuration)}
                                        aria-hidden="true"
                                        role="menu"
                                        ref={megaMenuRef}
                                    >
                                        {val.show_header && (
                                            <div className="header-html grid">
                                                <CmsRenderer content={val.header_html} />
                                            </div>
                                        )}
                                        <MenuChildren data={val.children} handleClick={handleClick} generateLink={generateLink} mainData={val} />
                                        {val.show_footer && (
                                            <div className="footer-html grid">
                                                <CmsRenderer content={val.footer_html} />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </li>
                        );
                    }
                    return null;
                })}
                <li>
                    <Link href="/popular"><a>Popular</a></Link>
                </li>
            </ul>
            <style jsx global>
                {`
                    .grid {
                        display: grid;
                    }
                    /* ves menu config */
                    .header-html, .footer-html {
                        color: black;
                    }
                    .header-html ul, .footer-html ul {
                        display: flex;
                        align-items: center;
                        height: 100%;
                    }
                    .header-html ul li, .footer-html ul li {
                        text-align: center;
                        flex-grow: 1;
                    }
                    .main-content {
                        display: flex;
                    }
                    /* mini reset */
                    .nav {
                        width: 100%;
                    }
                    .nav,
                    .nav a,
                    .nav form,
                    .nav input,
                    .nav li,
                    .nav ul {
                        border: none;
                        margin: 0;
                        padding: 0;
                    }
                    .nav a {
                        text-decoration: none;
                    }
                    .nav li {
                        list-style: none;
                    }

                    /* menu container */
                    .nav {
                        height: 49px;
                        cursor: default;
                        display: inline-block;
                        position: relative;
                        z-index: 500;
                    }

                    /* menu list */
                    .nav > li {
                        float: left;
                    }

                    /* menu links */
                    .nav > li > a {
                        display: block;
                        font-weight: bold;
                        line-height: 3.5;
                        padding: 0 1.25em;
                        transition: all 0.3s ease;
                        z-index: 510;
                        position: relative;
                    }
                    .nav > li:hover > a  + .pointer {
                        visibility: visible;
                    }
                    .pointer {
                        visibility: hidden;
                        margin: auto;
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 0 7.5px 13.0px 7.5px;
                        border-color: transparent transparent #212426 transparent;
                    }
                    .nav > li:first-child > a {
                        border-left: none;
                        border-radius: 3px 0 0 3px;
                    }

                    /* search form */
                    .nav-search > form {
                        border-left: 1px solid #4b4441;
                        height: 3.5em;
                        position: relative;
                        width: inherit;
                        z-index: 510;
                    }
                    .nav-search input[type='text'] {
                        background: #372f2b;
                        color: #999;
                        display: block;
                        float: left;
                        font-weight: bold;
                        line-height: 1.5;
                        padding: 1em 0;
                        text-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
                        transition: all 0.3s ease 1s;
                        width: 0;
                    }
                    .nav-search input[type='text']:focus {
                        color: #fcfcfc;
                    }
                    .nav-search input[type='text']:focus,
                    .nav-search:hover input[type='text'] {
                        padding: 1em 1.25em;
                        transition: all 0.3s ease 0.1s;
                        width: 6.875em;
                    }
                    .nav-search input[type='submit'] {
                        background: #372f2b url(../img/search-icon.png) no-repeat center center; /* IE8 fallback */
                        background: #372f2b url(../img/search-icon.svg) no-repeat center center;
                        border-radius: 0 3px 3px 0;
                        cursor: pointer;
                        display: block;
                        float: left;
                        height: 3.5em;
                        padding: 0 1.25em;
                        transition: all 0.3s ease;
                    }
                    .nav-search input:focus,
                    .nav-search input[type='submit']:hover {
                        background-color: #4b4441;
                    }

                    }
                    /* menu dropdown */
                    .mega-menu {
                        background: #fff;
                        border: 1px solid #ddd;
                        border-top: 5px solid #000000;
                        border-radius: 0 0 3px 3px;
                        opacity: 0;
                        position: absolute;
                        transition: all 0s ease 0s;
                        visibility: hidden;
                        width: 1000px;
                        left: 0;
                        margin-left: 0%;
                        min-height: 300px;
                        grid-template-columns: 1fr;

                    }
                    li:hover > .mega-menu {
                        opacity: 1;
                        overflow: visible;
                        visibility: visible;

                    }

                    @media (max-width: 1249px) {
                        .mega-menu {
                            background: #fff;
                            border: 1px solid #ddd;
                            border-top: 5px solid #000000;
                            border-radius: 0 0 3px 3px;
                            opacity: 0;
                            position: absolute;
                            transition: all 0s ease 0s;
                            visibility: hidden;
                            width: 1000px;
                            left: 0;
                            padding: auto;
                            margin: auto;
                            min-height: 300px; 
                        }
                        li:hover > .mega-menu {
                            opacity: 1;
                            overflow: visible;
                            visibility: visible;
                        }
                        .nav-column a {
                            color: #000000 !important;
                            display: block;
                            font-weight: bold;
                            line-height: 1.75;
                            margin: 0;
                            padding: 7px;
                        }
                    }
                    
                    @media (min-width: 1600px) {
                        .mega-menu {
                            width: 1200px;
                        }
                    }

                    /* menu content */
                    .nav-column a {
                        color: #000000 !important;
                        display: block;
                        font-weight: bold;
                        line-height: 1.75;
                        margin: 0;
                        padding: 7px;
                    }
                    .nav-column a:hover {
                        color: #000000 !important;
                    }

                    .nav-column .active {
                        color: #000000 !important;
                        background: #DCDCDC;
                    }
                    .nav-column h3 {
                        color: #372f2b;
                        font-size: 0.95em;
                        font-weight: bold;
                        line-height: 1.15;
                        margin: 1.25em 0 0.75em;
                        text-transform: uppercase;
                    }
                    .cat-label-v2 {
                        top: -6px;
                        position: absolute;
                        background: red;
                        z-index: 99;
                        left: 10px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </div>
    );
};

export default Menu;
