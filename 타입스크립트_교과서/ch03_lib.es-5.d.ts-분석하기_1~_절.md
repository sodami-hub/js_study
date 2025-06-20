# ch03
타입스크립트에서 기본적으로 제공하는 타입 선언이 모여 있는 lib.es 5.d.ts 파일을 분석해보겠다. '타입스크립트는 어떻게 타입을 선언했는지'를 보면서
타입 선언 방법이나 기술을 익히면 도움이 된다.  
확장자가 ts가 아니라 d.ts 인 이유는, 타입스크립트의 .d.ts 파일에는 타입 선언만 있고 실제 구현부가 없기 때문이다. 자바스크립트 문법은 따로 구현되어
있기에 타입스크립트에서는 타입 선언만 제공하는 것이다.

## 3.1 Partial, Required, Readonly, Pick, Record
Partial, Required, Readonly, Pick, Record 는 타입스크립트 공식 사이트의 Reference 중 Utility Types 에서 매핑된 객체 타입을 사용하는 것만 추린 것이다.  
  
기존 객체의 속성을 전부 옵셔널로 만드는 Partial 타입이다.
```typescript
type MyPartial<T> = {
  [P in keyof T]?:T[P]
}
type Result = MyPartial<{a:string, b:number}> // Initial type:{a?: string, b?: number}
```
타입 이름에 My를 붙이지 않으면 lib.es 5.d.ts의 선언과 중복된다. 반대로 모든 속성을 옵셔널이 아니게(Require 타입) 만들고 싶다면 다음과 같이 하면 된다.
```typescript
type MyRequire<T> = {
  [P in keyof T]-?:T[P]
}
type Result = MyRequire<{a?:string, b?:number}> // Initial type:{a: string, b: number}
```
같은 원리로 모든 속성을 readonly로 만들거나 readonly가 아니게 만들 수 있다.  
이번에는 객체에서 지정한 속성만 추려보겠다. Pick 타입이다.
```typescript
type MyPick<T,K extends keyof T> = {
  [P in K]:T[P]
}
type Result = MyPick<{ a:string,b:number,c:number }, 'a'|'c'>; //Initial type:{a: string, c: number}
```
코드를 다음과 같이 수정하면 에러가 발생한다.
```typescript
type MyPick<T,K extends keyof T> = {
  [P in K]:T[P]
}
type Result = MyPick<{ a:string,b:number,c:number }, 'a'|'c'|'d'>; 
```
d 가 T 객체의 속성 이름이 아니기 때문이다. 만약 d 처럼 객체의 속성이 아닌 경우는 무시하고, 나머지 속성만 추리려면 어떻게 해야 할까?
```typescript
type MyPick<T,K extends keyof T> = {
  [P in (K extends  keyof T ? K : never)]:T[P]
}
type Result = MyPick<{ a:string,b:number,c:number }, 'a'|'c'>;
```
매핑된 객체 타입과 컨디셔널 타입을 같이 사용하면 된다. 'a'|'c'|'d' 는 제네릭(K)이자 유니언이므로 분배법칙이 실행된다.  
{a:string, b:number, c:number} 를 T 라고 할 때, 'a' extends keyof T ? 'a':never | 'b' extends keyof T ? 'b':never | 'd' extends keyof T ? 'd':never가 
실행되고, `MyPick<T,K>` 는 { [P in 'a'|'c'|never]:T[P] }가 된다. 최종적으로 { [P in 'a'|'c']:T[P] } 가 되어 {a:string,c:number} 만 남게된다.  
다만 이 방식은 단점도 있다. 다음과 같이 K가 'd'인 경우에는 Result가 {} 타입이 된다.
```typescript
type MyPick<T,K extends keyof T> = {
  [P in (K extends  keyof T ? K : never)]:T[P]
}
type Result = MyPick<{ a:string,b:number,c:number }, 'd'>; // IDE 에서 이렇게 하면 안되다고 잡아주기는 하지만 실행이 됨.
const res:Result = {a:'hi'}; // 이게 된다.
```
{} 타입은 null,undefined 를 제외한 모든 값을 의미하는 만큼, 의도가 달라진다.  
  
마지막으로 **모든 속성의 타입이 동일한 객체의 타입인 Record** 를 타이핑해보겠다.
```typescript
type MyRecord<K extends keyof any, T> = {
  [P in K] : T;
}
type Result = MyRecord<'a'|'b'|'c', number> // Initial type: {a: number, b: number, c: number}
```
K extends keyof any 를 사용해서 string|number|symbol 로 제약을 걸었다. 제약은 가능하면 엄격하게 거는 것이 좋다. 속성 이름으로 사용할 수 없는 값을
K로 제공하는 실수를 막을 수 있기 때문이다.

## 3.2 Exclude, Extract, Omit, NonNullable
**컨디셔널 타입일 때 유니언인 기존 타입과 제네릭이 만나면 분배법칙이 실행된다는 것을 2.15.1 에서 살펴봤다.** 이 절에서 배우는 모든 타입은 분배법칙을 활용하는 타입이다.  
먼저 어떠한 타입에서 지정한 타입을 제거하는 Exclude 타입과 지정한 타입만 추출해내는 Extract 타입을 만들어보겠다.
```typescript
type MyExclude<T,U> = T extends U? never:T;
type Result01 = MyExclude<1|'2'|3,string> // 1 | 3

type MyExtract<T,U> = T extends U? T:never;
type Result02 = MyExtract<1|'2'|3, string> // '2'
```
다음은 특정 객체에서 지정한 속성을 제거하는 Omit 타입이다.
```typescript
type MyOmit<T, K extends keyof any> = Pick<T,Exclude<keyof T, K>>
type Result03 = MyOmit<{ a:'1',b:2,c:true }, 'a'|'c'>  // {b: 2}
```
Omit 타입은 Pick과 반대되는 기능을 한다. 그러면서 Pick과 Exclude 타입을 활용한다.  
  
마지막으로 타입에서 null, undefined를 제거하는 NonNullable 타입을 만들어보겠다.
```typescript
type MyNonNullable<T> = T extends null | undefined ? never: T;
type Result04 = MyNonNullable<string |number|null|undefined>; // string | number
```
하지만 이런 방법은 예전 방식이로 요즘은 더 간단하게 변경됐다.
```typescript
type MyNonNullable<T> = T & {};
```
{} 은 null, undefined 를 제외한 모든 타입이기 때문에 제네릭 타입 T 와 {} 교집합은 null, undefined를 제외한 모든 타입이다.  
  
일부 속성만 옵셔널로 만드는 타입을 작성해보겠다. 아래 Optional 타입은 lib.es 5.d.ts 에 있는 타입이 아니다.
```typescript
type Optional<T, K extends keyof T> = Omit<T,K> & Partial<Pick<T,K>>  
type Result = Optional<{a:'hi',b:1,c:true}, 'b'>;
const a:Result = {a:'hi',c:true};
```
`Omit<T,K>` 에서 옵셔널로 만들려는 속성(K)을 제거한 객체와, `Partial<Pick<T,K>>` 에서 옵셔널로 만들려는 속성(K)를 옵셔널로 만든다음에 `&` 연산으로
다시 합친다.

## 3.3 Parameters, ConstructorParameters, ReturnType, InstanceType
이번에 배울 Utility Types는 infer를 활용한 타입들이다. 2.22 절의 예제로 사용했던 타입들이다. 타입 이름에서 My만 빼면 모두 lib.es 5.d.ts에 있는 타입이다.  
다만 이번 절에서는 타입 매개변수 T에 엄밀하게 제약을 걸었다.
```typescript
type myFunc = (a:string, b:number, c:boolean) => boolean;

// 함수의 매개변수 추론
type MyParameters<T extends (...args:any) => any> = T extends(...args:infer P) => any? P:never;
type params = MyParameters<myFunc> // [a: string, b: number, c: boolean]
// 함수의 반환값 추론
type MyReturnType<T extends (...args:any)=>any> = T extends (...args:any) => infer P ? P:never;
type returns = MyReturnType<myFunc> //  boolean

type MyConstructorParameters<T extends abstract new (...args:any)=>any > = T extends abstract new (...args:infer P) => any ? P : never;
type MyInstanceType<T extends abstract new (...args:any)=>any> = T extends abstract new (...args:any) => infer R ? R : any;
```

## 3.4 ThisType
메서드들에 this를 한 방에 주입하는 타입이다.

## 3.5 forEach 만들기
## 3.6 map 만들기
## 3.7 filter 만들기
## 3.8 reduce 만들기
## 3.9 flat 분석하기

## 3.10 Promise, Awaited 타입 분석하기
Promise와 Awaited 타입을 분석하면서 다음 코드의 타입 추론이 어떻게 이루어지는지 확인해보겠다.
```typescript
(async () => {
  const str = await Promise.resolve('promise')
  const all = await Promise.all([
    'string',
    Promise.resolve(123),
    Promise.resolve(Promise.resolve(true)),
  ]);
  const chaining = await Promise.resolve('hi')
    .then(()=>{
      return 123;
    })
    .then(()=> {
      return true;
    })
    .catch((err)=> {
      console.log(err);
    })
})();
```
Promise는 ES2015에 도입된 기능이다.
```typescript
interface PromiseConstructor {
  
  readonly prototype: Promise<any>;

  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

  all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

  race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;

  reject<T = never>(reason?: any): Promise<T>;

  resolve(): Promise<void>;
  
  resolve<T>(value: T): Promise<Awaited<T>>;
  
  resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
}
declare var Promise: PromiseConstructor;
```
PromiseConstructor 인터페이스가 실제 Promise 객체의 타입이다. new 를 붙여 호출할 수도 있고 all, race, reject, resolve 등의 메서드가 있다고 알려주고 있다. 
여기서 다음 코드를 분석해보겠다. export {} 는 top level await 에서 에러가 발생하는 것을 막기 위해 추가했다.
```typescript
const str1 = Promise.resolve('promise');
const str2 = await Promise.resolve('promise')
export {}
```
str1은 resolve의 반환값이 `Promise<Awaited<string>>`이다. str2는 str1에 await이 붙었다. 타입스크립트에서 await이 붙으면 타입이 Awaited 제네릭 타입으로 감싸진다.
따라서 str2 는 `Awaited<Promise<Awaited<string>>>`이다.  
왜 `Promise<Awaited<string>>`는 `Promise<string>` 이고, `Awaited<Promise<Awaited<string>>>` 는 string 일까? Awaited 타입은 다음과 같다. Promise 객체의 타입은
ES2015에 선언되었는데, Awaited 타입은 더 예전 버전인 ES5에서 선언되었다는 점이 재미있다.
```typescript
type Awaited<T> =
  T extends null | undefined ? T : 
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? 
      F extends ((value: infer V, ...args: infer _) => any) ?
        Awaited<V> : 
        never : 
      T;
```
컨디셔널 타입이 세 번 중첩되어 나타나고 있다.  
첫 번째 컨디셔널 타입은 T가 null 이거나 undefined 인지 확인한다. `Awaited<null>`은 null 이고, `Awaited<undefined>`는 undefined 이다.  
두 번째 컨디셔널 타입은 T가 object & { then(onfulfilled : infer F, ...args : infer _) : any } 를 extends 하는지 확인한다.  **T가 string, number, boolean 의 경우는
object가 아니므로 false 이다. `Awaited<string> , Awaited<boolean>, Awaited<number>`는 각각 string, boolean, number 이다. 이것을 규칙 1번이라고 하겠다.**
규칙 1번에 의해 str1의 타입인 `Promise<Awaited<string>>` 은 `Promise<string>` 이다.

#### 규칙 1번 : Awaited<객체가 아닌 값> === 객체가 아닌 값 

T가 객체인 경우에도 추가로 { then(onfulfilled: infer F, ...args: infer _) : any } 를 만족해야 한다. then 이라는 메서드를 가지고 있어야 하는데 대표적으로 Promise 인스턴스가
then 메서드를 갖고 있다. 여기서 말하는 Promise 인스턴스는 Promise 객체와 다르다. Promise.resolve 에서의 Promise는 Promise 객체이고, new Promise() 나
Promise.resolve() 의 반환값은 Promise 인스턴스이다.     
Promise의 인스턴스는 다음과 같다.
```typescript
interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: (((value: T) => (PromiseLike<TResult1> | TResult1)) | undefined | null), onrejected?: (((reason: any) => (PromiseLike<TResult2> | TResult2)) | undefined | null)): Promise<TResult1 | TResult2>
  catch<TResult = never>(onrejected?: (((reason: any) => (PromiseLike<TResult> | TResult)) | undefined | null)): Promise<T | TResult>
}
```
상당히 복잡하지만 분명한 것은 then, catch 메서드를 가지고 있다는 것이다. 따라서 Promise 객체는 Object & { then(onfulfilled: infer F, ...args: infer _) : any } 를 extends 한다.  
Awaited 에서 T 가 Promise 이면 then의 첫 번째 매겨변수인 F를 infer 한다. F 가 infer 되면 다시 F가 ((value:infer V, ...args: infer _)=>any) 를 extends 하는지 확인하고, extends 한다면
첫 번째 매개변수 V를 infer 한다. 왜 연달아 두 번 infer 하는지 실제 코드 예시를 보면 쉽게 알 수 있다.
```typescript

```

#### 규칙 2번 : Awaited<Promise<T>> === Awaited<T>


## 3.11 bind 분석하기












































