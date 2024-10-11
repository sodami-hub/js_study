
// 즉시 실행함수로 num 값이 초기화되고 함수는 사라짐. 이후 num에 접근할 수 없다.
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 즉시 실행함수는 num을 초기화하고 중첩함수를 반환하고 사라짐.
  return function() {
    return ++num;
  };
}());

console.log(increase());
console.log(increase());
console.log(increase());

/*
클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여
상태를 안전하게 변경하고 유지하기 위해 사용된다.
 */