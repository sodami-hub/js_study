// setTimeout 비동기 함수, var는 함수 스코프를 사용한다. 현재 for 문의 i 값은 전역 스코프이다.
// setTImeout 함수가 반환하는 함수가 태스크큐에서 콜스택으로 넘어왔을때 i 값은 5이다.
for(var i=0;i<5;i++) {
    setTimeout(function() {
        console.log(i)
    },i*1000);
}
/*
5
5
5
5
5
 */

// let은 블록 레벨 스코프를 갖는다. setTimeout 함수가 반환하는 함수는 당시의 i값을 가지고 태스크큐에서 대기한다.
for (let i=0;i<5;i++) {
    setTimeout(function() {
        console.log(i)
    },i*1000);
}
/*
0
1
2
3
4
 */