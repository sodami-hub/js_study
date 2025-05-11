/*
새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나,
기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것.
 */

const person = {};


// Object.defineProperties 메서드를 사용하면 여러 개의 프로퍼티 정의 가능
Object.defineProperty(person, 'firstName', {
    value: 'jinhun',
    writable: true,
    enumerable: true,
    configurable: true
});

//디스트립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
Object.defineProperty(person, 'lastName', {
    value: 'lee'
});


// lasgName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(person);  // { firstName: 'jinhun' }


let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);

/*
lastName {
  value: 'lee',
  writable: false,  // 프로퍼티 [[Value]] 변경 불가
  enumerable: false,
  configurable: false  // 해당 프로퍼티 삭제 불가. 프로퍼티 재정의 불가.
}
 */
