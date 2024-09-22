/*
1. 함수 선언문
2. 함수 표현식
3. Function 생성자 함수
4. 화살표 함수
 */

function add01(x, y) {
    return x + y;
}

var add02 = function (x, y) {
    return x + y;
};

var add03 = new Function('x', 'y', 'return x+y');

var add04 = (x, y) => x + y;

