## ch19 - 프로토타입
자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의
객체 지향 프로그래밍 언어다

### 19.1 객체지향 프로그래밍
속성(상태)와 기능(동작). 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조라고 할 수 있다. 이때 객체의 상태를
프로퍼티, 동작을 메서드라 부른다.

### 19.2 상속과 프로토타입
`19.2.js` 생성자 함수는 동일한 프로퍼티(메서드 포함) 구조를 갖는 객체를 여러 개 생성할 때 유용하다. 하지만 문제가 있다. 메서드의 경우
중복해서 생성되게 된다. 상속을 통해 불필요한 중복을 제거한다. 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

### 19.3 프로토타입 객체
프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다. 
**모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.**  
객체는 [[Prototype]] 내부 슬롯에 직접 접근할 수 없지만. __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근할 수 있다.
그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype(생성자함수에만 있는 프로퍼티) 
프로퍼티를 통해 프로토타입에 접근할 수 있다.

#### 19.3.1 __proto__ 접근자 프로퍼티
모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.
- __proto__ 는 접근자 프로퍼티다 : 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수다.
- __proto__ 접근자 프로퍼티는 상속을 통해 사용된다. : 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype 의 프로퍼티다. 모든 객체는 상속을 통해 Object.prototype.__proto__ 프로퍼티를 사용한다.
- __proto__ 접근자 프로퍼티를 사용하는 이유 : 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다. 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.
- __proto__ 접근자 프로퍼티는 코드 내에서 직접 사용하는 것은 권장되지 않는다. 아래와 같이 Object.getPrototypeOf(), setPrototypeOf() 메서드를 사용한다.
```javascript
const obj = {};
const parent = {x:1};

console.log(Object.getPrototypeOf(obj)); // obj.__proto__;
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;
console.log(Object.getPrototypeOf(obj)); // parent
console.log(obj.x); // 1
```

#### 19.3.2 함수 객체의 prototype 프로퍼티
함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

#### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자함수
모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자함수를 기리킨다.

### 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
- 객체 리터럴 / 생성자 함수 : Object
- 함수 리터럴 / 생성자 함수 : Function
- 배열 리터럴 / 생성자 함수 : Array

### 19.5 프로토타입의 생성시점

### 19.6 객체 생성 방식과 프로토타입의 결정

### 19.7 프로토타입 체인

### 19.8 오버라이딩과 프로퍼티 섀도잉

### 19.9 프로토타입의 교체

### 19.10 instanceof 연산자
instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 **생성자 함수의 prototype에 바인딩된
객체가 프로토타입 체인 상에 존재하는지 확인한다.**

### 19.11 직접 상속

### 19.12 정적 프로퍼티/메서드 ????

### 19.13 프로퍼티 존재 확인
#### 19.13.1 in 연산자
in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.
```javascript
const person = {
    name:'lee',
    address:'seoul'
};

console.log('name' in person);  //true
console.log('age' in person);   //false
console.log('constructor' in person);  // true // 상속받은 프로토타입의 프로퍼티까지 열거뿐 아니라 Object.prototype의 프로퍼티도 열거
console.log('toString' in person) // true


console.log(person.hasOwnProperty('name'));     //true
```
in 연산자는 person 객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입에서 프로퍼티를 검색한다.  
ES6 에서 도임된 Reflect.has 메서드를 사용해도 똑같이 동작한다.

#### 19.13.2 Object.prototype.hasOwnProtperty 메서드
이 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true 를 반환하고 상속받은 프로토타입 프로퍼티 키인 경우 false 를
반환한다.

### 19.14 프로퍼티 열거

#### 19.14.1 for... in 문
객체의 모든 프로퍼티를 순회하며 열거하려면 for...in 문을 사용한다.
```javascript
const person = {
    name: 'lee',
    address: 'seoul'
};

console.log('toString' in person) // true

for (const key in person) {
    console.log(key + ' : ' +person[key]);
}

//name: lee
//address: seoul
```
for...in 문은 in 연산자처럼 순회 대상 객체의 프로퍼티뿐 아니라 상속받은 프로토타입의 프로퍼티까지 열거한다. 하지만 toString 메서드가
열거되지 않는 이유는 toString 메서드가 열거할 수 없도록 저으이된 프로퍼티이기 때문이다. 다시말해, Object.prototype.toString 프로퍼티의
프로퍼티 어트리뷰트 [[Enumerable]] 값이 false 이기 때문이다.

#### 19.4.2 Object.keys/values/entries 메서드
객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys/values/entries 메서드를 사용하는 것을 권장한다. 이 메서드들은 해당 값을 배열형태로 반환한다.
```javascript
const person = {
    name : 'lee',
    address: 'seoul',
    __proto__: {age :20}
};

console.log(Object.keys(person));

console.log(Object.values(person));

console.log(Object.entries(person));

Object.entries(person).forEach(([k,v]) => console.log(k,v))

/*
[ 'name', 'address' ]
[ 'lee', 'seoul' ]
[ [ 'name', 'lee' ], [ 'address', 'seoul' ] ]
name lee
address seoul
 */
```

-------------------------------------------------------------------------

## ch20 - strict mode














































