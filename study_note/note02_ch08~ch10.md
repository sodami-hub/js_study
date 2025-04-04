## ch08 - 제어문
### 8.1 블럭문
0개 이상의 문을 중괄호로 묶은 것으로, 코드 블럭 또는 블럭이라고 부른다.자스는 블럭문을 하나의 실행 단위로 취급한다. 블록문을 단독으로 사용할 수 있으나
일반적으로는 제어문이나 함수를 정의할 때 사용한다. 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에 세미콜론을 붙이지 않는다.

### 8.2 조건문
#### 8.2.1 if... else 문
#### 8.2.2 switch 문

### 8.3 반복문
✨반복문을 대체할 수 있는 다양한 기능 - 자스는 배열을 순회할 때 사용하는 forEach 메서드, 객체의 프로퍼티를 열거할 때 사용하는 for...in 문,
ES6 에서 도입된 이터러블을 순회할 수 있는 for...of 문 과 같은 반복문을 대체할 수 있는 다양한 기능을 제공한다. 이에 대해서는 뒤에서 살펴본다.
#### 8.3.1 for 문
#### 8.3.2 while 문
#### 8.3.3 do...while 문

### 8.4 break 문
break 문은 코드 블록을 탈출한다. 더 정확하게는 레이블 문, 반복문(for, for...in, forEach, for...of, while, do...while) 또는 switch 문의
코드 블럭을 탈출한다. 위의 반복문 외에 break 문을 사용하면 SyntaxError 가 발생한다.
```javascript
// foo 라는 식별자가 붙은 레이블 블록문
foo : {
  console.log(1);
  break foo; // foo 레이블 블록을 탈출한다.
  console.log(2);
}
console.log('done')
```
이 밖에도 레이블 문은 중첩된 for 문의 내부 for 문에서 break 문을 사용하면 내부 for 문을 탈출한다. 이때 외부 for 문을 탈출하려면 레이블 문을 사용한다.
하지만 일반적으로 권장하지 않는다.

### 8.5 continue 문
반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. break 문처럼 반복문에서 탈출하지 않는다.

--------------------------------

## ch09 - 타입 변환과 단축 평가
### 9.1 타입 변환이란?
모든 값은 타입이 있다. 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환할 수 있다. 개발자가 의도적으로 값의 타입을 변환하는 것을 명시적 타입 변환,
타입 캐스팅이라 한다. 그리고 개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다.
이를 암묵적 타입 변환, 강제 타입 변환이라고 한다. **_중요한 것은 코드를 예측할 수 있어야 한다._**

### 9.2 암묵적 타입 변환
```javascript
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10'+2 // '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5*'10' // 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0 // true
if (1) {} 
```
위와 같이 표현식을 평가할 때 코드의 문맥에 부합하지 않는 다양한 상황이 발생할 수 있다. 이 때 자스는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해서
표현식을 평가한다.
#### 9.2.1 문자열 타입으로 변환
#### 9.2.2 숫자 타입으로 변환
```javascript
1-'1' // 0
1*'10' // 10
1/ 'one' // NaN
```
위 예제의 연산자는 모두 산술연산자다. 산술 연산자의 역할은 숫자 값을 만드는 것이다. 따라서 산술 연산자의 모든 피연산자는 모두 숫자 타입이어야 한다.
따라서 자스 엔진은 산술 연산자의 표현식을 평가하기 위해서 피연산자를 숫자 타입으로 암묵적 타입 변환한다. 이때 피연산자를 숫자 타입으로 변환할 수 없는 경우는
평가 결과를 NaN을 반환한다.
```javascript
'1' > 0 // true
```
산술 연산자 뿐 아니라 위와 같은 경우에도 숫자 타입으로 암묵적 타입 변환이 일어난다.
#### 9.2.3 불리언 타입으로 변환
자스 엔진은 불리언 타입이 아닌 값을 Truthy 값 또는 Falsy 값 으로 구분한다. 즉, 제어문의 조건식과 같이 불리언 값으로 평가되어야 할 문맥에서
Truthy 값은 true 로 Falsy 값은 false 로 암묵적 타입 변환된다. 다음의 값들은 false로 평가된다.
```
false, undefined, null, 0, -0, NaN, ''(빈 문자열)
```

### 9.3 명시적 타입 변환
명시적으로 타입을 변경하는 방법은 다양하다. 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법,
앞에서 살펴본 암묵적 타입 변환을 이용하는 방법이다.
#### 9.3.1 문자열 타입으로 변환
1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. Object.prototype.toString 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법
```javascript
//1
String(1); // '1'
String(NaN) // 'NaN'
String(Infinity) // 'Infinity'
String(true) // 'true'

//2
(1).toString(); // '1'
(NaN).toString();  // 'NaN'

//3
1+''; // '1'
NaN+''; // 'NaN
```
#### 9.3.2 숫자 타입으로 변환
1. Number 생성자 함수를  new 연산자 없이 호출하는 방법
2. ParseInt, ParseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
3. `+` 단항 산술 연산자 사용
4. `*` 산술 연산자를 이용하는 방법

#### 9.3.3 불리언 타입으로 변환
1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두 번 사용하는 방법

### 9.4 단축 평가
#### 9.4.1 논리 연산자를 사용한 단축 평가
7.5 절 '논리 연산자' 에서 설명하지 않은 내용이 있다. 그것은 바로 '논리합(||) 또는 논리곱(&&)' 연산자 표현식의 평가 결과가 불리언 값이 아닐 수 있다는 것이다.
이 두 연산자는 언제나 두개의 피연산자 중 어느 한쪽으로 평가된다는 것이다.
```javascript
'Cat' && 'Dog' // Dog
'Cat' || 'Dog' // Cat
```
아래와 같이 단축 평가가 일어난다.
```
true || any  // true
false || any // any
true && anything // anything
false && anything // false
```
다음과 같은 단축 평가의 유용한 패턴이 있다.
1. 객체를 가리키기를 기대하는 변수가 null 또는 undefined 가 아닌지 확인하고 프로퍼티 참조할 때
2. 함수 매개변수에 기본값을 설정할 때

#### 9.4.2 옵셔널 체이닝 연산자
ES11(ECMAscript2020)에서 도입된 옵셔널 체이닝 연산자 ?. 는 좌항의 피연산자가 null 또는 undefined 인 경우 undefined 를 반환하고,
그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
논리 연산자 && 는 좌항 피연산자가 Falsy 값 이면 좌항 피연산자를 그대로 반환한다. 하지만 0이나 ''은 객체로 평가될 때도 있기 때문에 옵셔널 체이닝
연산자를 사용한다.
```javascript
var str = '';
var length = str && str.length;   
console.log(length); // undefined
```
```javascript
var str = '';
var length = str?.length; // str 이 Falsy 값이지만 우항의 프로퍼티 참조를 이어간다.   
console.log(length); // 0
```

#### 9.4.3 null 병합 연산자
ES11 에서 도입된 null 병합 연산자 `??`는 좌항의 피연산자가 null 이나 undefined 인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 
피연산자를 반환한다. 변수에 기본값을 설정할 때 유용하다.  
이것도 `||` 연산자를 사용했을 때 0또는 ''와 같이 기본값으로 유효한 값에 대해서 사용했을 때 예기치 않은 동작이 발생할 수 있기 때문에 사용된다.

--------------------------------------------

## ch10 - 객체 리터럴
### 10.1 - 객체란?
자스는 객체(object) 기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 "모든 것"이 객체다. 원시 값을 제외한 나머지 값은 모두 객체다. 또한
**원시 타입의 값, 즉 원시 값은 변경 불가능한 값(immutable value)이지만 객체 타입의 값, 즉 객체는 변경 가능한 값(mutable value)이다.**  
객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다. 자스에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. 자스의 함수는
일급 객체이므로 값으로 취급할 수 있다. 따라서 함수도 프로퍼티 값으로 사용할 수 있다. 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드라 부른다.
✨객체와 함수 : 자스의 객체는 함수와 밀접한 관계를 가진다. 함수로 객체를 생성하기도 하며 함수 자체가 객체이기도 하다. 자스에서 함수와 객체는 분리해서
생각할 수 없는 개념이다. 즉, 객체를 이해해야 함수를 제대로 이해할 수 있고, 반대로 함수를 이해해야 객체를 이해할 수 있다.

### 10.2 - 객체 리터럴에 의한 객체 생성
자스는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성방법을 지원한다.
1. 객체 리터럴
2. Object 생성자 함수
3. 생성자 ㅎ마수
4. Object.create 메서드
5. 클래스(ES6)

가장 일반적이고 간단한 방법이 객체 리터럴을 사용하는 방법이다. 객체 리터럴은 중괄호({...}) 내에 0개 이상의 프로퍼티를 정의한다. 변수에 할당되는
시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성한다. 만약 중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 된다.  
**객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다는 데 주의해야 한다.** 객체 리터럴은 값으로 평가되는 표현식이다. 따라서 세미콜론을 붙인다.  
객체 리터럴은 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 방식이다.

### 10.3 프로퍼티
**객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.**
- 프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값 : 자바스크립트에서 사용할 수 있는 모든 값

프로퍼티 키는 식별자 역할을 한다. 하지만 반드시 식별자 네이밍 규칙을 따라야 하는 것은 아니다. 심벌값도 프로퍼티 키로 사용할 수 있지만 일반적으로
문자열을 사용한다. 정리 하면 식별자 네이밍 규칙을 따르지 않거나 심벌값을 프로퍼티 키로 사용하는 경우에는 반드시 따옴표를 사용해야 한다.

### 10.4 메서드
자스에서 사용할 수 있는 모든 값은 프로퍼티 값으로 사용할 수 있다. 함수는 일급 객체다. 따라서 함수는 값으로 취급할 수 있기 때문에 값으로 사용할 수 있다.
프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다. 즉, 메서드는 객체에 묶여 있는 함수를 의미한다.

### 10.5 프로퍼티 접근
1. 마침표 프로퍼티 접근 연산자(.)를 사용하는 마침표 표기법
2. 대괄호 프로퍼티 접근 연산자([])를 사용하는 대괄호 표기법

프로퍼티 키가 식별자 네이밍 규칙을 준수하는 이름이라면 위의 두가지 방법으로 프로퍼티에 접근할 수 있다. 대괄호 표기법을 사용하는 경우에 
대괄호 내부에 식별자는 따옴표로 감싼 형태로 사용한다. 즉 프로퍼티 키가 식별자 네이밍 규칙을 따르지 않는 경우에는 마침표 표기법으로 프로퍼티 값에
접근할 수 없다. **객체에 존재하지 않는 프로퍼티에 접근하면 undefined를 반환하는 것에 주의한다.**

### 10.6 프로퍼티 값 갱신
이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

### 10.7 프로퍼티 동적 생성
존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 값이 할당 된다.

### 10.8 프로퍼티 삭제
delete 연산자는 객체의 프로퍼티를 삭제한다.
```javascript
var person = {age:12, name:'lee'};
delete person.name;
```

### 10.9 ES6에서 추가된 객체 리터럴의 확장 기능
#### 10.9.1 프로퍼티 축약 표현
#### 10.9.2 계산된 프로퍼티 이름
#### 10.9.3 메서드 축약 표현

















































