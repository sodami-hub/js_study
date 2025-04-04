/*
자스 객체의 분류
1. 표준 빌트인 객체
2. 호스트 객체 - 브라우저 환경(DOM,BOM,Canvas, ...), Node.js(Node.js 고유 API) ...
3. 사용자 정의 객체



표준 빌트인 객체
ECMAScript 사양에 정의된 객체. 애플리케이션 전역의 공통 기능을 제공한다.
자스 실행환경(브라우져, Node.js 환경)과 관계없이 언제나 사용할 수 있다.
전역 객체의 프로퍼티로서 제공된다. 따라서 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있다.

Object, String, Number, Boolean, Symbol, Date, Math, RegExt, Array, Map/Set, WeakMap/WeakSet,
Function, Promise, Reflect, Proxy, JSON, Error 등 40여 개의 표준 빌트인 객체를 제공한다.

Math, JSON, Reflect를 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체다.

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체다.

 */

const strObj = new String('lee'); // String {"lee"};

console.log(Object.getPrototypeOf(strObj) === String.prototype); // true

/*
표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다.
그리고 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공한다.
*/

const numObj = new Number(1.5);

//toFixed는 Number의 프로토타입 메서드이다. 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드이다.
console.log(Number.isInteger(1.5)); // false

