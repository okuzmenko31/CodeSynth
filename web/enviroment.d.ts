declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_FRONTEND_DOMAIN: string;
            GENERATE_SOURCEMAP: boolean;
            REACT_APP_STATIC_DATA: boolean;
            NODE_ENV: "development" | "production";
        }
    }
}

export {};
