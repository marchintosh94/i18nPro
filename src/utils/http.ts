import { HttpOptions } from '../types'

/**@internal */
export const http = <T>({
  method,
  url,
  data,
  headers
}: HttpOptions): Promise<T> => {
  return fetch(url, {
    body: data ? JSON.stringify(data) : undefined,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<T>
    }
    return Promise.reject(res)
  })
}
