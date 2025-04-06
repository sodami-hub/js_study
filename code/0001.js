function Base(a) {
  this.a= a;
}

class Child extends Base {}

const inst = new Child(1);
console.log(inst) 