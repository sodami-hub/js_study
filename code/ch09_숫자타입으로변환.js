/*
숫자 타입으로 변환
1. Number 생성자 함수
2. parseInt, parseFloat 함수를 사용(문자열만 숫자 타입으로 변환 가능)
3. + 단항 연산자
4. * 산술 연산자

 */

// 1번방법
console.log(Number('0'));
console.log(Number('-1'));
console.log(Number('10.452'));
console.log(Number(true));  // boolean -> 숫자타입으로
console.log(Number(false));

console.log('');
// 2번 방법
console.log(parseInt('0'));
console.log(parseInt('-1'));
console.log(parseFloat('10.234'));

// 3번 방법 :  +단항 산술 연산자 사용.
console.log('');
console.log(+'0');
console.log(+'-1');
console.log(+'30.421452');
console.log(+true);
console.log(+false);

//4 번 방법 : * 산술 연산자
console.log('');
console.log('0'*1);
console.log('-1'*1);
console.log('123.152'*1);
console.log(true*1);
console.log(false*1);