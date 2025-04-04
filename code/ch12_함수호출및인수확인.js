/*
1. 자스의 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
2. 자스는 동적 타입 언어다. 따라서 자스의 함수는 매개변수의 타입을 사전에 지정할 수 없다.
따라서 자스의 경우 함수를 정의할 때 적절한 인수가 전달되었는지 확인할 필요가 있다.
*/

function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new TypeError('인수는 모두 숫자 값이어야 합니다.')
    }
    return x + y;
}

// console.log(add(2));    // TypeError
// console.log(add('a', 'b'));  // TypeError

// 인수가 전달되지 않은 경우 단축 평가를 사용해 매개변수에 기본값을 할당하는 방법도 있다.

function add01(a, b, c) {
    a = a || 0;
    b = b || 0;
    c = c || 0;
    return a+b+c;
}

console.log(add01(1,2,3));
console.log(add01(1,2));
console.log(add01(1));
console.log(add01());

// ES6에서 도입된 매개변수 기본값
function add02(a=0, b=0, c=0) {
    return a+b+c;
}

console.log(add02(1,2,3));
console.log(add02(1,2));
console.log(add02(1));
console.log(add02());