/*
프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생량할 수 있다.
이때 프로퍼티 키는 변수 이름으로 자동 생성된다.
*/

let x=1, y=2;

const obj = {x,y};

console.log(obj);

/*
메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다.
메서드 이름이 프로퍼티 키로 등록됨.
*/

const obj02 = {
    name:'lee',
    sayHi() {
        console.log('Hi, '+this.name);
    }
};

obj02.sayHi();

console.log(obj02);

//----

const obj03 = {
    name:'kim',
    hello: function sayHello() {
        console.log('Hello, '+this.name);
    }
};

obj03.hello();
console.log(obj03);
