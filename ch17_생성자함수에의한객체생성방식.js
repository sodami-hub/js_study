
// 생성자 함수
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2*radius;
    };
}

const circle01 = new Circle(5);
const circle02 = new Circle(10);

console.log(circle01);
console.log(circle02);
