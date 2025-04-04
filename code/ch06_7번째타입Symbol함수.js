
// 심벌 타입 . ES6에 추가된 7번째 타입. Symbol 함수를 통해서 생성.
var key = Symbol('key');

console.log('key type : ' + typeof key);
console.log(key);

var obj ={};

obj[key] = 'value';
console.log(obj[key]);
console.log(obj);