/*
함수는 일반 객체와 동일하게 동작할 수 있다. 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부메서드를 모두 가지고 있다.

하지만 함수는 호출할 수 있지만 객체는 호출할 수 없다. 함수는 함수로서 동작하기 위한 함수 객체만을 위한 어트리뷰트
[[Environment]],[[FormalParameters]] 등의 내부 슬롯과 [[Call]],[[Construct]] 같은 내부 메서드를 추가로 가지고 있다.

함수 객체는 반드시 [[Call]] 내부 메서드를 갖고 있으므로 호출할 수 있다.
하지만 모든 함수 객체가 [[Construct]]를 갖는 것은 아니다.
다시 말해서 함수 객체는 constructor일 수도 있고 non-constructor일 수도 있다.
*/

function foo() {
    console.log('hi');
}

console.log(Object.getOwnPropertyDescriptors(foo));
/*
{
  length: { value: 0, writable: false, enumerable: false, configurable: true },
  name: {
    value: 'foo',
    writable: false,
    enumerable: false,
    configurable: true
  },
  arguments: {
    value: null,
    writable: false,
    enumerable: false,
    configurable: false
  },
  caller: {
    value: null,
    writable: false,
    enumerable: false,
    configurable: false
  },
  prototype: { value: {}, writable: true, enumerable: false, configurable: false }
}
 */

const bar = {
    name : 'lee'
};
console.log(Object.getOwnPropertyDescriptors(bar));
/*
{
  name: {
    value: 'lee',
    writable: true,
    enumerable: true,
    configurable: true
  }
}
 */
