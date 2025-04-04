/*
프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
프로퍼티 값 : 자바스크립트에서 사용할 수 있는 모든 값

키 => 식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 됨.

1. 키에 문자열이나 심벌 값 이외의 값을 사용하면 암묵적 타입 변환을 통해서 문자열이 된다.
2. 예약어를 사용해도 되지만 예상치못한 에러가 발생할 수 있다.
3. 존재하는 키를 중복하면 덮어쓰기 된다.
4. 빈 문자열을 키로 사용할 수 있찌만 의미가 없으므로 권장되지 않는다.

*/

/*
var person = {
    firstName: 'jinhun',
//  last-name: 'lee'   //  syntax error : '-'를 연산자가 있는 표현식으로 해석함
}
*/


var person = {
    firstName : 'JinHun',
    'last-name' : 'lee'
}

console.log(person);

//프로퍼티 동적 생성

var key = 'hello';

person[key] = 'world';
console.log(person);
