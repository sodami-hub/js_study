function Person(name) {
    this.name =name;
}

const me = new Person('lee');

//프로토타입으로 교체할 객체
const parent = {

    //2. constructio 프로퍼티와 생성자 함수 간의 연결을 설정
    //constructor : Person,
    sayHello() {
        console.log(`Hi! My name is ${this.name}`);
    }
};

// 1. me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me,parent);
// 위 코드는 아래의 코드와 같다.
// me.__proto__ = parent;

me.sayHello();

console.log(me.constructor===Person);   //false
console.log(me.constructor===Object);   //true

/*
인스턴스에의한 프로토타입의 교체는 Person 생성자함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키지 않는다.
2. 아래의 코드가 파괴된 생성자 함수와 프로토타입 간의 연결을 되살린다.
 */

/*
결론!
프로토탕비 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 꽤나 번거롭다.
따라서 프로토타입은 직접 교체하지 않는 것이 좋다.
상속 관계를 인위적으로 설정하려면 직접 상속이 더 편리하고 안전하다.
또한 클래스를 사용하면 간편하고 직관적이다.

 */