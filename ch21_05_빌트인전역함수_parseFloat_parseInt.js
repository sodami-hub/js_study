/*
parseFloat
전달받은 문자열 인수를 부동 소수ㅠ점 숫자, 즉 실수로 해석하여 반환
 */

//공백으로 구분된 문자열은 첫 번째 문자열만 반환
console.log(parseFloat('34 45 23'));  //34
console.log(parseFloat('34 years'));  //34
console.log(parseFloat('years 23'));  //NaN
console.log(parseFloat('   45  '));  // 45 앞뒤 공백 무시

/*
parseInt
 */


// 두번째 인수로 진법을 나타내는 기수를 전달할 수 있다.
// 기수를 지정하면 첫 번째 인수로 전달된 문자열을 해당 기수의 숫자로 해석하여 10진수로 반환한다.

console.log(parseInt('10'));  // 10
console.log(parseInt('10',2));  // 2진수 10을 10진수로 변환 -> 2
console.log(parseInt('10',8));  // 8진수 10을 10진수로 변환 -> 8

// 10진수 숫자를 해당 기수의 문자열로 변환하고 싶을 때는 Number.prototype.toString 메서드를 사용한다.
const x= 15;
console.log(x.toString(2)); // 1111(문자열 형태)
console.log(parseInt(x.toString(2),2)) // 2진수 1111을 10진수 정수형으로 -> 15

console.log(x.toString(8));  // 17(8진수)
console.log(parseInt(x.toString(8),8)); // 15

// 첫 번째 인수로 전달한 문자열의 첫 번재 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환한다.
console.log(parseInt('A0')); // NaN - A는 10진수로 해석할 수 없다.
console.log(parseInt('210',2)); // NaN - 2는 2진수로 해석할 수 없다.

// 두번째 문자부터 해석 불가능한 문자가 나올 때 그 앞까지만 해석됨
console.log(parseInt('10A0',2)); // 2 - A 앞까지만 해석됨
