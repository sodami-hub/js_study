/*
this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

주의할 것은 동일한 함수도 다양한 방식으로 호출할 수 있다는 것이다. 함수를 호출하는 방식은 다음과 같다.
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

 */

const foo = function() {
  console.dir(this);
}

// 1. 일반 함수 호출
// 일반 함수로 호출된 모든 함수(중첩함수, 콜백 함수...) 내부의 this에는 전역객체가 바인딩된다.
foo();  // global 또는 window

//2. 메서드 호출 : 호출한 객체를 가리킴
const obj = { foo };
obj.foo(); // obj

//3. 생성자 함수 호출
new foo(); // foo {} - 생성자 함수가 생성한 인스턴스를 가리킨다.

//4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정

const bar = {name:'bar'};

foo.call(bar);   // bar
foo.apply(bar);   // bar
foo.bind(bar)();   // bar