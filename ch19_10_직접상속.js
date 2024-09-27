/*
Object.create에 의한 직접상속

첫 번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달한다.
두번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체를 전달한다.
두번째 인수는 옵션이므로 생략 가능하다.
 */

//프로토타입이 null 인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.

let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null) // true -> Object.prototype을 상속받지 못했다.
// obj.prototype === null(또는 {})

obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

//obj 객체의 프로토타입은 Objext.prototype 이고 객체의 프로퍼티는 x:1 ... 이다
obj = Object.create(Object.prototype, {
    x: {value:1, writable:true, enumerable:true, configurable:true}
});


/*
Object.create 메서든느 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다.
즉, 객체를 생성하면서 직접적으로 상속을 구현한다. 이 메서드의 장점은 다음과 같다.
1. new 연산자가 없이도 객체를 생성할수 있다.
2. 프로토타입을 지정하면서 객체를 생성할 수 있다.
3. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.
 */

