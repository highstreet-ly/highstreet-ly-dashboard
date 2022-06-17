'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'sonaticket-dashboard',
    environment,
    podModulePrefix: 'sonaticket-dashboard/pods',
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    'ember-cli-notifications': {
      includeFontAwesome: true
    },
    cloudinary: {
      cloudName: 'sonatribedevmou',
      apiKey: '967363294944649'
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-183095132-2',
          // Use `analytics_debug.js` in development
          debug: environment === 'development',
          // Use verbose tracing of GA events
          trace: environment === 'development',
          // Ensure development env hits aren't sent to GA
          sendHitTask: environment !== 'development',
          // Specify Google Analytics plugins
          require: ['ecommerce']
        }
      }
    ],

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };


  ENV.sonatribe = {};

  ENV.sonatribe.Api = process.env.MAIN_API;

  ENV.sonatribe.DashApi = process.env.DASH_API;
  ENV.sonatribe.DashUi = process.env.DASH_UI;
  ENV.sonatribe.defaultPageSize = 20;
  ENV.sonatribe.authenticationURL = `https://ids.${process.env.A_RECORD}.${process.env.TLD}`;
  ENV.sonatribe.opsURL = `${process.env.OPS_UI}`;
  ENV.sonatribe.shopApi = `https://api.shop.${process.env.A_RECORD}.${process.env.TLD}`

  ENV.sonatribe.productSubscriptionsEnabled = process.env.PRODUCT_SUBS_ENABLED === 'true';
  ENV.sonatribe.AllowedDomains = `api.dashboard.${process.env.A_RECORD}.${process.env.TLD},ids.${process.env.A_RECORD}.${process.env.TLD}`;
  ENV.sonatribe.stripeKey = process.env.STRIPE_KEY;
  ENV.sonatribe.MainUi = process.env.MAIN_UI;
  ENV.sonatribe.Version = process.env.VERSION;
  ENV.sonatribe.Client = process.env.CLIENT;
  ENV.sonatribe.responseType = process.env.RESPONSE_TYPE;
  ENV.sonatribe.stripeClientId = process.env.STRIPE_CLIENT_ID;
  ENV.sonatribe.stripeKey = process.env.STRIPE_KEY;
  ENV.sonatribe.partnerId = process.env.PARTNER_ID;
  ENV.sonatribe.apiNamespace = process.env.API_NAMEPSACE;
  ENV.sonatribe.ClientSilentRenew = process.env.CLIENT_SILENT_RENEW;
  ENV.sonatribe.ImageBlobContainer = process.env.IMAGE_BLOB_CONTAINER;
  ENV.sonatribe.applicationURL = process.env.CLIENT;
  ENV.sonatribe.requestedScopes = process.env.SCOPE;
  ENV.sonatribe.applicationName = process.env.APPLICATION_NAME;
  ENV.sonatribe.popupRedirectURL = process.env.CLIENT_POPUP;
  ENV.sonatribe.silentRedirectURL = process.env.SILENT_REDIRECT_URL;
  ENV.sonatribe.responseType = process.env.RESPONSE_TYPE;
  ENV.sonatribe.postLogoutRedirectURL = process.env.POST_LOGOUT_URL;
  ENV.sonatribe.checkSessionInterval = +process.env.CHECK_SESSION_INTERVAL;
  ENV.sonatribe.automaticSilentRenew = (process.env.AUTOMATIC_SILENT_RENEW == 'true');
  ENV.sonatribe.filterProtocolClaims = (process.env.FILTER_PROTOCOL_CLAIMS == 'true');
  ENV.sonatribe.loadUserInfo = (process.env.LOAD_USER_INFO == 'true');
  ENV.sonatribe.clientId = process.env.CLIENT_ID;
  ENV.sonatribe.redirectUrl ='';
  ENV.sonatribe.clientDomain = process.env.CLIENT_DOMAIN;
  ENV.sonatribe.serverIp = process.env.SERVER_IP;
  ENV.sonatribe.chargeBeeSiteName = process.env.CHARGE_BEE_SITE_NAME;

  ENV.sonatribe.OrdersUi = process.env.ORDERS_UI;
  ENV.sonatribe.TicketsUi = process.env.TICKETS_UI;

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
