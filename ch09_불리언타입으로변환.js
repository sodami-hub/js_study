/*
불리언 타입으로 변환
1. Boolean 생성자 함수 사용
2. ! 부정 논리 연산자를 두 번 사용.
 */

//1번 방법

// 문자 -> 불리언
console.log(Boolean('x'));   // t
console.log(Boolean(''));
console.log(Boolean('false'));  // t
// 숫자 -> 불리언
console.log(Boolean(0));
console.log(Boolean(1));  // t
console.log(Boolean(NaN));
console.log(Boolean(Infinity));  // t
// null -> 불리언
console.log(Boolean(null));
// undefined -> boolean
console.log(Boolean(undefined));
// instance -> boolean
console.log(Boolean([]));   // t
console.log(Boolean({}));   // t

console.log('');
// 2번 방법
console.log(!!'x');   // t
console.log(!!'');
console.log(!!'false');  // t
// 숫자 -> 불리언
console.log(!!0);
console.log(!!1);  // t
console.log(!!NaN);
console.log(!!Infinity);  // t
// null -> 불리언
console.log(!!null);
// undefined -> boolean
console.log(!!undefined);
// instance -> boolean
console.log(!![]);   // t
console.log(!!{});   // t
