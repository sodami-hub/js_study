/*
용어 정리
1. 렉시컬 환경 : 식별자와 식별자에 바인딩 된 값, 상위 스포크에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트
실행 컨텍스트 스택이 코드의 실행 순서를 관리한다면 렉시컬 환경은 스코프와 식별자를 관리한다.

 */

var x = 1;
const y =2;

function foo(a) {
  var x= 3;
  const y =4;

  function bar(b) {
    const z= 5;
    console.log(a+b+x+y+z);
  }
  bar(10);
}

foo(20); //42

/*
1. 전역 실행 컨텍스트 생성
  비어있는 전역 실행 컨텍스트를 생성하여 실행 컨텍스트 스택에 푸쉬

2. 전역 렉시컬 환경 생성
  전역 렉시컬 환경을 생성하고 전역 실행 컨텍스트에 바인딩, 전역 렉시컬 환경은 2개의 컴포넌트,
  즉 환경 레코드와 외부 렉시컬 환경에 대한 참조로 구성된다.

2-1. 전역 환경 레코드 생성
  전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 이루어져 있다.
  - 객체 환경 레코드는 var 키워드로 선언한 전역변수와 함수 선언문으로 정의한 전역 함수, 빌트인 전역 프로퍼티와 빌트인 전역 함수,
  표준 빌트인 객체를 관리한다.
  - 선언적 환경 레코드는 let, const 키워드로 선언한 전역 변수를 관리한다.

2-1-1. 객체 환경 레코드 생성
  전역 코드의 평가 과정에서 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 환경 레코드의 객체 환경 레코드에
  연결된 BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다.
  위 예제의 x와 foo는 객체 환경 레코드를 통해 객체 환경 레코드의 BindingObject에 바인딩되어 있는 전역 객체의 프로퍼티와 메스다가 된다.
  참고로 x는 var 키워드로 선언된 변수로 선언과 초기화가 평가 단계에서 동시에 진행도니다. x=undefined가 전역 객체에 저장된다.

2-1-2. 선언적 환경 레코드 생성
  let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않고 개념적인 블록내에 존재한다고 했다. 여기서 개념적인 블록이
  바로 전역 환경 레코드의 선언적 환경 레코드다.
  참고로 let,const또한 호이스팅이 일어나지만 초기화가 되지 않기 때문에 런타임에 선언문에 도달하기 전까지는 일시적 사각지대에 빠진다.

2-2. this 바인딩
  전역 확경 레코드의 [[GlobalThisValue]] 내부 슬롯에 this(전역 객체)가 바인딩된다.

2-3. 외부 렉시컬 환경에 대한 참조 결정
  현재 평가 중인 소스코드를 포함하는 외부 소스코드의 렉시컬 환경, 즉 상위 스코프를 가리킨다. 이를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.
  현재 평가 중인 소스코드는 전역 코드이므로 null이 할당된다.

3. 전역 코드 실행
  변수 할당문이 실행되어 전역 변수 x,y에 값이 할당된다. 그리고 foo함수가 호출된다.
  변수 할당문 또는 함수 호출문을 실행하려면 먼저 변수 또는 함수 이름이 선언된 식별자인지 확인해야 한다. 선언되지 않은 식별자는 참조할 수 없고, 호출할 수 없다.
  또한 식별자는 스코프가 다르면 같은 이름을 가질 수 있다. 즉, 동일한 이름의 식별자가 다른 스코프에 존재할 수 있다.
  따라서 어느 스코프의 식별자를 참조하면 되는지 결정할 필요가 있다. 이것을 식별자 결정이라고 한다.

4. foo함수 코드 평가
  현재 foo함수를 호출하기 직전이다.
  전역 코드의 실행을 일시 중지하고 foo 함수 내부로 코드의 제어권이 이동한다. 그리고 함수 코드를 평가하기 시작한다. 아래와 같은 순서로 진행된다.
    4-1. 함수 실행 컨텍스트 생성
    4-2. 함수 렉시컬 환경 생성
    4-2-1. 함수 환경 레코드 생성(<-> 전역 환경 레코드)
    4-2-2. this 바인딩
    4-2-3. 외부 렉시컬 환경에 대한 참조 결정(여기서는 전역 객체)
      참고로 렉시컬 스코프에서 자스는 함수를 어디에 정의했는지에 따라 정적으로 상위 스코프가 결정된다.

4-1. foo 함수 코드 실행

5. bar 함수 평가

5-1. bar 함수 코드 실행
    */