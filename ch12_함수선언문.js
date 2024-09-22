// 함수 선언문은 표현식이 아닌 문이다.(값이 아니다.) 변수에 할당할 수 없다.
// 함수 이름을 생략할 수 없다.

function add(x,y) {
    return x+y;
}

/*
위 선언문은 자바스크립트 엔진이 암묵적으로
var add = function add(x,y) {
    return x+y;
}
이렇게 해석한다.

그리고 호출 할 때의 add는 함수이름의 add가 아니고 식별자(변수명) add이다.
함수 리터럴에서 함수 이름은 함수 내부에서 사용되는 식별자라고 했기 때문에 외부에서는 사용할 수 없다.
*/

console.log(add);
console.log(add(1,2));

// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.

var add01 = function add01(x,y) {       // -> 이와 같은 형태가 함수 표현식이다.
    return x+y;
};
/*
자바스크립트 엔진이 코드의 문맥에 따라 동일한 함수 리터럴을 표현식이 아닌 문인 함수 선언문으로 해석하는 경우와
표현식인 문인 함수 리터럴 표현식으로 해석하는 경우가 있기 때문이다.
 */

console.log(add01);
console.log(add01(1,2));


/*
결론적으로 자바스크립트 엔진은 함수 선언문을 함수 표현식으로 변환해 함수 객체를 생성한다고 할 수 있다. 

 */
