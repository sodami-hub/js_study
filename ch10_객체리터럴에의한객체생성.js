/*
객체란? (클래스 .. + 인스턴스)
자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다.
자바스크립트의 함수는 일급 객체이므로 값으로 취급할 수 있다.
따라서 함수도 프로퍼티 값으로 사용할 수 있다.
프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해서 메서드라 부른다.

-> 자바의 클래스와 비교해본다면 객체안의 프로퍼티는 필드, 함수는 메서드라고 할 수 있겠다.

*/


var counter = {
    num:0,   // 프로퍼티
    increase: function() {   // 메서드
        this.num++;
    }
};

var person = {
    name : 'lee',  // 프로퍼티
    sayHello : function () {   // 메서드
        console.log(`Hello! my name is ${this.name}`);
    }
};

console.log(typeof counter);
console.log(typeof person);

console.log(counter);
console.log(person);


/*
객체 리터럴은 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 방식이다.
숫자 값이나 문자열을 만드는 것과 유사하게 리터럴로 객체를 생성한다.
객체를 생성함과 동시에 프로퍼티를 만들 수도 있고, 동적으로 추가할 수도 있다.
*/