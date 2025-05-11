function Person(name, age) {
  this.name = name;  // public
  let _age = age;   // private

  // 다음 예제에서 sayHi  함수를 prototype으로만들어 중복생성되지 않도록 해보자.
  // 인스턴스 메서드가 중복생성되지만 private 키워드를 사용하기 전에는 그나마 사용 가능한 정보은닉 방법이다.
  this.sayHi = function() {
    console.log(`hi! my name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person('lee', 40);
me.sayHi();
console.log(me.name);
console.log(me._age);

const you = new Person('kem', 40);
you.sayHi();
console.log(you.name);
console.log(you._age);