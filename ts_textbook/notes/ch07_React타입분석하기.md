# 7장 React 타입 분석하기
React 라이브러리의 타입을 분석해보겠다. React 라이브러리는 JSX라는 특수한 문법을 사용하고 있으며, 타입스크립트도 이 문법을 지원한다. 다만 tsconfig.json 에서 따로 설정해야 한다.  
먼저 프로젝트에 리액트 라이브러리를 설치한다.  
node_modules/@types/react/index.d.ts 파일을 열어보면 react@18 패키지의 타입이고, 타입스크립트 2.8 이상이면 사용할 수 있음을 확인했다.  
react 디렉터리에 test.tsx 파일을 만들고 코드를 작성한다.
```
import React, {useState,useCallback, useRef,useEffect} from 'react';

const WordRelay = () => {
  const [word, setWord]= useState('sodami');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl= useRef(null);

  useEffect(()=>{
    console.log('useEffect');
  },[])

  const onSubmitForm = useCallback((e)=> {
    e.preventDefault();
    const input = inputEl.current;
    if(word[word.length -1] == value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      if(input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        input.focus();
      }
    }
  },[word, value])

  const onChange = useCallback((e)=>{
    setValue(e.currentTarget.value)
  },[]);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange}/>
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  )
}

export default WordRelay;
```
React 코드에서는 특이하게 함수의 return 부분에 HTML(정확히는 XML)과 비슷한 코드가 들어 있다. 이렇게 자바스크립트 코드와 HTML 코드가 섞여 있는 것이 React의 특징이다.
이러한 문법을 JSX 라고 부른다.  
기본적으로 자바스크립트나 타입스크립트는 JSX 문법을 지원하지 않으나 React가 워낙 많이 사용하는 라이브러리이므로, 타입스크립트는 따로 옵션을 만들어
설정을 변경할 경우 JSX 문법을 지원한다.  
tsconfig.json 에서 주석 처리된 jsx 속성을 찾아 주석을 해제하고, 값도 react로 변경한다. jsx 속성이 JSX 문법을 지원할지 결정하는 옵션이다. 속성 값으로 react를 입력하면
웹용 React 에서 실행하는 문법으로 변환되고, react-native를 입력하면 JSX 문법이 그대로 유지되어 React Native 플랫폼에서 실행되는 코드가 된다.  
test.tsx 를 다시 보면 JSX 부분의 에러가 해결된 것을 확인할 수 있다. 그러나 아직 매개변수 e나 input.focus() 부분에는 에러가 남아있다.  
  
첫 줄의 import 부분부터 살펴보겠다. 
```typescript
import React, {useState,useCallback, useRef,useEffect} from 'react';
```
언뜻 보면 React 라이브러리가 ECMAScript 모듈 시스템을 따르는 것으로 보인다. React 에서 정의로 이동해보면 확인할 수 있다.
```typescript
export = React;
export as namespace React;

declare namespace React { 
  //...
}
```
실제로는 export = React 로 되어 있다. 이는 jquery 패키지처럼 React도 CommonJS 모듈 시스템을 따른다는 것을 의미한다. tsconfig.json 에서
esModuleInterop 옵션이 활성회되어 있으므로 ECMAScript 모듈 시스템인 것처럼 작성할 수 있는 것이다. 이 옵션이 없다면 다음과 같이 작성해야 한다.
```typescript
import React = require('react');
// 아래와 같은 방식도 가능하다.
import * as React from 'react';
```
export as namespace React 의 역할은 무엇일까? 이는 UMD 모듈을 위한 것이다. UMD 모듈은 스크립트 파일과 모듈 파일에서 모두 사용할 수 있어야 한다.
test.tsx 는 import 와 export 가 있으므로 모듈 파일이다. 그렇다면 스크립트 파일은 script.ts 를 만들어서 테스트해보겠다.
```typescript
// script.ts
type A = React.ElementType
```
이렇게 React 네임스페이스를 바로 사용해도 에러가 발생하지 않는다. export as namespace React 가 없다면 Cannot find namespace React 라는 에러가 발생한다.
이 에러는 직접 index.d.ts 에서 export as namespace React 를 지우면 확인할 수 있다.  
현재 test.tsx 에서는 React를 사용하고 있지 않은데 왜 import React 를 하는 걸까? React를 지우면 다시 JSX 부분에 에러가 발생한다. 타입스크립트는 tsconfig.json 의 jsx 속성 값이
react 인 경우 JSX 문법을 React.createElement로 변경한다. `<div>는 React.createElement('div')`가 되는 셈이다. 실제로는 React를 쓰고 있는 셈이므로
React를 import 하지 않으면 에러가 발생한다.   
한가지 더 깊게 들어가면, React 는 17버전부터 import React를 작성하지 않아도 되게 변경됐다. React.createElement 대신 _jsx로 코드를 변경하기 때문이다.
그렇다면 _jsx 를 import 해야 한다고 생각할 수 있는데, 이것은 tsconfig.json 에 관련 속성이 있다.
```
...
"jsx" : "react-jsx"
...
```
이렇게 변경하면 타입스크립트에서 알아서 _jsx를 import 해서 에러가 발생하지 않게 된다.

## 7.1 React Hooks 분석하기
이제 useState, useEffect, useCallback, useMemo, useRef 같은 React Hooks 의 타입을 분석해보겠다. 각각의 정의로 이동해보면 다음과 같은 타입이 나온다.
```typescript
declare namespace React {
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  
  function useRef<T>(initialValue: T): MutableRefObject<T>;
  function useRef<T>(initialValue: T|null): RefObject<T>;
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  
  function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
  function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
  function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
}
```
useState, useRef는 오버로딩이 존재하고 useEffect, useCallback, useMemo 는 하나이다.

### 7.1.1 useState
useState의 오버로딩은 매개변수의 유무로 구분된다. 매개변수가 있으면 첫 번째 오버로딩에 해당되고, 없으면 두 번째 오버로딩에 해당된다. 매개변수가 있는경우 함수가 될 수 있다.
반환값은 `[S, Dispatch<SetStateAction<S>>]`이다.
```typescript
const [word, setWord]= useState('sodami');
const [value, setValue] = useState('');
const [result, setResult] = useState('');
```
현재 useState를 세 개 사용하고 있다. 전부 인수를 제공하므로 첫 번째 오버로딩에 해당된다. 인수가 문자열이므로 S는 string이 되고, value 도 string 으로 타이핑된다.
  
setWord, setValue, setResult 는 `Dispatch<SetStateAction<string>>`이다. Dispatch의 정의로 이동해보겠다.
```typescript
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;
```
Dispatch 타입 위에 SetStateAction 타입도 보인다. 둘을 조합하면 (value:string | (prevState:string)=>S) => void 가 된다.
매개변수로 문자열이나, 문자열을 반환하는 함수를 받으므로 setWord('문자열') 을 할 수 있고, setWord(prev=>prev+'문자열') 으로 할 수도 있다.  
  
useState의 두 번째 오버로딩은 다음과 같이 사용한다.
```typescript
const [value,setValue] = useState();
```
다만 value의 타입이 S의 기본값인 undefined 가 되므로 활용하기 어렵다. 그럴 때는 제네릭으로 표기한다.
```typescript
const [value,setValue] = useState<string>();
```
이제 value가 string|undefined 가 된다. 하지만 undefined 인 경우를 잘 처리해야 한다.

### 7.1.2 useRef
```typescript
declare namespace React {
    function useRef<T>(initialValue: T): MutableRefObject<T>;
    function useRef<T>(initialValue: T|null): RefObject<T>;
    function useRef<T = undefined>(): MutableRefObject<T | undefined>;
}
```
세가지 오버로딩이 존재한다. MutableRefObject, RefObject 의 차이를 파악해야 한다. 각각의 정의로 이동하면 다음과 같다.
```typescript
declare namespace React {
  interface MutableRefObject<T> {
    current: T;
  }
  
  interface RefObject<T> {
    readonly current: T | null;
  }
}
```
MutableRefObject는 current 속성을 수정할 수 있다. RefObject는 current 속성 값이 null일 수 있고, 속성 값을 수정할 수 없는 (readonly)객체이다.  
두 객체중 누가 더 넓은 타입일까? RefObject의 current가 readonly 이면서 유니언이므로 더 넓은 타입이다. T가 서로 같다면 MutableRefObject 는 
RefObject 에 대입할 수 있다.  
  
이제 test.tsx 에서 어떻게 사용되고 있는지 보겠다. input 태그의 ref 속성에 연결되어 사용되고 있다. useRef에 null을 인수로 제공하지 않으면 ref 속성에서 에러가 발생한다.
```
Type MutableRefObject<undefined> is not assignable to type LegacyRef<HTMLInputElement> | undefined
Type MutableRefObject<undefined> is not assignable to type RefObject<HTMLInputElement>
Types of property current are incompatible.
Type undefined is not assignable to type HTMLInputElement | null
```
null을 제공하지 않는경우 inputEl은 `MutableRefObject<undefined>` 라는 것을 위의 에러메시지를 통해서 알 수 있다. 또한 ref 속성에는 `LegacyRef<HTMLInputElement> | undefined` 타입이
들어와야 한다는 것도 알았다. LegacyRef 도 한번 확인해보겠따. ref 속성에서 정의로 이동하면 확인할 수 있다.
```typescript
declare namespace React {
    interface ClassAttributes<T> extends Attributes {
      ref?: LegacyRef<T> | undefined;
    }
}
```
ref 속성은 `LegacyRef<T>` 또는 undefined 타입이 들어와야 된다. LegacyRef 에서 한번 더 정의로 이동한다.
```typescript
declare namespace React {
  type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];
  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  type LegacyRef<T> = string | Ref<T>;
}
```
LegacyRef는 string 이거나 Ref 이고, Ref는 다시 `RefCallback<T> | RefObject<T> | null` 이다. RefCallback 을 객체로 착각할 수 있는데 객체가 아니다.
뒤에 ["bivarianceHack"] 이 붙었으므로 인덱스 접근 타입이다. 즉, (instance: T | null) : void 함수 타입이다. 2.19의 내용대로 RefCallback 은 이변성을 가지는 함수가 된다.
다만 지금 분석에서 RefCallback은 중요하지 않다. `MutableRefObject<undefined>`를 `LegacyRef<HTMLInputElement>` 에 대입할 수없는 이유를 찾아야 한다.  
  
`LegacyRef<HTMLInputElement>`를 구성하는 유니언 중에는 `RefObject<HTMLInputElement>`도 있다. `RefObject<HTMLInputElement>`의 current는 readonly 이자
HTMLInputElement | null 이므로 `MutableRefObject<undefined>`의 current인 undefined를 대입할 수 없다. 그러나 `MutableRefObject<null>`은 대입할 수 있다.  
그렇다면 `MutableRefObject<null>`은 어떻게 만들 수 있을까? 바로 원래 코드였던 useRef(null)을 사용하면된다. useRef(null)은 `MutableRefObject<null>` 이므로
`RefObject<HTMLInputElement>` 에도 대입할 수 있고, `LegacyRef<HTMLInputElement>` 에도 대입할 수 있다.
```typescript
declare namespace React {
  // useRef(null)  
  function useRef<T>(initialValue: T): MutableRefObject<T>;
  function useRef<T>(initialValue: T|null): RefObject<T>;
  // useRef()
  function useRef<T = undefined>(): MutableRefObject<T | undefined>;
}
```
useRef(null)은 왜 두 번째 오버로딩이 아니라 첫 번째 오버로딩에 해당될까? 2.17에서 배운것 처럼 오버로딩 순서가 영향을 끼친다. 여러 오버로딩에 해당할 수 있다면
제일 먼저 나온 오버로딩에 해당된다.  
두 번째 오버로딩을 사용하고 싶다면 다음과 같이 해야 된다.
```typescript
const inputEl= useRef<HTMLInputElement>(null);
```
이러변 T 는 HTMLInputElement 인데 initialValue는 null 이므로 첫 번째 오버로딩에 해당될 수 없다. 따라서 두 번째 오버로딩에 해당된다.  
위와 같이 수정하면 input.focus() 에러들이 제거된다. input은 inputEl.current 이다. useRef(null) 만 했을 때는 inputEl.current 가 null 이었지만
`useRef<HTMLInputElement>(null)`을 할때는 inputEl.current가 HTMLInputElement | null 이 된다. if 문을 통해서 null 이 아니므로 HTMLInputElement가 되어
focus 메서드를 사용할 수 있다.

### 7.1.3 useEffect
```typescript
declare namespace React {
  function useEffect(effect: EffectCallback, deps?: DependencyList): void;
}
```








## 7.2 JSX 타입 이해하기

## 7.3 React 직접 타이핑하기

## 7.4 js 파일 생성하기



























































