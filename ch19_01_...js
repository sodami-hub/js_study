function Person(name) {
    this.name=name;
}

let age = {
    age : 30
}
console.log('Person의 property attribute');
console.log(Object.getOwnPropertyDescriptors(Person));


Person.prototype = age;  // Person 생성자 함수의 프로토 타입을 age 객체
console.log('프로토타입 추가후 Person의 property attribute');
console.log(Object.getOwnPropertyDescriptors(Person));

console.log('age.constructor');
console.log(Person.prototype);  // // { age : 30 }   .prototype으로 프로토타입객체에 접근


console.log('======');
console.log(Object.getPrototypeOf(Person));   // {}   생성자함수는 getPrototypeOf 로 접근안됨
console.log(Person.__proto__);  // {}


const me = new Person('Lee');

console.log(me.__proto__);   // // { age : 30 }   //  생성자 함수로 생성된 객체는 __proto__로 프로토타입에 접근

console.log('======');
console.log(Object.getPrototypeOf(me));   // { age : 30 }   // .getPrototypeOf 를 통해서 프로토타입 접근


console.log(me.prototype);  // undefined   // 일반 객체는 프로토타입 없다.
console.log('me의 property attribute');
console.log(Object.getOwnPropertyDescriptors(me));


console.log(me.age);  // 30


function Circle(r) {
    this.radius = r;
}

Circle.prototype.getArea = function() {
    return Math.PI*this.radius**2;
}

console.log("=====");
console.log(Circle.prototype);

const child = new Circle(5);

console.log(child.__proto__);
console.log(Object.getOwnPropertyDescriptors(child));
console.log(child);
console.log(Object.getPrototypeOf(child));