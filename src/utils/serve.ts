import { RequestConfig, Request } from './request'
/**
 * @description: 请求实例
 * @interface: R: 请求参数的接口
 * @interface: T: 响应数据的接口
 * @params {config: 请求参数}
 * @return {Promise<T}
 */

export interface IConfig<R> extends RequestConfig {
  data?: R
}

export interface IResponse<T = any> {
  code: number
  message: string | null
  data: T
}

const request = new Request({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

const fetchRequest = <R, T = unknown>(config: IConfig<R>) => {
  const { method = 'get' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<IResponse<T>>(config)
}

export { fetchRequest }
