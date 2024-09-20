//typeof 연산자

console.log(typeof '');
console.log(typeof 1);
console.log(typeof NaN);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof Symbol());
console.log(typeof null);    // null의 타입은 object 이다!! - 버그!!
console.log(typeof []);
console.log(typeof {});
console.log(typeof new Date());
console.log(typeof /test/gi);
console.log(typeof function() {});

// 값이 null타입인지 확인하기 위해서는 typeof 메서드가 아닌 일치 연산자(===) 사용.