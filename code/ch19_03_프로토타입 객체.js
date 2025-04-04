/*
프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다.
프로토타입을 상속받는 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다.
[[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 즉 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다.

모든 객체는 하나의 프로토탕비을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근할 수 있다.

프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고,
생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있다.
 */

const person ={
    name:'lee'
}
/*
위 person 객체를 크롬 브라우저의 콘솔에서 출력해보자.
콘솔에서 person을 출력해서 [[Prototype]] 의 값을 들여다보는 것과
person.__proto__ 의 값이 같은 것을 볼 수 있다.
 */

// __proto__ 는 접근자 프로퍼티다.

const obj = {};
const parent = {
    x:1
};

console.log(obj.hasOwnProperty('__proto__'));  //  false 객체는 기본적으로 __proto__ 프로퍼티를 소유하지 않는다.

// getter 함수인 get __proto__ 가 호출되어 obj 객체의 프로토타입을 취득
console.log(obj.__proto__);
// 이 과정에서 자동으로 setter 함수인 set __proto__ 가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;
console.log(obj.__proto__);

console.log(obj.x);