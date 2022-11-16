/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */
const useMagentoCommerce = false; // setup uses magento commerce or community
const storeCode = ''; // fill it with any store code when the magento is setup with multiple stores. leave it empty to use default store.
const assetsVersion = '1.0.6';

const HOST = {
    local: 'http://localhost:3000',
    dev: 'https://swiftpwa.testingnow.me',
    stage: 'https://getswift-pwa.gcp-staging.testingnow.me',
    prod: 'https://pwa.getswift.asia',
};

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    local: 'https://b2cdemo.getswift.asia/graphql',
    dev: 'https://swift-sprint.testingnow.me/graphql',
    stage: 'https://b2cdemonew.gcp-staging.testingnow.me/graphql',
    prod: 'https://b2cdemo.getswift.asia/graphql',
};

/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

/* Password Validator */
const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

/* Translation */
const translation = {
    defaultLanguage: 'en', // just change to your default language
    languages: ['en', 'id'], // array code language what you want
    // language label code
    languagesLabel: {
        en: 'English',
        id: 'Indonesia',
    },
};

/* Google Tag Manager
 * before enable this configuration, firstly you need to import the gtm tags json.
 * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
 * adjust the tag name if you want before import into GTM dashboard setting.
 * as reference you can find sample gtm tags in folder "sample/gtm" folder
 * NOTE: this GTM functionality includes connecting to GA via GTM tag.
 */
const GTM = {
    enable: false,
    gtmId: {
        local: '', // sample: GTM-N76V8KQ
        dev: '', // sample: GTM-N76V8KQ
        stage: '', // sample: GTM-N76V8KQ
        prod: '', // sample: GTM-N76V8KQ
    },
};

// error management monitoring
const sentry = {
    enabled: false,
    enableMode: 'production',
    dsn: {
        local: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        dev: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        stage: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
        prod: 'https://c60fbed461fd49da9455730ba70da8a6@o484453.ingest.sentry.io/5537614',
    },
};

const rollbar = {
    enabled: false,
    config: {
        accessToken: '76876f52664341b4a1981c4618723bda',
        captureUncaught: true,
        captureUnhandledRejections: true,
    },
};

/* Dashboard */
// identifiers for cmsBlocks in contact page
const cmsSocialMediaLinkIdentifiers = 'pwa_socmed_links';

/* Social media link */
// social media link in dashboard
const enableSocialMediaLink = true;

/* Loader */
const loaderImage = '/assets/img/loader.svg';

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCookies = 6;
const storeConfigNameCookie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';
const nameCheckoutCookie = 'ccdt';
const nameCheckoutState = 'ncs';
const nameGlobalCookie = 'spwa';
const nameToken = 'sk';
const expiredToken = 60 * 60 * 1000;
const expiredDefault = 365;
const localResolverKey = 'resolver';

const keyLocalStorage = {
    home: 'homePageConfig',
};

const features = {
    useCustomStyle: true,
    ssrCache: false,
    magezon: {
        instagramFeed: {
            // eslint-disable-next-line max-len
            urlGraph: 'https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=',
        },
        keyStorage: 'mgz_ig_token',
    },
    crm: {
        enabled: false,
        graphqlEndpoint: {
            local: 'http://swiftcrm.testingnow.me/graphql',
            dev: 'http://swiftcrm.testingnow.me/graphql',
            stage: 'http://swiftcrm.testingnow.me/graphql',
            prod: 'http://swiftcrm.testingnow.me/graphql',
        },
    },
    // masuk module -> pindah jika module sudah siap
    productAvailableToCart: {
        SimpleProduct: true,
        ConfigurableProduct: true,
        VirtualProduct: true,
        GroupedProduct: true,
        BundleProduct: true,
        DownloadableProduct: false,
        AwGiftCardProduct: true,
    },
    firebase: {
        config: {
            apiKey: 'AIzaSyCt9ks21BjiE9qirv-8xOEcUnUnH6viobw', // sample: AIzaSyCt9ks21BjiE9qirv-8xOEcUnUnH6viobw
            authDomain: 'swift-pwa-dev.firebaseapp.com', // sample: swift-pwa-dev.firebaseapp.com
            databaseURL: 'https://swiftpwa-firebase.firebaseio.com', // sample: https://swiftpwa-firebase.firebaseio.com
            projectId: 'swift-pwa-dev', // sample: swift-pwa-dev
            storageBucket: 'swift-pwa-dev.appspot.com', // sample: swift-pwa-dev.appspot.com
            messagingSenderId: '1083571104838', // sample: 1083571104838
            appId: '1:1083571104838:web:4f06ca5a60b1c1a9efee47', // sample: 1:1083571104838:web:4f06ca5a60b1c1a9efee47
            measurementId: 'G-HBHPY22H0H', // sample: G-HBHPY22H0H
        },
        pushNotification: {
            enabled: true,
            config: {
                // key from cloud messaging sertificat web push
                pairKey: 'BJ2IqpfQQGrckDUAI7TaX8r0_v6aykBSIIEpZUqhlkzZI2e7WVZk9ZB4xOiWBqTbVo6wk44gnpRLAJDemB66zAU', // sample: BJ2IqpfQQGrckDUAI7TaX8r0_v6aykBSIIEpZUqhlkzZI2e7WVZk9ZB4xOiWBqTbVo6wk44gnpRLAJDemB66zAU
            },
        },
    },
    thumbor: {
        enable: true,
        useHttpsOrHttp: false,
        url: 'https://thumbor.sirclocdn.com/unsafe/widthxheight/filters:format(webp)/',
    },
    globalPromo: {
        key_cookies: 'global_promo_enable',
    },
};

const modules = {
    product: {
        customizableOptions: {
            enabled: true,
            availableOptions: {
                CustomizableAreaOption: true,
                CustomizableDateOption: true,
                CustomizableDropDownOption: true,
                CustomizableMultipleOption: true,
                CustomizableFieldOption: true,
                CustomizableFileOption: false,
                CustomizableRadioOption: true,
                CustomizableCheckboxOption: true,
            },
        },
    },
    authentication: {
        enabled: true,
        path: '/authentication',
    },
    about: {
        enabled: true,
        path: '/about-us',
    },
    blog: {
        enabled: true,
        path: '/blog',
        link: {
            detail: {
                href: '/blog/[id]',
                as: '/blog/',
            },
            category: {
                href: '/blog/category/[id]',
                as: '/blog/category/',
            },
            default: {
                href: '/blog',
            },
        },
        featuredImage: true,
    },
    brands: {
        enabled: true,
        path: '/brands',
    },
    catalog: {
        enabled: true,
        productListing: {
            sort: {
                relevance: true,
                position: true,
                name: true,
                price: true,
                random: true,
                new_old: false,
                new: true,
                bestseller: true,
                onsale: true,
                mostviewed: true,
                wishlisttop: true,
                toprated: true,
                featured: true,
                free: true,
            },
        },
    },
    confirmpayment: {
        enabled: true,
        path: '/confirmpayment',
    },
    checkout: {
        enabled: true,
        checkoutOnly: false,
        path: '/checkout',
        ipayUrl: 'ipay88/ipayredirect/?orderId=',
        snapUrl: {
            dev: 'https://app.sandbox.midtrans.com/snap/snap.js',
            prod: 'https://app.midtrans.com/snap/snap.js',
        },
        pickupStore: {
            enabled: true,
        },
        inStorePickup: {
            enabled: false,
        },
        extraFee: {
            enabled: true,
        },
        cashback: {
            enabled: true,
        },
        howtoPay: {
            enabled: true,
        },
        xendit: {
            paymentPrefixCodeOnSuccess: [
                'alfamart',
                'bcava',
                'briva',
                'bniva',
                'mandiriva',
                'permatava',
                'indomaret',
            ],
            paymentPrefixCode: [
                'cc',
                'cc_subscription',
                'dana',
                'ovo',
                'linkaja',
                'qr_codes',
                'dd_bri',
                'kredivo',
            ],
        },
    },
    paypal: {
        enabled: true,
        path: '/paypal',
        clientId: {
            local: '', // sample AaOafUT6j2w7kZNb97_cAlI0MjGexmWOaWo650ANV5xgrT3Ff1xtdwJxVByCHUJZ0Ga9HKvbRw5NIjNV
            dev: '',
            prod: '',
            stage: 'AZ-Jtz00C4S1mfLEsDvCqc-kO4e3JPR4QklRcVmt6rvBFrzae1E7g-tCb-zzLOLpP2kAA_ai76qRpQCU',
        },
        clientSecret: {
            local: '', // sample EM2Uqt5eiPEgcCMi6NAF94DNsOoP3YBgGRkBGyFQdEXahjzuPfi17sjfhW4N9CfmE_RLjDGuZ19Gf1WP
            dev: '',
            prod: '',
            stage: 'EG4Dpk2XELnq8VxwAVKfc1BIayJEt1936We1fpLU7vd8cvb0qY2MnAVo1tqOzNoRRp3UWdsh2KIp0s3g',
        },
        intent: 'authorize',
        returnUrl: 'paypal/express/review',
        cancelUrl: 'checkout/cart',
        keyData: 'paypal-data',
        keyToken: 'paypal-token',
        disableFunding: 'venmo%2Cbancontact%2Ceps%2Cgiropay%2Cideal%2Cmybank%2Cp24%2Csofort',
    },
    cart: {
        enabled: true,
        path: '/checkout/cart',
    },
    customer: {
        enabled: true,
        path: '/customer',
        plugin: {
            address: {
                splitCity: true,
            },
            newsletter: {
                enabled: true,
            },
        },
    },
    contact: {
        enabled: true,
        path: '/contact',
    },
    forgotpassword: {
        enabled: true,
        path: '/customer/account/forgotpassword',
    },
    rewardpoint: {
        enabled: true,
        path: '/aw_rewardpoints/info',
    },
    rma: {
        enabled: true,
        path: '/rma/customer',
    },
    storecredit: {
        enabled: true,
        path: '/customer/account/storecredit',
        useCommerceModule: false,
    },
    storeLocator: {
        enabled: true,
        path: '/storelocator',
    },
    giftcard: {
        enabled: true,
        path: '/awgiftcard/card',
        useCommerceModule: false,
    },
    productreview: {
        enabled: true,
        path: '/review/customer',
    },
    login: {
        enabled: true,
        path: '/customer/account/login',
        recaptcha: {
            enabled: false,
        },
    },
    notification: {
        enabled: true,
        path: 'inboxnotification/notification',
    },
    register: {
        enabled: true,
        path: '/customer/account/create',
        recaptcha: {
            enabled: true,
        },
    },
    trackingorder: {
        enabled: true,
        path: '/sales/order/track',
        fieldDetail: {
            shipperid: ['name', 'description', 'updateDate'],
            gosend: [
                'bookingType',
                'buyerAddressName',
                'buyerAddressDetail',
                'driverId',
                'driverName',
                'insuranceDetails',
                'liveTrackingUrl',
                'receiverName',
                'sellerAddressDetail',
                'sellerAddressName',
                'status',
                'cancelDescription',
                'orderArrivalTime',
                'orderClosedTime',
                'orderCreatedTime',
            ],
        },
    },
    thanks: {
        enabled: true,
        path: '/checkout/onepage/success',
    },
    home: {
        enabled: true,
    },
    promo: {
        enabled: true,
    },
    productcompare: {
        enabled: true,
    },
    order: {
        enabled: true,
        path: '/sales/order',
    },
    wishlist: {
        enabled: true,
        path: '/wishlist',
    },
    maintenance: {
        enabled: true,
        path: '/maintenance',
    },
    setting: {
        enabled: true,
        path: '/setting',
    },
    error: {
        enabled: true,
    },
};

const nossrCache = [
    '/aw_rewardpoints/info',
    '/sales/order/history',
    '/customer/account/profile',
    '/customer/account/address',
    '/awgiftcard/card',
    '/customer/account/storecredit',
    '/inboxnotification/notification',
    '/customer/newsletter',
    '/rma/customer',
    '/confirmpayment',
    '/checkout',
    '/checkout/cart',
    '/graphql',
    '/authentication',
    '/checkout/onepage/success',
];

const debuging = {
    originalError: false,
};

const general = {
    defaultCurrencyCode: 'IDR',
    defaultCurrencyLocale: 'id-ID',
};

module.exports = {
    assetsVersion,
    general,
    sentry,
    storeCode,
    debuging,
    GTM,
    HOST,
    graphqlEndpoint,
    passwordStrength,
    expiredCookies,
    storeConfigNameCookie,
    nameCartId,
    nameToken,
    expiredToken,
    expiredDefault,
    loaderImage,
    cmsSocialMediaLinkIdentifiers,
    custDataNameCookie,
    nameCheckoutCookie,
    nameCheckoutState,
    nameGlobalCookie,
    enableSocialMediaLink,
    features,
    nossrCache,
    modules,
    localResolverKey,
    useMagentoCommerce,
    rollbar,
    translation,
    keyLocalStorage,
};
