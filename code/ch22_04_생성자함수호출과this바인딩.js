// 생성자 함수 내부의 this에는 생성할 인스턴스가 바인딩된다.

function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function() {
    return 2* this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());

//new 연산자와 함께 호출하지 않으면, 일반함수의 호출이다.
const circle3 = Circle(15);
console.log(circle3); // undefined
console.log(radius);  // 15 - circle3으로 호출함 함수 Circle의 radius값은 전역 객체에 바인딩 된다.

