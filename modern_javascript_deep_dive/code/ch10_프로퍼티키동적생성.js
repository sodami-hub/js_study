/*
문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 있다.
단, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 된다.
 */

const prefix ='prop';
let i =0;

const obj = {
    [`${prefix}-${++i}`] : i,
    [`${prefix}-${++i}`] : i,
    [`${prefix}-${++i}`] : i
}

console.log(obj);