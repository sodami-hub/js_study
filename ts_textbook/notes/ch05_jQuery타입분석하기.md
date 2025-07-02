# 5장 jQuery 타입 분석하기

jQuery는 브라우저의 DOM을 쉽게 조작할 수 있도록 다양한 API를 제공하는 라이브러리로 리액트나 뷰 등의 라이브러리에 밀려 점점 사용량이 줄어드는 추세이지만
여전히 사용하고 있다.  
jQuery 라이브러리를 npmjs.com 에서 검색해보면 이름 우측에 DT 표시가 있다. 자체 타입스크립트 지원은 없지만 커뮤니티 타입이 존재하고, @types/jquery 패키지를
추가로 설치해야 한다는 의미이다.  
프로젝트 루트에 jquery와 @types/jquery 패키지를 설치한다.
```
> yarn add jquery@3.6.3 @types/jquery@3.5.16
```
버전을 명시해서 동일한 코드를 분석할 수 있도록 한다. node_modules/@types/jquery 디렉터리에 들어가면 .d.ts 파일들이 있다. 확장자가 d.ts 인 이유는 타입 선언만
갖고 있는 파일이기 때문이다. 어떤 파일을 봐야 할까? package.json을 열어 types 속성을 확인하면 된다.
```
...
"types":"index.d.ts",
...
```
여기에 적힌 파일이 제일 처음 봐야 할 파일이다. 이 파일을 진입점 파일이라고 부른다.
```typescript
// TypeScript Version: 2.7

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```
주석은 대부분 무시해도 된다. 다만 TypeScript Version:2.7 은 중요한 내용을 포함하고 있다. 해당 패키지는 타입스크립트 2.7 버전 이상에서만 정상 작동한다는
뜻이다. `///<reference types /> 와 ///<reference path / >` 두 가지 주석도 있다. 삼중 슬래시 지시어라고 부르는 것이다.  
`///<reference types />` 는 지금 이 패키지가 참고하는 패키지를 가리킨다. 현재 sizzle 이라고 적혀 있으므로 @types/sizzle 패키지의 타입을 참고하고 있다는 뜻이다.
@types 디렉터리에 sizzle 패키지도 있다.  
`///<reference path />` 는 지금 이 패키지가 참고하는 파일을 가리킨다. 이들은 @types/jquery 폴더 안에 들어있다. 마지막 export = jQuery 는 다음 절에서
배워보겠다.  
이제 분석할 코드를 입력해보겠다. /jquery 디렉터리에 test.ts 파일을 생성하고 아래 코드를 작성한다.
```typescript
$("p").removeClass("myClass noClass").addClass("yourClass");

$(["p","t"]).text("hello");

const tag = $("ul li").addClass(function(index) {
  return "item-"+index;
})

$(tag).html(function(i:number){
  console.log(this);
  return $(this).data('name')+'입니다.';
})
```
코드가 실제 어떤 의미인지 몰라도 된다. 어떻게 타이핑되어 있는지만 분석해볼 것이다.  
먼저 1행에서 $ 함수를 어떻게 사용할 수 있는지 알아보겠다. `$` 인텔리제이에서 F4를 눌러서 선언으로 넘어가보면
```typescript
/// misc.d.ts
//...
declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;
//...
```
declare 예약어로 $ 와 jQuery 변수가 선언되어 있다. 구현부는 없는 대신 타입 선언만 하고 싶을 때 declare 예약어를 사용한다. 그렇다면 실제 구현부는 어디에 있을까?
node_module/jquery/dist/jquery.js 나 node_module/jquery/dist/jquery.min.js 에 있다.     
이번에는 JQueryStatic 인터페이스를 확인해보겠다. 하지만 코드가 상당히 많아서 어떤 부분이 $ 함수의 타입인지 알기 어렵다. 함수에 대한 오버로딩도 여러 개 있다.
이 중에서 어떤 것에 해당하는지 알아내야 한다. 다시 test.ts 파일의 $ 함수의 정의를 찾아보겠다. 인텔리제이에서 ctrl + 해당함수($) 를 클릭하면 넘어갈 수 있다.
```typescript
// node_module/@types/jquery/JQueryStatic.d.ts
interface JQueryStatic {
//...
<TElement extends HTMLElement = HTMLElement>(html: JQuery.htmlString, ownerDocument_attributes?: Document | JQuery.PlainObject): 
  JQuery<TElement>;
//...
}
```
$ 함수의 매개변수는 html: JQuery.htmlString 이고, 반환값은 `JQuery<TElement>` 이다. htmlString은 string 이다. 그래서 $("p") 처럼 매개변수로 string을 넣을 수 있다.  
프로그래밍할 때는 다양한 패키지를 사용하게 된다. jquery 패키지에 htmlString 이라는 타입이 있는데, 다른 패키지에도 같은 타입이 있다면 충돌이 발생한다. 그래서 충돌하지 않게
다른 네임스페이스를 부여하곤 한다. 여기서는 JQuery 라는 네임스페이스를 만들어 JQuery.htmlString 으로 접근하게 했다. 단순한 string 타입이지만 html 문자열이라는 의미를
추가하기 위해서 구체적인 타입 별칭을 선언한 것이다. 네임스페이스를 만드는 것은 declare namespace 로 할 수 있다.  
    
이번에는 반환값의 타입인 Jquery<TElement>를 분석해보겠다. 먼저 TElement 제네릭 타입 매개변수를 보겠다. TElement 타입 매개변수에는 HTMLElement 타입 제약이 걸려있고, 기본값도
HTMLElement 이다. 정의를 보면 다음과 같다.
```typescript
// lib.dom.d.ts
// 모든 HTML 요소
interface HTMLElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
  // ...
}
```
JQuery 타입이 무엇인지 보겠다. 정의를 보면 다음과 같다.
```typescript
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  //...
}
```
엄청 많은 코드가 보인다. JQuery는 Iterable<TElement>를 상속하는 인터페이스인데 Iterable 타입이 무엇인지는 지금은 찾아볼 필요없다.  
다시 test.ts 파일로 돌아가보겠다.
```typescript
$("p").removeClass("myClass noClass").addClass("yourClass");
//...
```
$("p")의 반환값이 `JQuery<HTMLElement>` 라는 것을 알았다. 이제 removeClass 메서드가 `JQuery<HTMLElement>` 인터페이스에 존재하는지 확인하면 된다.
removeClass의 정의를 보면
```typescript
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  //...
  removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;
  //...
}
```
여기서는 className_function 인수가 `JQuery.TypeOrArray<string>`이거나 ((this: TElement, index: number, className: string) => string) 임을 알 수 있다.
실제 인수인 "myClass noClass"는 함수가 아니므로 `JQuery.TypeOrArray<string>` 임을 추측할 수 있다.  
반환값 타입이 this 이므로 메서드 체이닝이 가능하다. addClass 또한 jQuery 인터페이스 안에 들어 있다. addClass 메서드의 타입은 removeClass 메서드와 동일하다.  
  
이어서 test.ts 3행 코드를 살펴보겠다.
```typescript
$(["p","t"]).text("hello");
```
$ 함수의 인수로 문자열대신 배열이 들어갔다. 이전과는 다른 함수 오버로딩이 선택될 것이라 추측할 수 있다. 해당 함수의 정의로 이동해보겠다.
```typescript
interface JQueryStatic {
  <T extends JQuery.PlainObject>(object: T): JQuery<T>;
}
```
타입 매개변수 T에는 Jquery.PlainObject 제약이 걸려 있다. 해당 타입은 다음과 같다.
```typescript
declare namespace JQuery {
    //...
    interface PlainObject<T = any> {
      [key: string]: T;
    }
    //...
}
```
PlainObject 는 일반적인 객체를 의미한다. 배열도 객체이므로 제약을 충족한다. 반환값의 타입은 JQuery<string[]> 이 된다. text 메서드도 JQuery 인터페이스에 있다.  
  
앞서 removeClass(addClass) 메서드의 타입을 보고 인수로 함수를 넘길 수도 있음을 알게 됐다. 따라서 다음과 같은 코드도 작성이 가능하다.
```typescript
// test.ts
const tag = $("ul li").addClass(function(index) {
  return "item-"+index;
})
```
```typescript
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  addClass(className_function: JQuery.TypeOrArray<string> | ((this: TElement, index: number, currentClassName: string) => string)): this;
}
```
매겨변수로 number인 index를 가지는 함수를 사용한 코드이다. 이때 반환값은 string 이어야 한다.  
함수 내부에서 this까지 사용한 코드는 다음과 같다
```typescript
// test.ts
$(tag).html(function(i:number){
  console.log(this);
  return $(this).data('name')+'입니다.';
})
```
$(tag)가 가능하지 확인하려면 JqueryStatic 인터페이스의 오버로딩을 확인해야 한다. 
**이하 생략**


## 5.1 jQuery 직접 타이핑하기
직접 타입을 만드는 것은 이미 있는 패키지의 타입을 .d.ts 파일로 분석하는 것보다 훨씬 어렵다. 그리니 이번에는 jQuery  라이브러리의 타입을 직접 만들어보겠다.
다만 이미 JQuery 인터페이스와 JQueryStatic 인터페이스를 알고 있으므로, 그대로 따라 하지 않고 최대한 간단히 만들어 보겠다.   
jquery 디렉터리 안에 zquery.ts 파일을 만들고 다음 코드르 입력한다.
```typescript
interface zQuery {}

declare const Z: zQuery;

Z("p").removeClass("myClass noClass").addClass("yourClass");

Z(["p","t"]).text("hello");

const tag2 = Z("ul li").addClass(function(index) {
  return "item-"+index;
})

Z(tag2).html(function() {
  console.log(this);
  return Z(this).data('name') + ' 입니다.'
})
```
이제 zQuery 인터페이스를 수정하여 코드에 에러가 없도록 만들면 된다. 먼저 Z 에 발생하는 에러를 없애 보겠다. 함수를 타이핑하면 된다.
```typescript
interface zQuery {
  (tag:string | string[]):zQueryInstance;
}
interface zQueryInstance {}

//... 아래 동일
```
함수를 타이핑하고 나면 에러의 위치가 변견된다. 주의할 점은 tag2 변수의 타입이 any 라는 점이다. 이 부분은 에러가 아니지만 해결해야 한다.  
zQuery 인터페이스가 JQueryStatic 인터페이스에서 봤던 오버로딩과 다르다고 생각할 수 있다. 다르긴 하지만 타입 에러만 사라진다면 문제 없다. 
타이핑은 제대로 했는지 확신하기 매우 어려우므로, 항상 에러가 없는 정도로만 타이핑하고 에러가 발생한다면 수정하면 된다.  
Z(tag), Z(this) 에서도 에러가 발생하지만, 먼저 메서드들 위주로 간단하게 타이핑해보겠다.

```typescript
interface zQuery {
  (tag:string | string[]):zQueryInstance;
}
interface zQueryInstance {
  removeClass(param:string):this;
  addClass(param:string):this;
  text(param:string):this;
  html(param:string):this;
  data(param:string):this;
}
```
많은 에러가 해결됐다. addClass 메서드의 반환값 타입을 this로 함으로써 tag2 변수의 타입이 zQueryInstance가 되었다. 대신 이로 인해 Z(tag2)에
새로운 에러가 발생한다.  
이제 Z 함수에 tag나 this를 넣는 부분, addClass,html 메서드에 함수 인수를 넣는 부분, html 메서드 안에서 this를 사용하는 부분을 타이핑한다.
```typescript
interface zQuery {
  (tag:string | string[]):zQueryInstance;
  (tag:zQueryInstance):zQueryInstance;
}
interface zQueryInstance {
  removeClass(param:string):this;
  addClass(param:string):this;
  addClass(callBack:(this:zQueryInstance,index:number)=>string):this;
  text(param:string):this;
  html(param:string):this;
  html(callBack:(this:zQueryInstance, index:number)=>string):this;
  data(param:string):this;
}
```
Z 함수가 zQueryInstance 인수를 받을 수 있도록 오버로딩을 추가했고, addClass와 html 메서드에도 인수가 함수인 경우에 해당하는 오버로딩을 추가했다.
또한 this의 타입도 zQueryInstance로 추가했다.  
이렇게 모든 에러가 사라졌다. 지금 만든 타입은 @types/jquery 패키지의 타입과 많이 다르다. 제네릭도 전혀 사용하지 않았다. 이처럼 사람마다 타이핑 방법이
완전히 다를 수 있다. **에러가 없도록 최소한으로만 타이핑하고 나중에 에러가 발생하면 그때 다시 정확하게 타이핑하여 해결하면 된다.**

## 5.2 export = 타입 이해하기
index.d.ts 마지막에 있는 export = jQuery 의 의미에 대해 알아보겠다.
```typescript
// node_modules/@types/jquery/index.d.ts
// ...
export = jQuery;
```
jQuery 는 misc.d.ts 에 있는 변수이다. `/// <reference path="misc.d.ts"/>` 주석이 있어서 접근이 가능하다.
```typescript
// node_modules/@types/jquery/misc.d.ts
//...
declare const jQuery:JQueryStatic;
declare const $: JQueryStatic;
//...
```
다음으로 `export =` 이다. 이 부분은 무엇을 의미하는 것일까? 일단 이 문법은 CommonJS 모듈 시스템의 module.exports 문법도 아니고, ECMAScript 모듈 시스템의
export default 문법도 아니다.  
이 문법은 타입스크립트에만 있는 문법으로 CommonJS 문법을 사용하기 위해 존재한다. 따라서 `const $ = require('jquery')` 로 jquery 패키지를 import 할 수 있다.
다만 타입스크립트에서는 require로 import 할 수 없으므로 다른 방식을 찾아야 한다. 사용할 수 있는 방법은 `import $ from 'jquery'` 로 import 하는 것이다.  
이 방식은 ECMAScript 모듈 시스템의 import 방식인데 어떻게 CommonJS 모듈인 jquery 패키지를 import 할 수 있을까? tsconfig.json 에서 esModuleInterop 옵션이 true로
설정되어 있기에 가능하다. 이 설정이 false 인 경우를 위해서 타입스크립트는 CommonJS 모듈을 위해 다음과 같은 문법을 준비해두었다
```typescript
import $ = require('jquery');
```

## 5.3 스크립트 파일과 모듈 파일 이해하기
여기서 test.ts 에서는 import 문이 없었는데도 `$` 함수를 사용할 수 있었다. 이는 타입스크립트에서 misc.d.ts 파일을 스크립트 파일로 인식했기 때문이다.  
파일 내부에서 최상위 스코프에 import나 export 예약어가 없으면 스크립트 파일이 된다. 반대로 import, export 예약어가 있으면 모듈 파일이 된다.  
인터페이스와 네임스페이스는 병합되는 특성이 있어서 문제가 될 수 있다고 했다. 모듈 파일은 인터페이스나 네임스페이스의 이름이 같아도 합쳐지지 않는다.
  
모듈 파일의 이해를 위해 module1.ts, module2.ts, module3.ts 파일을 만들고 코드를 작성해보겠다.
```typescript
// module1.ts
export interface Test {
  name: string;
}

export default function() {
  console.log('default export')
}

// module2.ts
export interface Test {
  name2:string;
}

// module3.ts
import * as module1 from './module1';
import * as module2 from './module2';

const ex1:module1.Test = {
  name:"hi",
  name2:"error",
}
const ex2:module2.Test = {
  name:'error',
  name2:'hi',
};
module1.default();
```
1,2에 Test 인터페이스가 있지만 서로 합쳐지지 않는다. 

```typescript
//module4.ts
interface Name {
  first:string,
  last:string,
}

interface Age {
  korean:number;
  american:number;
}

export type { Age };
export default Name;

//module5.ts
import type Name from './module4'
import type { Age } from './module4';

const name:Name = {
  first:'1',
  last:'2'
}
const age:Age = {
  american:12,
  korean:3,
}

```
Age를 named export 할 때 export 대신 export type 을 사용할 수 있다. export 하는 대상이 값이 아니라 타입임을 명시한 것이다. 반대로 default인
Name 을 import 하거나 Age를 named import 할 때는 import type을 사용할 수 있다. 마찬가지로 import 하는 대상이 값이 아니라 타입임을 명시한 것이다.
이를 Type-Only imports/exports 라고 한다.  
주의할 점은 import type Name, { Age } 처럼 default import 와 named import를 한 번에 할 수 없다.

## js 파일 생성하기
```
> tsc test.ts
```
















































