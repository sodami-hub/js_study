## 46장 제너레이터와 async/await

### 46.1 제너레이터란?
ES6에서 도입된 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다. 제너레이터와 일반 함수의 차이는
다음과 같다.
1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

### 46.2 제너레이터 함수의 정의
제너레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 표현식을 포함한다. 이것을 제외하면 일반 함수를 정의하는 방법과 같다.

```javascript
// 제너레이터 함수 선언문
function* genDecFunc() {
    yield 1;
}

// 제너레이터 함수 표현식
const getExpFunc = function* () {
    yield 1;
} 

// 제너레이터 메서드
const obj = {
    * genObjMethod() {
        yield 1;
    }
}

// 제너레이터 클래스 매서드
class MyClass {
    * genClsMethod() {
        yield 1;
    }
}
```
애스터리스크의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다. 하지만 일관성을 위해서 function 키워드 바로 뒤에 붙이는 것을 권장한다.  
제너레이터 함수는 화살표 함수로 정의할 수 없으며, new 연산자와 함께 생성자 함수로 호출할 수 없다.

### 46.3 제너레이터 객체
**제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 제너레이터 함수가 반환한
제너레이터 객체는 이터러블이면서 동시에 이터레이터다.**  
다시 말해, 제너레이터 객체는 Symbol.iterator 메서드를 상속받는 이터러블이면서 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는
next 메서드를 소유하는 이터레이터다. 제너레이터 객체는 next 메서드를 가지는 이터레이터이므로 Symbol.iterator 메서드를 호출해서 별도로 이터레이터를
생성할 필요가 없다.

```javascript
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

// 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.
console.log(Symbol.iterator in generator);  // true
console.log('next' in generator);   // true
```
제너레이터 객체는 next 메서드를 갖는 이터레이터지만 이터레이터에는 없는 return, throw 메서드를 갖는다. 제너레이터 객체의 세 개의 메서드를 호출하면
다음과 같이 동작한다.

- next 메서드를 호출하면 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield 된 값을 value 프로퍼티 값으로, false 를 done 프로퍼티   
값으로 갖는 이터레이터 리절트 객체를 반환한다.
- return 메서드를 호출하면 인수로 전달받은 값을 value 프로퍼티 값으로, true 를 done 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```javascript
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch(e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.next());
console.log(generator.next());
// console.log(generator.throw('error!!!'));
console.log(generator.return('end'));
console.log(generator.next());

/*
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 'end', done: true }
{ value: undefined, done: true }
 */
```
- throw 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티값으로 갖는 이터레이터 리절트 객체를 반환한다.

### 46.4 제너레이터의 일시 중지와 재개
제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다. 제너레이터 함수를 호출하면 코드 블록이 실행되는
것이 아니라 제너레이터 객체를 반환한다. 제너레이터 객체의 next 메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다.  
단, 일반 함수처럼 모든 코드를 일괄 실행하는 것이 아니라 yield 표현식까지만 실행한다. **yield 키워드는 제너레이터 함수의 실행을 일시 중지하거나 yield 키워드
뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다.**  
  
제너레이터 객체의 next 메서드를 호출하면 yield 표현식가지 실행되고 일시 중지된다. 이때 함수의 제어권이 호출자로 양도된다. 이후 필요한 시점에 호출자가 다시
next 메서드를 호출하면 일시 중지된 코드부터 실행을 재개하여 다음 yield 표현식까지 실행하고 일시 중지된다.   
이터레이터의 next 메서드와 달리 제너레이터 객체의 next 메서드에는 인수를 전달할 수 있다. 제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의
yield 표현식을 할당받는 변수에 할당된다. yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가 할당되지 않는 것에 주의해야 한다.
```javascript
function* genFunc() {
    const x= yield 1;
    const y = yield (x+10);
    return x+y;
}

const generator = genFunc();

let res = generator.next();
console.log(res);
res = generator.next(11); // x = 11 할당
console.log(res);
res = generator.next(20); // y = 20 할당 // return 11+20 반환 
console.log(res);
```
제너레티어 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다.

### 46.5 제너레이터의 활용
#### 46.5.1 이터러블의 구현
제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현할 수 있다.

#### 46.5.2 비동기 처리
async/await 을 사용하면 제너레이터를 사용하지 않아도 된다.

### 46.6 async/await
제너레이터를 사용해 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있지만 코드가 무척 장황해지고, 가독성도 나빠진다. ES8(ECMAScript 2017)에서
async/await 가 도입된다.  
async/await 은 프로미스를 기반으로 동작한다. then/catch/finally 후속 처리 메서드에 콜백 함수를 전달해서 비동기 처리 결과를 처리할 필요 없이
마치 동기 처리 처럼 프로미스를 사용할 수 있다. 
```javascript
// 브라우저에서 실행
async function fetchTodo() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    
    const response = await fetch(url);  // 1.
    const todo = await response.json();   // 2.
    console.log(todo)
};

fetchTodo()
```

#### 46.6.1 async 함수
await 키워드는 반드시 async 함수 내부에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가
명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

#### 46.6.2 await 키워드
await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를
반환한다. await 키워드는 반드시 프로미스 앞에서 사용해야 한다.    
위의 예제에서 **1의 fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지 대기한다.
이후 프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res 변수에 할당된다.**

#### 46.6.3 에러 처리
비동기 처리를 위한 콜백 패턴의 단점 중 가장 심각한 것은 에러 처리가 곤란하다는 것이다. 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에
try...catch 문을 사용해 에러를 캐치할 수 없다.  
async/await 에서 에러 처리는 try...catch 문을 사용할 수 있다. 클백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는
명시적으로 호출할 수 있기 때문에 호출자가 명확하다.   
**async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject 하는 프로미스를 반환한다.**

=====================================================================

## 47장 에러처리
### 47.1 에러 처리의 필요성




























































