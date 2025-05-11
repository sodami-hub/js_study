/*
for ... in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서
프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거(enumeration)한다.
또한 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.
순서를 보장하지 않는다.

배열에는 for문이나, for... of 문 또는 Array.prototype.forEach메서드를 사용하기 권장한다.

 */


const person = {
    name: 'lee',
    address: 'seoul'
};

console.log('toString' in person); //true

for (const key in person) {
    console.log(key + ' : ' +person[key]);
}

/*
for in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다.
하지만 Object.prototype의 프로퍼티가 열거되지 않는다.
이는 toString 메서드가 열거할 수 없도록 정의되어 있는 프로퍼티이기 때문이다.
 */

console.log(Object.getOwnPropertyDescriptors(Object.prototype));
/*
....
...
 toString: {
    value: [Function: toString],
    writable: true,
    enumerable: false,
    configurable: true
  },
...
...
 */
