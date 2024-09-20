/*
논리 연산자를 사용한 단축 평가
논리합 또는 논리곱 연산자 표현식의 평가 결과는 불리언 값이 아닐 수 있다.
=> 논리합 또는 논리곱 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.
 */

console.log('Cat'&&'Dog'); // -> Dog
//좌항에서 우항으로 평가, 논리 연산의 결과를 결정하는 두 번째 피연산자를 그대로 반환

console.log('Cat'||'Dog'); // -> Cat
//논리합에서는 하나만 true 여도 true, 좌항의 Cat을 평가하고 true이면 좌항 반환.



/*
단축 평가를 사용해서 if문을 대체한다. 조건이 참일 때 무언가를 해야 한다면
논리곱 연산자 표현식으로 if문을 대체할 수 있다.
 */

var done = true;
var message ='';

// if(done) message='완료' // done이 true이면 message에 완료를 넣고 싶다.

message = done&&'완료';
console.log(message)

/*
단축 평가를 사용해서 조건이 거짓일 때 무언가를 하는 코드를 작성
 */

done = false;

message = done||'미완료';
console.log(message);