// 함수형 프로그래밍에서 클로저를 활용한 예

// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유변수 counter를 기억하는 클로저를 반환한다.

function makeCounter(aux) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter =0;

  // 클로저를 반환
  return function () {
    // 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
    counter = aux(counter);
    return counter;
  }
}

//보조함수
function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

//함수로 생성한다.
//makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
const increaser = makeCounter(increase);
const decreaser = makeCounter(decrease);

console.log(increaser());
console.log(increaser());
console.log(increaser());
console.log(increaser());

// increase 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 동기화되지 않는다.
console.log(decreaser());
console.log(decreaser());