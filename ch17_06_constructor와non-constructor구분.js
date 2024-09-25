/*
constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다.)
non-constructor : 메서드(ES6의 메서드 축약표현), 화살표 함수
주의 사항 - 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁다.
함수를 프로퍼티 값으로 사용하면 일반적으로 메서드로 통칭한다. 하지만 ECMAScript 사양에서 메서드란
ES6의 메서드 축약 표현만을 의미한다.
따라서 함수 정의 방식에 따라 구분한다.
 */

function foo() {}
const bar = function () {};

// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드가 아니다.
const baz = {
    x:function (){}
};

// 일반 함수로 정의된 함수만인 constructor이다.
new foo();
new bar();
new baz.x();

// 화살표 함수 - non-c
const arrow = () => {};

// new arrow(); // arrow is not a constructor

const obj = {
    x() {}
};

// new obj.x();  // obj.x is not a constructor

/*
주의 사항!!
생성자 함수로 호출될 것을 기대하지 않고 정의한 일반 함수에도 new를 붙여 호출하면 생성자 함수처럼 동작한다.
 */