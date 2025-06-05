class Person {
  name:string;
  age:number;
  married:boolean;

  constructor(name:string, age:number, married:boolean) {
    this.name= name;
    this.age = age;
    this.married = married;
  }
  sayName() {
    console.log(`Hello ${this.name}!`);
  }
}
const zero =new Person("hi",1,true)
zero.sayName();