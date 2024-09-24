/*
내부 슬롯과 내부 메서드
- 자스 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는
의사 프로퍼티와 의사 메서드다. ECMAScript 사양에 등장하는 이중 대괄호로
감싼 이름들이 내부 슬롯과 내부 메서드다.
- 원칙적으로는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을
제공하지 안흔다. 단, 일부에 한하여 간접적으로 접근할 수 있는 수단을 제공한다.
 */

const o = {};

// o.[[Prototype]]; // 내부 슬롯은 직접 접근할 수 없다.

// 일부에 한하여 간접적으로 접근할 수 있는 수단을 제공한다.
console.log(o.__proto__);  // [Object: null prototype] {}


/*
프로퍼티 어트리뷰트, 프로퍼티 디스크립터 객체
- 자스는 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.
- 프로퍼티 상태란 프로퍼티 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)을 말한다.
- 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor를 사용해서 간접적으로 확인 가능하다.
 */

const person= {
    name:'lee'
};

console.log(Object.getOwnPropertyDescriptor(person,'name'));