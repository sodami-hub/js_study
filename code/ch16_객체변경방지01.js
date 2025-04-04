/*
1. 객체 확장 금지
Object.preventExtensions 메서드는 객체의 확장을 금지한다.
프로퍼티는 프로퍼티 동적 추가와 Object.defineProperty 메서드로 추가할 수 있다.
이 두 가지 추가 방법 모두 금지된다.
 */
const person ={
    name:'lee'
};

console.log(Object.isExtensible(person));  // true - 확장 가능

Object.preventExtensions(person);

console.log(Object.isExtensible(person));  // false - 확장 불가

person.age = 20; // 무시됨. strict mode에서는 에러
console.log(person);

//삭제는 가능
delete person.name;
console.log(person);

/*
2. 객체 밀봉
Object.seal 메서드는 객체를 밀봉한다.
프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의를 금지한다.
밀봉된 객체는 읽기와 쓰기만 가능하다.
 */

const person02 = {
    name:'lee'
};

console.log(Object.isSealed(person02));

Object.seal(person02);

console.log(Object.isSealed(person02));

//밀봉된 객체는 configurable이 false가 된다.
console.log(Object.getOwnPropertyDescriptors(person02));