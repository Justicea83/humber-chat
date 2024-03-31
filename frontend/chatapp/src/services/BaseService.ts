import axios from 'axios'
import appConfig from "../configs/app.config";

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

export default BaseService
