## ch28 - Number
표준 빌트인 객체인 Number는 원시 타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공한다.

### 28.1 Number 생성자 함수
표준 빌트인 객체인 Number 객체는 생성자 함수 객체다. 따라서 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.  
Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼
객체를 생성한다.
```javascript
const numObj = new Number()
console.log(numObj) // Number {[[{primitiveValue]] : 0 }
```
[[primitiveValue]] 라는 접근할 수 없는 프로퍼티가 보인다. 이는 [[NumberData]] 내부 슬롯을 가리킨다. 
Number 생성자 함수의 인수로 숫자를 전달하면서 new 연산자와 함께 호출하면 [[NumberDate]] 내부 슬롯에 인수로 전달받은 숫자를 할당한
Number 래퍼 객체를 생성한다.
```javascript
const numObj = new Number(10);
console.log(numObj); // Number {[[{primitiveValue]] : 10 }
```

### 28.2 Number 프로퍼티
#### 28.2.1 Number.EPSILON
Number.EPSILON 은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다. 이 값은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.  
부동소수점 산술 연산읜 정확한 결과를 기대하기 어렵다. 부동소수점을 2진법으로 변환했을 때 미세한 오차가 발생할 수 밖에 없는 구조이기 때문이다.
```javascript
0.1+0.2 // 0.30000000000000000004
01 + 0.2 === 0.3 // false

function isEqual(a,b) {
    return Math.abs(a-b) < Number.EPSILON
}

isEqual(0.1+0.2 , 0.3) // true
```

#### 28.2.2 Number.MAX_VALUE
자스에서 표한할 수 있는 가장 큰 양수 값이다. 이보다 큰 값은 Infinity 이다.

#### 28.2.3 Number.MIN_VALUE

#### 28.2.4 Number.MAX_SAFE_INTEGER
자스에서 안전하게 표현할 수 있는 가장 큰 정수값

#### 28.2.5 Number.MIN_SAFE_INTEGER

#### 28.2.6 Number.POSITIVE_INFINITY
양의 무한대를 나타내는 숫자값

#### 28.2.7 Number.NEGATIVE_INFINITY

#### 28.2.8 Number.NaN
숫자가 아님을 나타내는 숫자값

### 28.3 Number 메서드

#### 28.3.1 Number.isFinite(정적메서드)
인수로 전달된 숫자값이 정상적인 유한수 인지 검사하여 불리언 값으로 반환한다. 빌트인 전역함수 isFinite는 전달받은 인수를 숫자로 암묵적 타입 변환하여
검사를 수행하지만, Number.isFinite 메서드는 숫자가 아닌 인수로 주어졌을 때 반환값은 언제나 false이다.

#### 28.3.2 Number.isInteger(정적메서드)
인수로 전달된 숫자값이 정수인지 검사하여 그 결과를 불리언으로 반환한다. 인수를 숫자로 암묵적 타입 변환하지 않는다.

#### 28.3.3 Number.isNaN(정적메서드)

#### 28.3.4 Number.isSafeInteger(정적메서드)

#### 28.3.5 Number.prototype.toExponential
해당 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다. 인수로 소수점 이하로 표현할 자릿수를 전달할 수 있다.
```javascript
const numObj = Number(77.1234);

console.log(numObj.toExponential())
console.log(numObj.toExponential(4))
console.log(numObj.toExponential(2))
/*
7.71234e+1
7.7123e+1
7.71e+1
 */
```

#### 28.3.6 Number.prototype.toFixed
숫자를 반올림하여 문자열로 반환한다. 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달할 수 있다. 기본값은 0이다.

#### 28.3.7 Number.prototype.toPrecision
인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다. 인수로 전달받은 값으로 전체 자릿수를 표현할 수 없는 경우
지수 표기법으로 결과를 반환한다.

#### 28.3.8 Number.prototype.toString
숫자를 문자열로 변환하여 반환한다. 진법을 나타내는 2~36 사이의 정수값을 인수로 전달할 수 있다.

-------------------------------------------------------------------------

## ch29 Math
표준 빌트인 객체 Math 는 수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공한다. Math 는 생성자 함수가 아니다. 따라서 Math는 정적 프로퍼티와
정적 메스드만 제공한다.

### 29.1 Math 프로퍼티

#### 29.1.1 Math.PI
원주율 PI 값을 반환한다.

### 29.2 Math 메서드
#### 29.2.1 Math.abs
인수로 전달된 숫자의 절대값을 반환한다. 절대값은 반드시 0 또는 양수이어야 한다.

#### 29.2.2 Math.round
인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환한다.

#### 29.2.3 Math.ceil
인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환한다.

#### 29.2.4 Math.floor
인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환한다.

#### 29.2.5 Math.sqrt
인수로 전달된 숫자의 제곱근을 반환한다.

#### 29.2.6 Math.random
임의의 난수를 반환한다. 이 메서드가 반환한 난수는 0 이상 1 미만의 실수이다.

#### 29.2.7 Math.pow
첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과를 반환한다.

#### 29.2.8 Math.max
전달받은 인수 중에서 가장 큰 수를 반환한다. 

#### 29.2.9 Math.min
전달받은 인수 중에서 가장 작은 수를 반환한다.

-------------------------------------------------
## ch30 - Date
표준 빌트인 객체인 Date는 날짜와 시간(연, 월, 일, 시, 분, 초, 밀리초(천분의 1초))을 위한 메서드를 제공하는 빌트인 객체이면서
생성자 함수다.
UTC(협정 세계시)는 국제 표준시를 말한다. UTC는 GMT(그리니치 평균시)로 불리기도 한다. 기술적인 표기에서는 UTC가 사용된다.  
KST(한국 표준시)는 UTC에 9시간을 더한 시간이다. 즉, KST는 UTC 보다 9시간 빠르다. 예슬 들어, UTC 00:00 AM 은
KST 09:00 AM 이다  
현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시계에 의해 결정된다.

### 30.1 Date 생성자 함수
Date 는 생성자 함수다. Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다. 이 값은
1970년 1월 1일 00:00:00(UTC)을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다. 예를 들어, 모든 시간의
기점은 1970년 1월 1일 0시를 나타내는 Date 객체는 내부적으로 정수값 0을 가지며, 하루가 지난 1970년 1월 2일 0시를 나타내는
Date 객체는 내부적으로 정수값 86,400,000*(24h * 60m * 60s * 1000ms) 을 갖는다.  
Date 생성자 함수로 객체를 생성하는 방법은 다음과 같이 4가지가 있다.

#### 30.1.1 new Date()
Date 생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다. Date 객체는 내부적으로
정수값을 갖지만, 콘솔에 출력하면 날짜와 시간 정보를 문자열로 출력한다.

#### 30.1.2 new Date(milliseconds)
1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체 반환

#### 30.1.3 new Date(dateString)
날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다. 이때 인수로 전달한
문자열은 Date.parse 메서드에 의해 해석 가능한 형식이어야 한다.

#### 30.1.4 new Date(year, month[,day, hour, minute, second, millisecond])
Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date
객체를 반환한다. 이때 연, 월은 만드시 지정해야 한다. 지정하지 않은 옵션 정보는 0 또는 1로 초기화된다.  
**주의! Date 객체에서 월을 0~11의 정수로 나타내는 경우가 있다.**

### 30.2 Date 메서드

#### 30.2.1 Date.now
기점이 되는 시간부터 현재 시간까지 경과한 밀리초를 숫자로 반환한다.
```javascript
const now = Date.now();
new Date(now);
```
#### 30.2.2 Date.parse
#### 30.2.3 Date.UTC
#### 30.2.4 Date.prototype.getFullYear
#### 30.2.5 Date.prototype.setFullYear

#### 30.2.6 Date.prototype.getMonth
#### 30.2.7 Date.prototype.setMonth

#### 30.2.8 Date.prototype.getDate
#### 30.2.9 Date.prototype.setDate

#### 30.2.10 Date.prototype.getDay
Date 객체에 요일(0(일요일)~6(토요일))을 나타내는 정수를 반환한다. 
```javascript
new Date('2025/04/12').getDay(); // 6(토요일) 
```
#### 30.2.11 Date.prototype.getHours
#### 30.2.12 Date.prototype.setHours
Date 객체에 시간(0~23)을 나타내는 정수를 반환하고, 설정하는 메서드.

#### 30.2.13 Date.prototype.getMinutes
#### 30.2.14 Date.prototype.setMinutes

#### 30.2.15 Date.prototype.getSeconds
#### 30.2.16 Date.prototype.setSeconds

#### 30.2.17 Date.prototype.getMilliseconds
#### 30.2.18 Date.prototype.setMilliseconds

#### 30.2.19 Date.prototype.getTime
#### 30.2.20 Date.prototype.setTime
UTC 기준시부터 Date 객체의 시간까지 경과된 밀리초를 반환하거나 설정

#### 30.2.21 Date.prototype.getTimezoneOffset
UTC와 Date 객체에 지정된 로케일(locale) 시간과으 ㅣ차이를 분 단위로 반환한다.

#### 30.2.22 Date.prototype.toString
사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.

#### 30.2.23 Date.prototype.toTimeString
사람이 읽을 수 있는 형식의 문자열로 Date 객체의 시간을 반환한다.

#### 30.2.24 Date.prototype.toISOString
ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

#### 30.2.25 Date.prototype.toLocaleString
인수로 전달한 로케일을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

#### 30.2.26 Date.prototype.toLocaleTimeString
인수로 전달한 로케일을 기준으로 Date 객체의 시간을 표현한 문자열을 반환한다. 



























































