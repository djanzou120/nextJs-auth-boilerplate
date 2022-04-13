/// <reference types="next" />
/// <reference types="next/types/global" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_AUTH_URL: string; // this is the line you want
        }
    }
}
