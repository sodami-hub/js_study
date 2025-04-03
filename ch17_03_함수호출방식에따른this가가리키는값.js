//1. 일반 함수로서 호출 -> 전역 객체 - 브라우저의 window객체, node.js의 global

function foo() {
    console.log(this);
}
foo();

//2. 메서드로서 호출 -> 메서드를 호출한 객체

const bar = {
    foo
};

bar.foo();

//3. 생성자 함수로서 호출 -> 생성자 함수가 생성할 인스턴스

function func() {
    // 생성자 함수로 호출하면 아래 this는 func에 바인딩 되고
    console.log(this);
    // func 반환.
}

const inst = new func();
