var person = {
    name : 'lee'
};

person.age = 30;

console.log(person);

// 프로퍼티 수정
person.age=25;
console.log(person);

//프로퍼티 삭제
delete person.age;
console.log(person)
