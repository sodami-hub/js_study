/*
객체 instanceof 생성자 함수

우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고
그렇지 않으면 false로 평가된다.

아래와 같이 instanceof 연산자는 프로토타이브이 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라
생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.
 */

function Person(name) {
    this.name=name;
}

const me = new Person('lee');

const parent = {};

// me 객체의 prototpe을 parent로 교체한다.
Object.setPrototypeOf(me,parent);

console.log(me instanceof Person) // false
// -> 인스턴스에 의한 프로토타입의 교체로인해서 생성자 함수와 프로토타입의 연결이 파괴됐다.


// Person 생성자 함수와 parent는 연결되지 않음
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person) // false

//parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;

// Person.prototype 이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

//Object.prototype 이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true