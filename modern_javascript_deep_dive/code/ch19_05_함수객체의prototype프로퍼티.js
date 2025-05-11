/*
함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.(생성자함수의 부모 객체)
 */


// 함수 객체는 prototype 프로퍼티를 소유한다.

function foo() {}

console.log(foo.hasOwnProperty('prototype')); // true
console.log(Object.getOwnPropertyDescriptors(foo)); // 프로퍼티 중에 prototype이 있다.

//일반객체
const bar = {};
console.log(bar.hasOwnProperty('prototype')); // false
console.log(Object.getOwnPropertyDescriptors(bar)); // 프로퍼티가 없다.... ㅎ

/*
prototype 프로퍼티는 생성자 함수가 생성할 객체의 프로토타입을 가리킨다. 따라서 생성자 함수로서 호출할 수 없는 함수,
즉, non-constructor인 화살표 함수와 ES6메서드 축약 표현으로 정의한 메서드는 prototype을 소유하지 않는다.

생성자 함수로 사용하지 않을 함수도 prototype 프로퍼티를 소유하지만.. 객체를 생성하지 않는 일반 함수에게는 의미가 없다.


모든 객체가 가지고 있는(Object.prototype 으로부터 상속받는) __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype
프로퍼티는 결국 동일한 프로토타입을 가리킨다. 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

__proto__ 접근자 프로퍼티 -> 모든 객체가 소유하며 객체가 자신의 프로토타입에 접근 또는 교체하기 위해서 사용된다.
prototype 프로퍼티 ->  생성자 함수 -> 생성자 함수가 사용 -> 생성자 함수가 자신의 생성할 객체의 프로토타입을 할당하기 위해 사용.
*/

function Person(name){
    this.name=name;
}
const me = new Person('lee');

console.log('---------');
console.log(Person.prototype === me.__proto__);  // true


// me 객체의 생성자 함수는 Person 이다.
console.log(me.constructor === Person); // true

/*
me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있다.
따라서 me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용한다.
 */