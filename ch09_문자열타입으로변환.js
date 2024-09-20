/*
문자열 타입으로 변환
1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. Object.prototype.toSrting 메서드를 사용하는 방법
3. 문자열 연결 연산자를 사용하는 방법
 */

//1번 방법 String 생성자 함수를 new 연산자 없이 호출

// 숫자 -> 문자열
console.log(String(1));
console.log(String(NaN));
console.log(String(Infinity));
// 불리언 -> 문자열
console.log(String(true));
console.log(String(false));

console.log('')
// 2번방법
console.log((1).toString());
console.log((NaN).toString());
console.log((Infinity).toString());
console.log((true).toString());
console.log((false).toString());


//3번 방법 - 문자열 연결 연산자
console.log(1+'');
console.log(NaN+'');
console.log(Infinity+'');