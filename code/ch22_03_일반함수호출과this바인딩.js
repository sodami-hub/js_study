/*
기본적으로 this에는 전역 객체가 바인딩된다.
다만 자기참조 함수인 this는 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.
따라서 strict mode가 적용된 일반함수의 this는 undefined가 바인딩 된다.
 */

value =1;  // 전역 객체의 프로퍼티
console.log(global.value);

const obj = {
  value : 100,
  foo() {
    console.log("foo's this : ", this);  // { value : 100, foo : Function...}
    console.log("foo's this.value : ", this.value);  // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this : ", this);     // global
      console.log("bar's this.value : ", this.value); // 1
    }

    // 메서드 내에서 정의한 충첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this는 전역 객체가 바인딩 됨
    bar();
  }
};
obj.foo();


// 일반 함수로 호출된 모든 함수(중첩, 콜백 함수) 내부의 this에는 전역 객체가 바인딩 된다.

// 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 다음과 같다.


const exam = {
  value : 100,

  foo() {
    // this 바인딩을 that에 할당
    const that = this;

    // 메서드 내부의 콜백함수에서 this대신 that을 참조한다.
    setTimeout(function() {
      console.log('inner callback this',this.value); // undefined - 브라우저에서는 1..?
      console.log('inner callback that',that.value); // 100
    },100);
  }
};

exam.foo();


