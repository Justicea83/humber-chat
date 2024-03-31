import appConfig from "../configs/app.config";

export const getPromptStreamEndpoint = (prompt: string) => {
    const endpoint = 'api/chat/'
    const baseUrl = appConfig.apiPrefix
    return `${baseUrl}/${endpoint}?query=${encodeURIComponent(prompt)}`
}