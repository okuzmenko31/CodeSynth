declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_FRONTEND_DOMAIN: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {}