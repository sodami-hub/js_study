const person = {

  // 데이터 프로퍼티
  firstName: 'sodami',
  lastName: 'lee',

  // 접근자 프로퍼티(fullName)
  // getter 함수
  get fullName () {
    return `${this.firstName} ${this.lastName}`;
  },

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ')
  }
}

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.lastName, person.firstName)

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
person.fullName = 'lee crazy';
console.log(person.firstName, person.lastName)

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.fullName)

console.log(Object.getOwnPropertyDescriptors(person));