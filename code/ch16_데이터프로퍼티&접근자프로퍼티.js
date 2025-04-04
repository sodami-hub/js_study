/*
데이터 프로퍼티
- 키와 값으로 구성된 일반적인 프로퍼티.

접근자 프로퍼티
- 자체적으로 값을 갖고 있지 ㅇ낳고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는
접근자 함수로 구성된 프로퍼티
 */

const person = {
    //데이터 프로퍼티
    firstName : 'jinhun',
    lastName : 'lee',

    //fullName은 접근자 프로퍼티 - getter함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    // setter 함수
    set fullName(name) {
        // 배열 디스트럭처링 할딩: 31.1에서 배움
        [this.firstName, this.lastName] = name.split(' ');
    }
};

// 데이터 프로퍼티를 통한 프로퍼티 참조
console.log(person.firstName + ' '+ person.lastName);

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장.
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'sodam lee';
console.log(person);

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter함수가 호출된다.
console.log(person.fullName);

/*
firstName, lastName은 데이터 프로퍼티
fullName 은 접근자 프로퍼티이다.
서로 다른 프로퍼티 어트리뷰트를 갖는다.
 */

let dataDescriptor = Object.getOwnPropertyDescriptor(person,'firstName');
console.log(dataDescriptor);

let accessDescriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(accessDescriptor);