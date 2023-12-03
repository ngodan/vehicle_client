import type { App } from "vue";
import type {
  Method,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  ResponseType,
} from "axios";
import axios, { AxiosError } from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import router from "@/router";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;
  public static cloneApp;
  public static baseURL: string | null = null;
  public static responseType: ResponseType = "json";
  public static setContentUploadFile: string | null = null;

  /**
   * @description initialize vue axios
   */
  public static init(app) {
    ApiService.setupInterceptors(axios, app, import.meta.env.VITE_APP_API_URL);
  }

  // Request Interceptor
  public static onRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const { method, url, headers } = config;
    const tokenValue = JwtService.getToken();
    config.baseURL = ApiService.baseURL || import.meta.env.VITE_APP_API_URL;
    headers.setAuthorization(`Bearer ${tokenValue}`);
    config.xsrfCookieName = "XSRF-TOKEN";
    config.xsrfHeaderName = "X-XSRF-TOKEN";
    config.withCredentials = true;
    headers.setContentType(
      headers["Content-Type"] ||
        ApiService.setContentUploadFile ||
        "application/json"
    );
    headers.setAccept("application/json");
    headers.set("X-Requested-With", "XMLHttpRequest");
    config.responseType = ApiService.responseType;
    config.timeout = 60000;
    ApiService.logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

    return config;
  }

  public static onResponse(response: AxiosResponse): AxiosResponse {
    const { method, url } = response.config;
    const { status } = response;
    ApiService.logOnDev(
      `🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`
    );

    return response;
  }

  public static setBaseURl(baseURL): void {
    ApiService.baseURL = baseURL;
  }

  public static setupInterceptors(instance: AxiosInstance, app): AxiosInstance {
    this.cloneApp = app;
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    instance.interceptors.request.use(
      ApiService.onRequest,
      ApiService.onErrorResponse
    );
    instance.interceptors.response.use(
      ApiService.onResponse,
      ApiService.onErrorResponse
    );

    return instance;
  }

  // For Make Log on Develop Mode
  public static logOnDev(message: string): void {
    if (import.meta.env.MODE === "development") {
      console.log(message);
    }
  }

  public static onErrorResponse(
    error: AxiosError | Error
  ): Promise<AxiosError> {
    if (axios.isAxiosError(error)) {
      const { message } = error;
      const { method, url } = error.config as AxiosRequestConfig;
      const { statusText, status } = (error.response as AxiosResponse) ?? {};

      if (!status) {
        return Promise.reject(error);
      }
      ApiService.logOnDev(
        `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
      );

      switch (status) {
        case 401: {
          router.push({ name: "sign-in" });
          JwtService.destroyToken();
          break;
        }
        case 403: {
          router.push({ name: "sign-in" });
          JwtService.destroyToken();
          break;
        }
        case 404: {
          // "Invalid request"
          break;
        }
        case 500: {
          // "Server error"
          break;
        }
        default: {
          // "Unknown error occurred"
          break;
        }
      }
    } else {
      ApiService.logOnDev(`🚨 [API] | Error ${error.message}`);
    }

    return Promise.reject(error);
  }

  public static setHeaderUploadFile(setContentUploadFile): void {
    ApiService.setContentUploadFile = setContentUploadFile;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @param params
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource, params);
  }

  /**
   * @description Send the patch HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  public static request(
    method: Method,
    url: string,
    payloads = null,
    options: Object | null
  ): Promise<AxiosResponse> {
    let configs = {
      method: method,
      url: url,
      data: payloads,
    };
    if (options) {
      configs = { ...options, ...configs };
    }

    return ApiService.vueInstance.axios.request(configs);
  }

  /**
   * set response type Api when download file from S3
   */
  public static setResponseTypeDownloadFile(responseType): void {
    ApiService.responseType = responseType;
  }
}

export default ApiService;
