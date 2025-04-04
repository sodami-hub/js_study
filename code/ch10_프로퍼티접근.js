var person = {
    name: 'lee',
    'last-name': 'jinhun',
    1:10
};

console.log(person.name);   // . 마침표 프로퍼티 접근 연산자
console.log(person['name']);  // [] 대괄호 프로퍼티 접근 연산자 - 키 프로퍼티에 '' 사용해야 됨

console.log(person.age); // 객체에 존재하지 않는 프로퍼티에 접근하면 undefined 반환

//console.log(person.'last-name') // SyntaxError -> 식별자 네이밍 규칙을 준수하지 않은 이름은 대괄호 표기법을 사용해야 됨.
console.log(person['last-name']); // -> jinhun

//console.log(person.1); // SyntaxError -> 식별자 네이밍 규칙에 어긋남... 대괄호를 사용해야 됨.
console.log(person['1']);

