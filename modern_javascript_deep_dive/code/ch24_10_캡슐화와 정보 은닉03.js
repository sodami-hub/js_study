const Person =(function() {
  let _age = 0;     // private

  // 생성자 함수
  function Person(name,age) {
    this.name=name;  // public
    _age = age;
  }

  Person.prototype.sayHi = function() {
    console.log(`hi! my name is ${this.name}. I am ${_age}.`);
  }

  return Person;  // 생성자 함수를 반환
}());

const me = new Person('lee', 40);
me.sayHi();
console.log(me.name);
console.log(me._age);

const you = new Person('kem', 20);
you.sayHi();
console.log(you.name);
console.log(you._age);

me.sayHi(); // 문제 발생!! _age 변수가 단 한번 생성되고 모든 인스턴스가 그 값을 공유한다.!!
/*
이 문제는 Person.prototype.sayHi 메서드가 단 한 번 생성되는 클로저이기 때문에 발생하는 현상이다.

자스는 정보 은닉을 완전하게 지원하지 않는다. 인스턴스 메서드를 사용한다면 자유 변수를 통해 private를 흉내 낼 수 있지만
프로토타입 메서드를 사용하면 이마저도 불가능해진다.
 */