console.dir(add);   // [Function: add]
console.dir(sub);   // undefined

console.log(add(2,5));  // 7
console.log(sub(2,5));  // TypeError: sub is not a function

function add(x,y) {     // 함수 선언문
    return x+y;
}

var sub = function (x,y) {      // 함수 표현식
    return x-y;
};

/*
함수 선언문과 함수 표현식으로 정의한 함수의 생성 시점이 다르다!!
모든 선언문이 그렇듯(변수선언) 함수 선언문도 런타임 이전에 자스 엔진이 먼저 객체를 생성하고 함수이름과 동일한 식별자를 생성한다. -> 호이스팅
(그러나 함수 선언과 변수 선언은 차이가 있다 변수 선언은 undefined로 초기화 하지만 함수는 함수 객체로 초기화된다.

함수 표현식은 변수에 할당되는 값이 함수 리터럴인 문이다. 따라서 변수 선언은 런타임 전에 undefined로 초기화 되지만 값(함수 리터럴)은
런타임에 평가된다.
 */
