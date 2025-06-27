# 6장 Axios 타입 분석하기
axios 라이브러리의 타입을 분석해보겠다. axios는 http  요청을 보내는 라이브러리로 브라우저나 서버에서 동일한 인터페이스로 요청을 보낼 수 있어 인기가 많다.
axios 는 타입스크립트를 지원한다. 따라서 @types 패키지를 설치하지 않아도 된다.  
axios 디렉터리안에 test.ts 파일을 만들고 코드를 작성한다.
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
요청에 에러가 발생할 때는 catch문이 실행된다. 에러 응답은 error.response에 들어 있고, 에러 응답의 본문은 error.response.data 이다.





## 6.1 Axios 직접 타이핑하기

## 6.2 다양한 모듈 형식으로 js 파일 생성하기

## axios의 타입을 어떻게 찾았는지 이해하기


































































