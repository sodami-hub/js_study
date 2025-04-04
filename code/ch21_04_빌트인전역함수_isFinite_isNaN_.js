/*
isFinite
전달받은 인수가 정상적인 유한수인지 검사하여 유한수이면 true를 반환하고, 무한수이면 false를 반환
인수의 타입이 숫자가 아닌 경우, 숫자로 타입을 변환한 후 검사를 수행, 이 때 인수가 NaN으로 평가되는 값이라면 false를 반환
 */

console.log(isFinite(0));  // true
console.log(isFinite(2e64));// true
console.log(isFinite('10'));// true
console.log(isFinite(null));// true, null = 0;

// 인수가 무한수 또는 NaN으로 평가되는 값
console.log(isFinite(Infinity));  // false
console.log(isFinite(-Infinity));  // false

//인수가 NaN으로 평가되는 값
console.log(isFinite(NaN));  // false
console.log(isFinite('hello'));  // false
console.log(isFinite('2024.9.30'));  // false


/*
isNaN

 */
console.log('===========');

console.log(isNaN(NaN));  // true
console.log(isNaN(10));  // false

console.log(isNaN('blabla'));  // true
console.log(isNaN('10'));  // false
console.log(isNaN('10.23'));  // false
console.log(isNaN(''));  // false -> 0
console.log(isNaN(' '));  // false -> 0
