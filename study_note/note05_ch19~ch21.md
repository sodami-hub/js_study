## ch19 - 프로토타입
자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의
객체 지향 프로그래밍 언어다

### 19.1 객체지향 프로그래밍
속성(상태)와 기능(동작). 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조라고 할 수 있다. 이때 객체의 상태를
프로퍼티, 동작을 메서드라 부른다.

### 19.2 상속과 프로토타입
`19.2.js` 생성자 함수는 동일한 프로퍼티(메서드 포함) 구조를 갖는 객체를 여러 개 생성할 때 유용하다. 하지만 문제가 있다. 메서드의 경우
중복해서 생성되게 된다. 상속을 통해 불필요한 중복을 제거한다. 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

### 19.3 프로토타입 객체
프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다. 
**모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.**  
객체는 [[Prototype]] 내부 슬롯에 직접 접근할 수 없지만. __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근할 수 있다.
그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype(생성자함수에만 있는 프로퍼티) 
프로퍼티를 통해 프로토타입에 접근할 수 있다.

#### 19.3.1 __proto__ 접근자 프로퍼티
모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.
- __proto__ 는 접근자 프로퍼티다 : 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수다.
- __proto__ 접근자 프로퍼티는 상속을 통해 사용된다. : 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype 의 프로퍼티다. 모든 객체는 상속을 통해 Object.prototype.__proto__ 프로퍼티를 사용한다.
- __proto__ 접근자 프로퍼티를 사용하는 이유 : 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다. 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.
- __proto__ 접근자 프로퍼티는 코드 내에서 직접 사용하는 것은 권장되지 않는다. 아래와 같이 Object.getPrototypeOf(), setPrototypeOf() 메서드를 사용한다.
```javascript
const obj = {};
const parent = {x:1};

console.log(Object.getPrototypeOf(obj)); // obj.__proto__;
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;
console.log(Object.getPrototypeOf(obj)); // parent
console.log(obj.x); // 1
```

#### 19.3.2 함수 객체의 prototype 프로퍼티
함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

#### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자함수
모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자함수를 기리킨다.

### 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
- 객체 리터럴 / 생성자 함수 : Object
- 함수 리터럴 / 생성자 함수 : Function
- 배열 리터럴 / 생성자 함수 : Array

### 19.5 프로토타입의 생성시점

### 19.6 객체 생성 방식과 프로토타입의 결정

### 19.7 프로토타입 체인

### 19.8 오버라이딩과 프로퍼티 섀도잉

### 19.9 프로토타입의 교체

### 19.10 instanceof 연산자
instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 **생성자 함수의 prototype에 바인딩된
객체가 프로토타입 체인 상에 존재하는지 확인한다.**

### 19.11 직접 상속

### 19.12 정적 프로퍼티/메서드 ????

### 19.13 프로퍼티 존재 확인
#### 19.13.1 in 연산자
in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.
```javascript
const person = {
    name:'lee',
    address:'seoul'
};

console.log('name' in person);  //true
console.log('age' in person);   //false
console.log('constructor' in person);  // true // 상속받은 프로토타입의 프로퍼티까지 열거뿐 아니라 Object.prototype의 프로퍼티도 열거
console.log('toString' in person) // true


console.log(person.hasOwnProperty('name'));     //true
```
in 연산자는 person 객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입에서 프로퍼티를 검색한다.  
ES6 에서 도임된 Reflect.has 메서드를 사용해도 똑같이 동작한다.

#### 19.13.2 Object.prototype.hasOwnProtperty 메서드
이 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true 를 반환하고 상속받은 프로토타입 프로퍼티 키인 경우 false 를
반환한다.

### 19.14 프로퍼티 열거

#### 19.14.1 for... in 문
객체의 모든 프로퍼티를 순회하며 열거하려면 for...in 문을 사용한다.
```javascript
const person = {
    name: 'lee',
    address: 'seoul'
};

console.log('toString' in person) // true

for (const key in person) {
    console.log(key + ' : ' +person[key]);
}

//name: lee
//address: seoul
```
for...in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티뿐 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다. 하지만 toString 메서드가
열거되지 않는 이유는 toString 메서드가 열거할 수 없도록 저으이된 프로퍼티이기 때문이다. 다시말해, Object.prototype.toString 프로퍼티의
프로퍼티 어트리뷰트 [[Enumerable]] 값이 false 이기 때문이다.

#### 19.4.2 Object.keys/values/entries 메서드
객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys/values/entries 메서드를 사용하는 것을 권장한다. 이 메서드들은 해당 값을 배열형태로 반환한다.
```javascript
const person = {
    name : 'lee',
    address: 'seoul',
    __proto__: {age :20}
};

console.log(Object.keys(person));

console.log(Object.values(person));

console.log(Object.entries(person));

Object.entries(person).forEach(([k,v]) => console.log(k,v))

/*
[ 'name', 'address' ]
[ 'lee', 'seoul' ]
[ [ 'name', 'lee' ], [ 'address', 'seoul' ] ]
name lee
address seoul
 */
```

-------------------------------------------------------------------------

## ch20 - strict mode

### 20.1 strict mode?
아래 예제의 실행 결과는 무엇일까?
```javascript
function foo() {
    x = 10;
}
foo();
console.log(x); //  ? 10 
```
foo 함수에서 선언한지 않은 변수 x에 값 10을 할당했다. 이때 x 변수를 찾아야 x에 값을 할당할 수 있기 때문에 자바스크립트 엔진은 스코프 체인을 통해서
변수 x를 찾는다.
foo 함수와 전역 스코프 어디에도 x로 선언된 변수는 없기 때문에 참조 에러를 발생할 것 같지만 자스는 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다.
이러한 현상을 암묵적 전역 이라 한다. 이러한 상황은 오류를 발생시키는 원인이 될 가능성이 크다. 따라서 반드시 var, let, const 키워드를 사용하여
변수를 선언한 다음에 사용해야 한다.
하지만 오타등의 개발자의 실수는 언제나 발생한다. 근본적인 실수를 방지하기 위해서 ES5 부터 strict mode 가 추가 됐다. 이 모드는 자스의 언어의 문법을 좀 더
엄격히 적용하여 오류를 발생할 가능성이 높거나 자스 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.  
ESLint 같은 도구를 사용해서 유사한 효과를 얻을 수 있다. strict mode 보다는 린트 도구의 사용이 더 강력하고 효율적이다.

### 20.2 strict mode 적용
전역의 선두 또는 함수 몸체의 선두에 'use strict'; 를 추가한다.

### 20.3 전역에 strict mode를 적용하는 것은 피하자

### 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

### 20.5 strict mode 가 발생시키는 에러
1. 암묵적 전역 : 선언하지 않은 변수를 참조하면 참조에러 발생
2. 변수, 함수, 매개변수의 삭제 : delete 연산자로 변수, 함수, 매개변수를 삭제하면 에러 발생
3. 매갭변수의 이름의 중복 : 매개변수 이름이 중복되면 에러
4. with 문의 사용 : with 문은 사용하지 않는 것이 좋다.

### 20.6 strict mode 적용에 의한 변화

---------------------------------------------------------------

## ch21 - 빌트인 객체
### 21.1 자바스크립트 객체의 분류
- 표준 빌트인 객체 : ECMAScript 사양에 정의된 객체를 말한다. 애플리케이션 전역의 공통 기능을 제공한다. 자바스크립트 실행 환경(브라우저, node)과 상관없이
언제나 사용할 수 있다. 전역 객체의 프로퍼티로 제공된다. 
- 호스트 객체 : 자바스크립트 실행환경에서 추가로 제공하는 객체를 말한다. 브라우저 환경에서는 DOM,BOM,Canvas,XMLHttpRequest,fetch,... 와 같은
클라이언트 사이드 Web API 를 호스트 객체로 제공하고, Node.js 환경에서는 고유의 API를 호스트 객체로 제공한다.
- 사용자 정의 객체 : 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.

### 21.2 표준 빌트인 객체
자스는 40여 개의 표준 빌틍니 객체를 제공한다. Math, Reflect, JSON 을 제외한 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.
생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공한다.  
예를 들어, 표준 빌트인 객체인 String, Number, Boolean, Function, Array, Date 는 생성자 함수로 호출하여 인스턴스를 생성할 수 있다.  
표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다. 예를 들어, 표준 빌트인 객체인
Number 의 prototype 프로퍼티에 바인딩된 객체, Number.prototype 은 다양한 빌트인 프로토타입 메서드를 제공한다. 이 메서드는 모든 Number 인스턴스가
상속을 통해 사용할 수 있다. 인스턴스 없이 정적으로 호출할 수 있는 정적 메서드도 제공한다. `21.2.js`


### 21.3 원시값과 래퍼 객체
문자열이나 숫자, 불리언 등의 원시값이 있는데도 문자열, 숫자, 불리언 객체를 생성하는 String, Number, Boolean 등의 표준 빌트인 생성자 함수가
존재하는 이유는 무엇일까? 다음 예제를 보면, 원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없는데 마치 String 객체처럼 동작한다.
```javascript
const str = 'hello';

// 원시 타입을 래퍼 객체인 String 인스턴스로 변환한다.
console.log(str.length); //5
console.log(str.toUpperCase()) // HELLO

// 다시 원시값으로 되돌린가.
console.log(typeof str) // string
```

### 21.4 전역 객체
전역객체는 코드가 실행되기 이전 단계에 자스 엔진에 의해 어떤 객체보다 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않은 최상위 객체이다.
이 객체는 자스 환경에 따라 이름이 제각각이다. 브라우저 환경에서는 windown(또는 self, this, frames), Node.js 환경에서는 global 이 전역 객체를
가리킨다.  
전역 객체의 특징은 다음과 같다.
- 개발자가 의도적으로 생성할 수 없다. 즉, 생성자 함수가 제공되지 않는다.
- 전역 객체를 참조할 때는 window(globla) 을 생략할 수 있다.
- 모든 빌트인 객체의 프로퍼티를 가지고 있다.
- var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당하면 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.
- let, const 로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 
- 브라우저 환경의 모든 자스 코드는 하나의 전역 객체 window 를 공유한다. 여러 개의 script 태그를 통해 코드를 분리해도 하나의 전역 객체를
공유하는 것은 변함이 없다.

#### 21.4.1 빌트인 전역 프로퍼티
- Infinity : Infinity 프로퍼티는 무한대를 나타내는 숫자값 Infinity 를 갖는다.
- NaN : NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다.
- undefined

#### 21.4.2 빌트인 전역 함수
애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드이다.
- eval : 사용을 금지해야 한다.(보안 문제)
- isFinite : 전달받은 인수가 정상적인 유한수인지 검사한다.
- inNaN
- parseFloat : 전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.
- parseInt : 전달받은 문자열 인수를 정수로 해석하여 반환한다.
- encodeURI / decodeURI : encodeURI 함수는 완전한 URI 를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다. 인코딩은 문자들을 이스케이프 처리하는
것을 의미한다. 이스케이프 처리는 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것이다.
- encodeURIComponent / decodeURIComponent : `21.4.2` URI의 일부분을 인코딩한다.

#### 21.4.3 암묵적 전역








































































