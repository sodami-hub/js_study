/*
1. Object 생성자 함수
new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈객체 생성 후 프로퍼티 또는 메서드를 추가해서 객체를 완성한다.
 */

const person = new Object();
person.name = 'lee';
console.log(person);

/*
자스는 Object 생성자 함수 외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌트인 생성자 함수를 제공한다.

그러나 객체를 생성하는 방식은 객체 리터럴을 사용하는 것이 더 간편하다. Object 생성자 함수를 사용해 객체를 생성하는 방식은 특별한 이유가 없다면
그다지 유용하지 않다.

 */


/*
객체 리터럴에 의한 객체 생성 방식의 문제점

프로퍼티 구조가 동일함에도 불구하고 매번 같은 프로퍼티와 메서드를 기술해야 한다.
 */

const circle01 = {
    radius:5,
    getDiameter() {
        return 2*this.radius;
    }
};

console.log(circle01.getDiameter());

const circle02 = {
    radius:10,
    getDiameter() {
        return 2*this.radius;
    }
};

console.log(circle02.getDiameter());



