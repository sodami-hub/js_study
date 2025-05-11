/*
1.무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.

2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.

3. 함수의 매개변수에 전달할 수 있다.

4. 함수의 반환값으로 사용할 수 있다.

 */


//1. 무명의 리터럴로 생성가능
const increase = function(num) {
    return ++num;
};

const decrease = function (num) {
    return --num;
};

//2. 객체에 저장할 수 있다.
const auxs = {increase,decrease};

//3. 함수의 매개변수에 전달할 수 있다.
//4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
    let num =0;

    return function() {
        num = aux(num);
        return num;
    };
}

const increaser = makeCounter(auxs.increase);
console.log(increaser());
console.log(increaser());

const decreaser = makeCounter(auxs.decrease);
console.log(decreaser());
console.log(decreaser());