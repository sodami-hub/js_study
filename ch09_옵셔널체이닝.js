/*
?. - 옵셔널체이닝 연산자는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환
        하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
 */

var elem=null;

var value = elem?.value;

console.log(value);

/*
.? 연산자가 도입되기 이전에는 논리 연산자 && 를 사용한 단축평가를 통해서 변수가
null 또는 undefined인지 확인했다.
 */

var str= null;

var length = str && str.length;

console.log(length); // str = null 이면 length 는 null . 문자열인경우 str.length 로 평가.