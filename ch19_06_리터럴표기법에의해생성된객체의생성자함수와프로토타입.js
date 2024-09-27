/*
생성자 함수에 의해 생성된 인스턴스는 프로토타입의 consturctor 프로퍼티에 의해 생성자 함수와 연결된다.
이 때 constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수다.
 */

const obj = new Object();
console.log(obj.constructor === Object); // true;

const add = new Function('a','b','return a+b');
console.log(add.constructor===Function); // true;


//리터럴로 생성한 객체는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

const obj02 = {};
console.log(obj02.constructor===Object); // true
/*
Object 생성자 함수는 Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하면서 호출하면
내부적으로 추산 연산 OrdinaryObjectCreate를 호출하여 Object.prototype을 프로토타입으로 갖는 빈객체를 생성한다.
 */

const add02 = function(a,b) { return a+b};
console.log(add02.constructor === Function);
// 함수 리터럴  =>   프로토타입 Function.prototype // Function 생성자 함수


const arr = [1,2,3];
console.log(arr.constructor === Array);
// 배열 리터럴 => 프로토타입 Array.prototype // Arry 생성자 함수

const regexp = /is/ig;
// 정규 표현식 리터럴 => 생성자 함수 RegExp // 프로토타입 : RegExp.prototype

/*
리터럴 표기법에 의해  생성된 객체는 생성자 함수에 의해 생성된 객체는 아니다. 하지만 본질적으로 큰 차이는 없다.
약간의 차이가 있지만 prototype을 갖는다.
 */
