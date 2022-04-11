import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * @description: 定义不同的拦截器
 */

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

/**
 * @description: 自定义传入的参数 继承自 AxiosRequestConfig
 */
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}

/**
 * @description: 取消请求数组
 */
export interface ICancelRequest {
  [k: string]: () => void
}
/**
 * @description: 类可以创建多个实例，并且每个实例都可以独立地调用
 */
class Request {
  instance: AxiosInstance
  interceptorsInstance?: RequestInterceptors
  // 取消请求存放池
  cancelRequestLists?: ICancelRequest[]
  // 请求地址存放池
  requestUrlLists?: string[]

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.interceptorsInstance = config.interceptors

    this.cancelRequestLists = []
    this.requestUrlLists = []

    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log(res, 'request interceptors')
        return res
      },
      (err) => err
    )

    this.instance.interceptors.request.use(
      this.interceptorsInstance?.requestInterceptors,
      this.interceptorsInstance?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptorsInstance?.responseInterceptors,
      this.interceptorsInstance?.responseInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('response interceptors')
        return res.data
      },
      (err) => err
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      /**
       * @description: 单个请求的拦截器
       */
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      const { url } = config
      if (url) {
        this.requestUrlLists?.push(url)
        // 添加取消函数
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelRequestLists?.push({ [url]: c })
        })
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }

          resolve(res)
        })
        .catch((err) => reject(err))
        .finally(() => {
          url && this.delUrl(url)
        })
    })
  }

  /**
   * @description: 取消所有请求
   */
  cancelAllRequest() {
    this.cancelRequestLists?.forEach((fn) => {
      const key = Object.keys(fn)[0]
      fn[key]()
    })
  }

  /**
   * @description: 取消单个请求
   */
  cancelRequest(url: string) {
    const sourceIndex = this.getSourceIndex(url)
    ~sourceIndex && this.cancelRequestLists?.[sourceIndex]?.[url]()
  }

  /**
   * @description: 取消多个请求
   */
  cancelRequests(url: string[]) {
    url.forEach((item) => {
      const sourceIndex = this.getSourceIndex(item)
      ~sourceIndex && this.cancelRequestLists?.[sourceIndex]?.[item]()
    })
  }

  private delUrl(url: string) {
    const urlIndex = this.requestUrlLists?.findIndex((item) => item === url)
    const sourceIndex = this.getSourceIndex(url)
    // 删除缓存的url
    if (urlIndex && ~urlIndex) {
      this.requestUrlLists?.splice(urlIndex, 1)
    }
    // 删除对应的取消函数
    if (sourceIndex && ~sourceIndex) {
      this.cancelRequestLists?.splice(sourceIndex, 1)
    }
  }

  /**
   * @description: url在cancelRequestLists对应的取消函数索引
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestLists?.findIndex((item) => {
      return Object.keys(item)[0] === url
    }) as number
  }
}

export { Request }
