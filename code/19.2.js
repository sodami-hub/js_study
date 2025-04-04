// 생성자 함수
/*
function Circle(radius) {
    this.radius = radius;
    this.getArea = function() {
        return Math.PI * this.radius**2;
    };
}
*/
// 인스턴스를  생성할 때마다 모든 인스턴스에서 동일한 기능을 하는 getArea메서드가 중복 생성된다.

/*
상속을 통해서 불필요한 중복을 제거해보자.
자스는 프로토타입을 기반으로 상속을 구현한다.
 */

function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getArea = function() {
    return Math.PI * this.radius**2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);


// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype 으로부터 getArea 메서드를 상속받는다.
// Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea);  // true
