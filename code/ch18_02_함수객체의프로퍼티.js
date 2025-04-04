function square(number) {
    return number**number;
}

console.dir(square);

/* 브라우저에서의 결과값
ƒ square(number)
arguments : null
caller : null
length : 1
name : "square"
prototype: {}
[[FunctionLocation]]: VM20:1
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[1]
 */

console.log(Object.getOwnPropertyDescriptors(square));

/*
{length: {…}, name: {…}, arguments: {…}, caller: {…}, prototype: {…}}
arguments:{value: null, writable: false, enumerable: false, configurable: false}
caller:{value: null, writable: false, enumerable: false, configurable: false}
length:{value: 1, writable: false, enumerable: false, configurable: true}
name:{value: 'square', writable: false, enumerable: false, configurable: true}
prototype:{value: {…}, writable: true, enumerable: false, configurable: false}
[[Prototype]]:Object
*/

/*
arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다.
일반 객체에는 없는 함수 객체 고유의 프로퍼티다.

arguments - 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역변수처럼 사용됨.
caller - ECMAScript 사양에 포함되지 않은 비표준 프로퍼티, 표준화될 예정도 없으므로 참고로만 알아둔다. 함수 자신을 호출한 함수를 가리킨다.
length - 함수를 정의할 때 선언한 매개변수의 개수!!
name - ES6에서 표준이 됨. ES6부터는 익명 함수의 경우 함수 객체를 가리키는 식별자를 값으로 갖는다.
prototype - 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티다.
일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 없다.

__proto__ 접근자 프로퍼티
[[Prototype]] - 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 갖는다. __proto__ 프로퍼티는 [[Prototype]] 내부 슬롯이
가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티이다.
 */

const arrow = () => {};
console.dir(arrow);
/*
========= 화살표 함수(non-constructor)에는 prototype 프로퍼티가 없다.
arrow()
length:0
name:"arrow"
arguments:(...)
caller:(...)
[[FunctionLocation]]:VM289:1
    [[Prototype]]:ƒ ()
    [[Scopes]]:Scopes[2]
*/
