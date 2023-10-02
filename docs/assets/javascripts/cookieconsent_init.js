if (window.location.hostname === "docs.websight.io") {
    // obtain cookieconsent plugin
    var cc = initCookieConsent();

    var cookie = '🍪';

    // run plugin with config object
    cc.run({
        current_lang : 'en',
        theme_css: '/assets/stylesheets/cookieconsent.css',
        page_scripts: true,
        autoclear_cookies: true,
        gui_options: {
            consent_modal: {
                layout: 'bar',               // box/cloud/bar
                position: 'bottom center',     // bottom/middle/top + left/right/center
                transition: 'slide',           // zoom/slide
                swap_buttons: false            // enable to invert buttons
            },
            settings_modal: {
                layout: 'bar',                 // box/bar
                // position: 'left',           // left/right
                transition: 'slide'            // zoom/slide
            }
        },
        languages: {
            'en': {
                consent_modal: {
                    title: cookie + ' We use cookies!',
                    description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
                    primary_btn: {
                        text: 'Accept',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Customize',
                        role: 'c-settings'
                    }
                },
                settings_modal: {
                    title: 'WebSight.io',
                    save_settings_btn: 'Save settings',
                    accept_all_btn: 'Accept all',
                    close_btn_label: 'Close',
                    cookie_table_headers: [
                        {col1: 'Name'},
                        {col2: 'Domain'},
                        {col3: 'Expiration'},
                        {col4: 'Description'}
                    ],
                    blocks: [
                        {
                            title: 'Cookie usage 📢',
                            description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. To change your selection, use footer `Cookie Settings` link.'
                        }, {
                            title: 'Strictly necessary cookies',
                            description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }
                        }, {
                            title: 'Performance, Analytics and Targeting cookies',
                            description: 'These cookies allow the website to remember the choices you have made in the past',
                            toggle: {
                                value: 'analytics',
                                enabled: true,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '^_ga',
                                    col2: 'google.com',
                                    col3: '2 years',
                                    col4: 'Analytics cookies',
                                    is_regex: true
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 day',
                                    col4: 'Analytics cookies',
                                },
                                {
                                    col1: 'bcookie',
                                    col2: 'linkedin.com',
                                    col3: '1 year',
                                    col4: 'Stores browser details',
                                },
                                {
                                    col1: 'bscookie',
                                    col2: 'www.linkedin.com',
                                    col3: '1 year',
                                    col4: 'Stores performed actions on the website',
                                },
                                {
                                    col1: 'JSESSIONID',
                                    col2: 'www.linkedin.com',
                                    col3: 'session',
                                    col4: 'Protects Cross Site Request Forgery (CSRF) and validates URL signature',
                                },
                                {
                                    col1: 'lang',
                                    col2: 'linkedin.com',
                                    col3: 'session',
                                    col4: 'User\'s language setting',
                                },
                                {
                                    col1: 'lidc',
                                    col2: 'linkedin.com',
                                    col3: '1 day',
                                    col4: 'Stores performed actions on the website',
                                },
                                {
                                    col1: 'sdsc',
                                    col2: 'linkedin.com',
                                    col3: 'session',
                                    col4: 'Ensure consistency across all databases when a change is made'
                                },
                                {
                                    col1: 'li_gc',
                                    col2: 'linkedin.com',
                                    col3: '6 months',
                                    col4: 'Stores consent of guests regarding the use of cookies for non-essential purposes'
                                },
                                {
                                    col1: 'li_mc',
                                    col2: 'linkedin.com',
                                    col3: '6 months',
                                    col4: 'Temporary cache to avoid database lookups for a member\'s consent'
                                },
                                {
                                    col1: 'AnalyticsSyncHistory',
                                    col2: 'linkedin.com',
                                    col3: '30 days',
                                    col4: 'Stores information about the time a sync took place with the lms_analytics cookie'
                                },
                                {
                                    col1: 'lms_analytics',
                                    col2: 'linkedin.com',
                                    col3: '30 days',
                                    col4: 'Identifies LinkedIn Members off LinkedIn for analytics'
                                },
                                {
                                    col1: 'UID',
                                    col2: 'scorecardresearch.com',
                                    col3: '720 days',
                                    col4: 'Used for market and user research',
                                },
                                {
                                    col1: 'UserMatchHistory',
                                    col2: 'linkedin.com',
                                    col3: '30 days',
                                    col4: 'LinkedIn Ads ID syncing',
                                },
                                {
                                    col1: 'lms_ads',
                                    col2: '.linkedin.com',
                                    col3: '30 days',
                                    col4: 'Identifies LinkedIn Members off LinkedIn for advertising',
                                },
                                {
                                    col1: 'li_fat_id',
                                    col2: 'first party domain',
                                    col3: '30 days',
                                    col4: 'Member indirect identifier for Members for conversion tracking, retargeting, analytics',
                                },
                                {
                                    col1: 'li_sugr',
                                    col2: '.linkedin.com',
                                    col3: '90 days',
                                    col4: 'Stores browser details',
                                },
                                {
                                    col1: '_guid',
                                    col2: 'linkedin.com',
                                    col3: '90 days',
                                    col4: 'Identifies a LinkedIn Member for advertising through Google Ads',
                                },
                                {
                                    col1: 'BizographicsOptOut',
                                    col2: '.linkedin.com',
                                    col3: '10 years',
                                    col4: 'Stores privacy preferences',
                                },
                                {
                                    col1: 'li_giant',
                                    col2: 'first party domain',
                                    col3: '7 days',
                                    col4: 'Indirect indentifier for groups of LinkedIn Members used for conversion tracking',
                                }
                            ]
                        }, {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a class="cc-link" href="https://www.ds.pl/contact-us.html">contact us</a>.',
                        }
                    ]
                }
            }
        }
    });
}
