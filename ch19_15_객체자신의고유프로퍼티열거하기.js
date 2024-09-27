/*
객체 자신의 고유 프로퍼티만 열거하기 위해서는 for...in문을 사용하기 보다 Object.keys/values/entries 메서드를 사용하는 것을 권장한다.

 */

const person = {
    name : 'lee',
    address: 'seoul',
    __proto__: {age :20}
};

console.log(Object.keys(person));

console.log(Object.values(person));

console.log(Object.entries(person));

Object.entries(person).forEach(([k,v]) => console.log(k,v))