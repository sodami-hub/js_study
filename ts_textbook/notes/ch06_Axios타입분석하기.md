# 6장 Axios 타입 분석하기
axios 라이브러리의 타입을 분석해보겠다. axios는 http  요청을 보내는 라이브러리로 브라우저나 서버에서 동일한 인터페이스로 요청을 보낼 수 있어 인기가 많다.
axios 는 타입스크립트를 지원한다. 따라서 @types 패키지를 설치하지 않아도 된다.  
axios 디렉터리안에 testAxios.ts 파일을 만들고 코드를 작성한다.
```typescript
import axios from 'axios';

interface Post {
  userId:number, id:number,title:string,body:string
}

(async() => {
  try {
    const res = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/1`);
    console.log(res.data.userId);
    const res2 = await axios.post<Post>(`https://jsonplaceholder.typicode.com/posts`, {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    console.log(res2.data.id);
  }catch (error) {
    if(axios.isAxiosError<{message:string}>(error)) {
      console.log(error.response?.data.message);
    }
  }
})();
```
`https://jsonplaceholder.typicode.com/posts/1` 주소로 GET 요청을 보내고 있다. 응답은 response(res)에 들어있고, 응답의 본문(Body)은 response.data 이다.
요청에 에러가 발생할 때는 catch 문이 실행된다. 에러 응답은 error.response에 들어 있고, 에러 응답의 본문은 error.response.data 이다.  
axios 타입 선언에서 진입점이 되는 파일이 무엇인지 확인한다. node_modules/axios/package.json 의 types 속성을 확인해보면 index.d.ts 인 것을 알 수 있다.  
참고로 types 속성 외에도 type 속성도 있다. type 속성은 axios 패키지가 어떤 모듈 시스템을 사용하는지를 나타낸다. 값이 module 이므로 현재 axios 패키지는
ECMAScript 모듈 시스템을 따른다. type 속성이 없거나 commonjs 이면 해당 패키지는 CommonJS 모듈 시스템을 따른다.  
이제 axios 변수가 어떻게 타이핑되어 있는지 확인해보겠다. 이번에는 testAxios.ts 파일에 axios 변수가 import 되어 있다. axios 에서 정의로 이동하면 index.d.ts 로 이동한다.
```typescript
// TypeScript Version: 4.7
// ...
declare const axios: AxiosStatic;

export default axios;
```
타입스크립트 4.7 버전 이상부터 이 파일을 사용할 수 있으며, .d.ts 파일에 타입이 선언되어 있다. 실제 구현부는 따로 있다는 뜻이다. 구현은 node_module/axios/index.js
에 되어 있다.  
마지막에 export default axios로 axios 변수를 export 하고 있다. ECMAScript의 모듈 시스템을 사용하는 것이다. 그래서 import axios로 axios 변수를 불러올 수 있다.   
이어서 어떻게 axios.get 메서드 호출이 가능한지, <Post> 제네릭은 무엇인지 알아보겠다. axios 변수 타입이 AxiosStatic 이므로 AxiosStatic을 살펴본다. 같은 파일에 있다.
```typescript
export interface AxiosStatic extends AxiosInstance {
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  Axios: typeof Axios;
  AxiosError: typeof AxiosError;
  HttpStatusCode: typeof HttpStatusCode;
  readonly VERSION: string;
  isCancel: typeof isCancel;
  all: typeof all;
  spread: typeof spread;
  isAxiosError: typeof isAxiosError;
  toFormData: typeof toFormData;
  formToJSON: typeof formToJSON;
  getAdapter: typeof getAdapter;
  CanceledError: typeof CanceledError;
  AxiosHeaders: typeof AxiosHeaders;
  mergeConfig: typeof mergeConfig;
}
```
여기에는 get 메서드가 없다. AxiosStatic 인터페이스가 상속하고 있는 AxiosInstance 를 살펴보아야 한다.
```typescript
export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;

  create(config?: CreateAxiosDefaults): AxiosInstance;
  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  };
}
```
여기도 없다. AxiosInstance 인터페이스가 상속하고 있는 Axios 를 살펴보면 다음과 같다.
```
export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}
```
이번에는 get 메서드를 확인할 수 있다. 사실 axios.get 의 get 에서 바로 정의로 이동하면 찾을 수 있지만, 이렇게 상속을 거슬로 올라가면서 찾을 수도 있다.
axios.get의 첫 번째 타입 매개변수로는 T로, 현재 Post를 넣은 상황이다. R은 기본값이 `AxiosResponse<T>`이므로 `AxiosResponse<Post>`가 되고, D는 기본값이
any 이다. url은 문자열을 제공했고, config는 옵셔널이므로 제공하지 않았다. 반환값의 타입은 `Promise<R>` 이므로 `Promise<AxiosResponse<Post>>`가 된다.  
왜 T,R,D를 따로 타이핑해두었는지, 그리고 `<Post>`로 명시적으로 제공하는 이유가 무엇인지 타입 분석으로 확인해보겠다.  
AxiosResponse 타입을 살펴보겠다.
```typescript
export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
```
T 는 data로 되어 있다. res가 AxiosResponse 타입이므로 res.data가 Post 라는 의미이다. 서버로부터 오는 데이터이므로, 타입스크립트에서는 어떤 타입이 될지
추론할 수가 업서 미리 명시적으로 타이핑한 것이다. 응답에는 data 말고도 status(http 상태 코드), statusText(http 상태 text), headers(응답 헤더), config(요청에 대한 설정들)
등이 있다는 것을 알 수 있다.  
config 가 궁금하다면 AxiosRequestConfig와 InternalAxiosRequestConfig 를 찾아보면 된다.
```typescript
export interface AxiosRequestConfig<D = any> {
  // ... 
  params?: any;
  paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer;
  data?: D;
  // ....
}
```
config의 data가 D라는 것을 알아냈지만 이것이 무엇을 의미하는지는 알 수 없다.
axios 공식 문서의 설명을 봐야만 파악할 수 있다. 타입스크립트는 어떤 속성이 있는지를 보여주지만, 무슨 역할을 하는지까지는 알려주지 않는다. 주석이나 문서로 파악해야 한다.  
공식 문서의 설명을 보면 각각 다음을 의미한다.  
- T : 서버로부터 오는 응답 본문 데이터
- D : 서버로 보내는 요청 본문 데이터    
    
get 요청 시에는 서보로 보내는 요청 본문이 없으므로 D를 사용할 일이 없지만, post 요청 시에는 있다. testAxios.ts 에서 axios.post 요청을 보내는 부분에서 post의 정의로 이동해보겠다.
```
post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
```
타입 매개변수 D를 쓰지 않은 것 아니냐 할 수 있지만 D는 data 로부터 타입 추론된다. 따라서 굳이 `<Post, AxiosResponse<Post>, Omit<Post,'id'>>` 이렇게
세 타입의 매개변수를 전부 적을 필요가 없다. res2.data는 T 이므로 Post가 된다.  
이번에는 catch 부분을 살펴보겠다.
```
...
}catch (error) {
    if(axios.isAxiosError<{message:string}>(error)) {
        console.log(error.response?.data.message);
    }
}
...
```
error 변수의 타입은 기본적으로 unknown 이다. 따라서 as로 강제 지정하거나 타입 서술을 통해 타입을 지정하는 것을 권장한다. 다행히 axios.isAxiosError는 타입 서술을 지원한다.
정의를 살펴보면
```typescript
// AxiosError 의 타입
// export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;

export interface AxiosStatic extends AxiosInstance {
    //...
  AxiosError: typeof AxiosError;
    //...
}
```
타입 서술을 사용하면 error가 axiosError 타입이 된다. AxiosError 타입은 매개변수를 두 개 가진다. 지금까지의 타입 매개변수 이름으로 미루어보아 T는 응답의 본문,
D는 요청의 본문을 가리키는 타입으로 추측할 수 있다. AxiosError 타입을 확인해 보겠다.
```
export class AxiosError<T = unknown, D = any> extends Error {
  constructor(
    message?: string,
    code?: string,
    config?: InternalAxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>
  );

  config?: InternalAxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError: boolean;
  status?: number;
  toJSON: () => object;
  cause?: Error;
  static from<T = unknown, D = any>(
    error: Error | unknown,
    code?: string,
    config?: InternalAxiosRequestConfig<D>,
    request?: any,
    response?: AxiosResponse<T, D>,
    customProps?: object,
  ): AxiosError<T, D>;
  static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
  static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
  static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
  static readonly ERR_NETWORK = "ERR_NETWORK";
  static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
  static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
  static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
  static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
  static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
  static readonly ERR_CANCELED = "ERR_CANCELED";
  static readonly ECONNABORTED = "ECONNABORTED";
  static readonly ETIMEDOUT = "ETIMEDOUT";
}
```
T, D 가 AxiosResponse 의 타입 매개변수로 그대로 이어지는 것을 보니 추측이 맞다. static readonly 부분은 axios에서 발생할 수 있는 에러 코드들을 정리해둔 것이다.  
T 타입 매개변수로 { message:string } 을 제공했으므로 error.response?.data.message 로 사용할 수 있다.  
AxiosError를 처리할 때 axios.isAxiosError 타입 서술을 통해 error의 타입을 정확하게 만들 수 있음을 확인했다.  
  
왜 굳이 AxiosStatic, AxiosInstance, Axios 타입을 서로 분리하고, 상속을 통해 연결했을까? 이유는 간단하다. Axios 클래스만 쓸 경우도 있고, AxiosInstance 로만
사용할 때도 있고, AxiosStatic 으로 사용할 때도 있기 때문이다. 

## 6.1 Axios 직접 타이핑하기
axios 디렉터리에 zaxios.ts 파일을 만들고 코드를 입력한다.
```typescript

```



## 6.2 다양한 모듈 형식으로 js 파일 생성하기

## axios의 타입을 어떻게 찾았는지 이해하기


































































