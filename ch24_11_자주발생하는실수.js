var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function() {  // funcs[] 배열의 각 요서에 i값을 반환하는 함수를 추가.
    return i;
  };
}
// for 문에 사용된 var i 는 전역변수이다. 따라서 현재 i의 값은 3이고 funcs[j] 호출시 3이 호출된다.
// 변수선언을 let으로 바꾸면 0,1,2가 출력된다.
for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());  // 배열의 요소로 추가된 함수를 호출
}