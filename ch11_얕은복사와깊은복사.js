const o = {x: {y: 1}};

// 얕은 복사
const c1 = {...o};
console.log(c1);

console.log(c1 === o);  // false  c1과 o는 다른 객체.
console.log(c1.x === o.x); // true  하지만 같은 값을 참조하고 있다. -> 신뢰성이 떨어지게 됨. c1에서 값을 변경하면 o도 바뀜

// 깊은 복사

const _ = require(`lodash`);

const c2 = _.cloneDeep(o);
console.log(c2===o);      // false
console.log(c2.x===o.x);  // false 원본 객체의 내부의 프로퍼티까지 복사해서 새로운 값을 참조한다.
