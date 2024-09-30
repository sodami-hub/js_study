/*
자스 엔진에 의해서 어떤 객체보다 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않는 최상위 객체이다.

전역객체는 표준 빌트인 객체와 환경에 따른 호스트 객체, 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.

특징
1. 전역 객체는 의도적으로 생성할 수 없다. 생성자 함수가 제공되지 않는다.
2. 전역 객체의 프로퍼티를 참조할 때 window(또는 global)은 생략가능하다.
 */

console.log(global.parseInt('F',16));

console.log(parseInt('F',16));

console.log(global.parseInt === parseInt); // true

foo =1;
console.log(global.foo);

// let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
// let이나 const 키워드로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재한다.

