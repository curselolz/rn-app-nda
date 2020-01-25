export const DEFAULT_URL =
    // PROD VERSION
    'https://api.getstockist.co', DEBUGGER_MODE = true;

    // QA ROUTE for build
    // 'https://api.stockist.qa.kaiprojects.us',  DEBUGGER_MODE = false;

    // QA FOR DEVELOPMENT
    // 'https://api.stockist.qa.kaiprojects.us',  DEBUGGER_MODE = true;

    // STAGE ROUTE
    // 'https://api.stockist.stage.kaiprojects.us'

    // DEVELOP ROUTE
    // 'https://api.stockist.dev.kaiprojects.us' ,  DEBUGGER_MODE = true;


    // LOCAL TESTING
    // 'https://8f3e42dd.ngrok.io/', DEBUGGER_MODE = true;
export const STRIPE_DEFAULTS =
    // {   //NOT PRODUCTION STRIPE DEFAULTS
    //     publishableKey: 'pk_test_ggYBg3GTQdW8pRTeyfBU4fn0',
    //     androidPayMode: 'test'
    // };

    // PROD STRIPE DEFAULTS
{
    publishableKey: 'pk_live_jwMq09j3gCjwzICXjoUvMBVC',
    androidPayMode: 'production'
}
