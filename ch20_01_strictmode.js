//'use strict'; // 전역 범위에서 스트릭트 모드의 선언

function foo() {
    // 'use strict'; 함수 내부에서의 스트릭트 모드. 해당 함수와 중첩함수에 적용
    x = 10;
}

foo();

console.log(x);  // 10

/*
foo 함수 내에서 선언하지 않은 변수 x에 값을 10을 할당했다. 이때 x 변수를 찾아야 x에 값을 할당할 수 있기 때문에
자스 엔진은 x 변수가 어디에서 선언되었는지 스코프 체인을 통해 검색한다.

자스 엔진은 먼저 foo 함수의 스코프에서 x 변수의 선언을 검색하지만, 실패할 것이고,
이어서 foo 함수의 상위 스코프(위 예제의 경우 전역 스코프)에서 x 변수의 선언을 검색한다.

전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만
자스 엔진은 암묵적으로 전역 객체 x 프로퍼티를 동적으로 생성한다.

이러한 현상을 암묵적 전역이라고 한다.

이러한 실수를 방지하기 위해서 ES5부터 strict mode가 추가됐다.
 */