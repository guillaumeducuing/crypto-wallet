import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { RuntimeConfig } from 'nuxt/schema';

export default {
  async run(method: string, url: string, datas?: any, options = {}) {
    const response = new apiResponse();
    let res = null;
    try {
      const config: RuntimeConfig = useRuntimeConfig();
      const _url = url.match(/http?/) ? url : config.public.BACKEND_URI + url;

      switch (method) {
        case 'get':
          res = await axios.get(_url, options);
          break;
        case 'post':
          res = await axios.post(_url, datas, options);
          break;
        case 'put':
          res = await axios.put(_url, datas, options);
          break;
        case 'delete':
          res = await axios.delete(_url, options);
          break;
      }

      response.setData(res);
    } catch (e) {
      // console.log(e);
      response.setError(e || 'server');
    }

    return response;
  },
  get(url: string, datas?: any, options?: AxiosRequestConfig): Promise<apiResponse> {
    return this.run('get', url, datas, options);
  },
  async getData<T>(url: string, datas?: any, options?: AxiosRequestConfig): Promise<T> {
    const result = await this.get(url, datas, options);
    if (result.error()) {
      throw new Error(result.errorMsg());
    }
    return result.data();
  },
  post(url: string, datas?: any, options?: AxiosRequestConfig): Promise<apiResponse> {
    return this.run('post', url, datas, options);
  },
  put(url: string, datas?: any, options?: AxiosRequestConfig): Promise<apiResponse> {
    return this.run('put', url, datas, options);
  },
  delete(url: string, datas?: any, options?: AxiosRequestConfig): Promise<apiResponse> {
    return this.run('delete', url, datas, options);
  },
};

class apiResponse {
  _error: any = null;
  _response: any = null;
  _data: any = null;

  setData(res: any) {
    this._response = res;
    this._data = res.data;

    if (this._data.error) {
      this.setError({ response: this._response });
    }
  }

  setError(error: any) {
    this._error = error;

    if (this._error?.response && this._error?.response.data) {
      this._data = this._error?.response.data;
    }
  }

  error() {
    return this._error !== null;
  }

  errorMsg() {
    if (this._error.response && this._error.response.data.message) {
      return this._error.response.data.message;
    }
    return this._error;
  }

  data<T>(): T {
    return this._data as T;
  }

  payload() {
    return this._data.payload;
  }
}
