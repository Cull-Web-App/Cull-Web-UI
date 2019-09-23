// Set the exported config based on the current env here
const configs: any = 
{
    LOCAL: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_RX3cbAc4H',
            APP_CLIENT_ID: '2d563858afqanlj78jlsp21t8j'
        }
    },
    DEV: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_RX3cbAc4H',
            APP_CLIENT_ID: '2d563858afqanlj78jlsp21t8j'
        }
    },
    TEST: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_RX3cbAc4H',
            APP_CLIENT_ID: '2d563858afqanlj78jlsp21t8j'
        }
    },
    PROD: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_RX3cbAc4H',
            APP_CLIENT_ID: '2d563858afqanlj78jlsp21t8j'
        }
    }
};

export default configs[process.env.NODE_ENV as string];