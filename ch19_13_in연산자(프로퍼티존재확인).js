const person = {
    name:'lee',
    address:'seoul'
};

console.log('name' in person);  //true
console.log('age' in person);   //false
console.log('constructor' in person);  // true // 상속받은 프로토타입의 프로퍼티까지 열거뿐 아니라 Object.prototype의 프로퍼티도 열거
console.log('toString' in person) // true


console.log(person.hasOwnProperty('name'));     //true

