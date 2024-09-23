/*
함수 정의와 동시에 즉시 호출되는 함수를 즉시 실행 함수라고 한다.
단 한번만 호출되며 다시 호출될 수 없다.
*/

// 익명 즉시 실행 함수
(function() {
    return;
}());

//기명 즉시 실행 함수
(function foo() {
    return;
}());

// 즉시 실행 함수는 반드시 그룹 연산자 '()'로 감싸야 한다.

var res = (function () {
    var a = 3;
    var b =4;
    return a*b;
}());

console.log(res);


var result = (function (a,b) {
    return a*b;
}(2,3));

console.log(result);