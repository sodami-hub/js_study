// apply, call, bind 메서드는 Function.prototype의 메서드다. 즉, 이들 메서드는 모든 함수가 상속받아 사용가능하다.

// apply, call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

// bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해서 유용하게 사용된다.

function getThisBind() {
  return this;
}

const thisArg = {a:1};

console.log(getThisBind()); // global

console.log(getThisBind.apply(thisArg));  // {a:1}
console.log(getThisBind.call(thisArg)); // {a:1}

// apply와 call메서드의 본질적인 기능은 함수를 호출하는 것이다. 그리고 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

// 두 메서드는 두번째 인수로 함수의 인수를 전달할 수 있다. apply는 배열로 call은 쉼표로 구분한 리스트로

function getThisBindAndArguments() {
  console.log(arguments);
  return this;
}

console.log(getThisBindAndArguments.apply(thisArg, [1,2,3]));
console.log(getThisBindAndArguments.call(thisArg, 1,2,3));

