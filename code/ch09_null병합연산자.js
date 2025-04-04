/*
null 병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고,
그렇지 않으면 좌항의 피연산자를 반환한다.
null 병합 연산자는 변수에 기본값을 설정할 때 유용하다.
*/

var foo = null??'default str';
console.log(foo)

/*
?? 도입 이전에는 || 사용해서 변수에 기본값을 설정했다.
false로 평가되는 Falsy값(0,-0,'',false,Nan,nullundefined)을 좌항에 넣으면 우항의 피연산자를 반환한다.
 */

var bar = null??'default message';
console.log(bar);