// Set the exported config based on the current env here
const configs: any = 
{
    LOCAL: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_dXzoq9vL3',
            APP_CLIENT_ID: '3ef6fitjfku707tu30esnuhqj7'
        }
    },
    DEV: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_dXzoq9vL3',
            APP_CLIENT_ID: '3ef6fitjfku707tu30esnuhqj7'
        }
    },
    TEST: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_dXzoq9vL3',
            APP_CLIENT_ID: '3ef6fitjfku707tu30esnuhqj7'
        }
    },
    PROD: {
        FINANCIAL_DATA_API: 'http://localhost:8000',
        AUTH_API: {
            REGION: 'us-east-2',
            USER_POOL_ID: 'us-east-2_dXzoq9vL3',
            APP_CLIENT_ID: '3ef6fitjfku707tu30esnuhqj7'
        }
    }
};

export default configs[process.env.NODE_ENV as string];