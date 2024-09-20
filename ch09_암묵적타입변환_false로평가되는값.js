/*
암묵적 타입 변환(강제 타입 변환)  // 명시적 타입 변환

개발자는 암묵적 타입 변환에 대해서 예측할 수 있어야 된다.
 */


/*
자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 평가되는 값) 또는
Falsy값(거짓으로 평가되는 값)으로 구분된다.
 */

if('') console.log('1');
if(true) console.log('2');  // true
if(0) console.log('3');
if('str') console.log('4');  // true
if(null) console.log('5');
if(undefined) console.log('6');
if(NaN) console.log('7');
if(-0) console.log('8');


/*
Falsy 값!!

''
0, -0
null
undefined
NaN
false

*/