/*
3. 객체 동결
Object.freeze 메서드는 객체를 동결한다.
프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의, 프로퍼티 값 갱신을 금지한다.
즉! 동결된 객체는 읽기만 가능하다.
 */

const person ={
    name :'lee'
};

console.log(Object.isFrozen(person));

Object.freeze(person);

console.log(Object.isFrozen(person));

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {
    value: 'lee',
    writable: false,  // 프로퍼티 추가,삭제,수정 금지
    enumerable: true,
    configurable: false  // 어트리뷰트 재정의 금지
  }
}
 */

/*
4. 불변 객체
1~3은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중척 객체까지는 영향을 주지 않는다.
따라서 Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결은 안된다.

객체의 중첩 객체까지 동결하여 변경 불가능한 읽기 전용의 불변 객체를 구현하려면
모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.
 */

function deepFreeze(target) {
    // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결
    if(target && typeof target === 'object' && !Object.isFrozen(target)) {
        Object.freeze(target);

        // 모든 프로퍼티를 순회하며 재귀적으로 동결
        Object.keys(target).forEach(key=>deepFreeze(target[key]));
    }
    return target;
}

const person02 = {
    name : 'kim',
    address : {city : 'seoul'}
};

deepFreeze(person02);

console.log(Object.isFrozen(person02));  // true

console.log(Object.isFrozen(person02.address));  // true

// 프로퍼티 수정해보자.
person02.address.city='busan';  //{ name: 'kim', address: { city: 'seoul' } }


console.log(person02);