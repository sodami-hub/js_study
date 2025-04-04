const x =1;

// 1.
function outer() {
  const x =10;
  const inner = function() {
    console.log(x); // 2.
  }
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer();  // 3.
innerFunc();  // 4. 10

/*
outer함수를 호출하면(3) outer함수는 중첩 함수 inner 를 반환하고 생명주기를 마감한다. 즉, outer 함수의 지역변수 x의 생명주기도 마감한다.
따라서 outer함수의 지역변수 x는 더이상 유효하지 않다.
그러나 실행 결과(4)는 outer함수의 지역 변수의 값인 10을 반환한다. 이미 생명 주기가 종료되어 실행 컨텍스트 스택에서 제거된 outer함수의 지역 변수가 동작한다.

이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다.
이러한 중첩 함수를 클로저라고 부른다.
 */