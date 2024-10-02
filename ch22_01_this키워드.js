/*
생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
따라서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요하다.
이를 위해 자스는 this라는 특수한 식별자를 제공한다.

함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼
this도 지역 변수처럼 사용할 수 있다. this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 위해 동적으로 결정된다.

아래와 같이 this는 상황에 따라 가리키는 대상이 다르다.
 */

//객체 리터럴
const circle = {
  radius : 5,
  getDiameter() {
    // this는 메서드를 호출한 객체를 가리킨다.
    return 2*this.radius;
  }
};

console.log(circle.getDiameter()); // 10

//생성자 함수
function Circle01(r) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.r = r;
}

Circle01.prototype.getDiameter01 = function() {
  // this는 생성자 함수가 생성할 인스턴스를  가리킨다.
  return 2*this.r;
};

//인스턴스 생성
const circle02 = new Circle01(5);
console.log(circle02.getDiameter01()); // 10