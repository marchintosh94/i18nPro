export type HttpMethod = 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'PUT'
export interface HttpOptions {
    url: string;
    method: HttpMethod;
    data?: any;
    headers?: Record<string, string>
}
