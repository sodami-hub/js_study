// 생성자 함수에 의한 프로토타입의 교체

const Person = (function() {
    function Person(name) {
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {

        //2. 파괴된 constructor와 생성자 함수 간의 연결을 되살리는 프로퍼티
        //constructor:Person,
        sayHello() {
            console.log(`Hi! my name is ${this.name}`);
        }
    };

    return Person;
}())

const me = new Person('Lee');

console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true

/*
프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
파괴된 constructor 프로퍼티와 생성자 함수 간의 연결을 되살리는 코드가  2. 부분이다.
 */