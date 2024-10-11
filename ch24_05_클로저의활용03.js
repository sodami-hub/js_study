const Counter = (function() {

  // num은 Counter가 생성할 인스턴스의 프로퍼티가 아니다. 즉시 실행 함수에서 선언되고 초기화된 변수이다.
  // 즉시 실행 함수에서 정의된 num은 인스턴스를 통해서 접근할 수 없다.
  let num = 0;

  function Counter() {
  }

  Counter.prototype.increase = function() {
    return ++num;
  };

  Counter.prototype.decrease = function() {
    return num > 0 ? --num : 0;
  };

  return Counter;
}());

const counter = new Counter();

console.log(counter.increase());
console.log(counter.increase());
console.log(counter.increase());

console.log(counter.decrease());
console.log(counter.decrease());

