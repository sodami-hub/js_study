// js의 변수 선언과 값의 할당 그리고 변수 호이스팅


// js가 인터프리터언어 이지만 런타임 이전에 변수 선언이 이루어짐.
// 따라서 아래 코드가 변수 선언 전에 실행되지만 실행이전에 변수가 선언되기에 undefined 출력
console.log(score);  //undefined 출력

var score;

// 변수에 값이 할당되는 것은 런타임에 이루어짐.
score = 80;

console.log(score); // 80출력
