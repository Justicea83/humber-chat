export type AppConfig = {
    apiPrefix: string
    locale: string
}

const appConfig: AppConfig = {
    //apiPrefix: 'api',
    apiPrefix: import.meta.env.VITE_BASE_URL,
    locale: 'en',
}

export default appConfig
