/*
코드 내에서 __proto__ 접근자 프로퍼티를 직접 사용하는 것은 권장하지 않는다.
모든 객체가 __proto__ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 사용할 수 없는 경우가 있다.

따라서 프로토타입의 참조를 취득하고 싶은 경운에는 Object.getPrototypeOf 메서드를 사용하고
프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.
 */

const obj = {};
const parent = {x:1};

console.log(Object.getPrototypeOf(obj));
Object.setPrototypeOf(obj, parent);
console.log(Object.getPrototypeOf(obj));
console.log(obj.x);