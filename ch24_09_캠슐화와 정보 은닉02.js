function Person(name, age) {
  this.name = name;  // public
  let _age = age;   // private
};

/*
// 인스턴스 메소드를 프로토타입메서드로 변경하면 private 프로퍼티를 사용할 수 없는 문제가 발생한다.
Person.prototype.sayHi = function() {
  console.log(`hi! my name is ${this.name}. I am ${_age}.`);
};
 */

const me = new Person('lee', 40);
me.sayHi();
console.log(me.name);
console.log(me._age);

const you = new Person('kem', 40);
you.sayHi();
console.log(you.name);
console.log(you._age);