//카운트 상태 변수
let num = 0;

const increase = function() {
  return ++num;
}

console.log(increase());  // 1
console.log(increase());  // 2
console.log(increase());  // 3

/*
위 코드는 오류를 발생시킬 가능성을 내포하고 있다.
1. 카운트 상태(num 변수의 값)는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
2. 이를 위해 카운트 상태(num 변수의 값)는 increase 함수만이 변경할 수 있어야 한다.

하지만 num 변수가 전역 변수이기 때문에 누구든지 언제나 접근할 수 있고, 의도치 않게 변경될 수 있다.

따라서 increase 함수만이 num 변수를 참조하고 변경할 수 있게 하는 것이 바람직하다.
 */
