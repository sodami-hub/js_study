### 39.7 어트리뷰트
#### 39.7.1 어트리뷰트 노드와 attributes 프로퍼티
HTML 문서의 구성 요소인 HTML 요소는 여러 개의 어트리뷰트(속성)을 가질 수 있다. HTML 요소의 동작을 제어하기 위한 추가적인 정보를 제공하는 HTML
어트리뷰트는 HTML 요소의 시작 태그에 어트리뷰트 이름='어트리뷰트 값' 형식으로 정의한다.
```html
<input id="user" type="text" value="name">
```
글로벌 어트리뷰트와 이벤트 핸들러 어트리뷰트는 모든 HTML 요소에서 공통적으로 사용할 수 있지만 특정 HTML 요소에만 한정적으로 사용 가능한 어트리뷰트도
있다. 예를 들어, id, class, style 어트리뷰트는 모든 HTML 요소에 사용할 수 있지만 type, value, checked 어트리뷰트는 input 요소에만 사용할 수 있다.  
HTML 요소가 파싱될 때 HTML 요소의 어트리뷰트(이하 HTML 어트리뷰트)는 어트리뷰트 노드로 변환되어 요소 노드와 연결된다. 이때 HTML 어트리뷰트당 하나의
어트리뷰트 노드가 생성된다. 즉, 위 input 요소는 3개의 어트리뷰트가 있으므로 3개의 어트리뷰트 노드가 생성된다.  
**이때 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 NamedNodeMap 객체에 담겨서 요소 노드의 attributes 프로퍼티에 저장된다.**     
따라서 요소 노드의 모든 어트리뷰트 트도는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있다. attributes 프로퍼티는 getter만
존재하는 읽기 전용 접근자 프로퍼티이며, 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환한다.
```html
<div>
    <input type="text" id="user" value="name">
</div>
<script>
    const {attributes} =document.getElementById('user')
    console.log(attributes);
    [...attributes].forEach((attribute) => console.log(attribute));

    console.log(attributes.id.value);  //user
    console.log(attributes.type.value);  // text
    console.log(attributes.value.value); // name
</script>
```

#### 39.7.2 HTML 어트리뷰트 조작
요소 노드의 attributes 프로퍼티는 getter 만 존재하는 읽기 전용 접근자 프로퍼티이므로 HTML 어트리뷰트 값을 취득할 수 있지만 변경할 수는 없다.
또한 attributes.id.value와 같이 attributes 프로퍼티를 통해야만 HTML 어트리뷰트 값을 취득할 수 있기 때문에 불편하다.  
Element.prototype.getAttribute/setAttribute 메서드를 사용하면 attributes 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접
어트리뷰트 값을 취득하거나 변경할 수 있다.   
HTML 어트리뷰트 값을 참조하려면 Element.prototype.getAttribute(어트리뷰트 이름) 메서드를 사용하고 값을 변경하려면 setAttribute(어트리뷰트이름, 값)
메서드를 사용한다.
```html
<body>
<div>
    <input type="text" id="user" value="name">
</div>
<script>
    const $input =document.getElementById('user')

    const typeVal = $input.getAttribute('type')
    console.log(typeVal) // text

    $input.setAttribute('value', 'changedValue')  // 속성 값 변경(name=>changedValue)
</script>
</body>
```

#### 39.7.3 HTML 어트리뷰트 vs.DOM 프로퍼티
요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티(이하 DOM 프로퍼티)가 존재한다. 이 DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있다.   
예를 들어, <input id="user" type="text" value="name"> 요소가 파싱되어 생성된 요소 노드 객체에는 id, type, value 어트리뷰트에 대응하는 id, type,
value 프로퍼티가 존재하며, 이 DOM 프로퍼티들은 HTML 어트리뷰트의 값을 초기값으로 가지고 있다. 즉 아래와 같이 어트리뷰트에 접근할 수 있고 변경도 가능하다.
```html
<div>
    <input type="text" id="user" value="name">
</div>
<script>
    const $input =document.getElementById('user')

    console.log($input.type) // text
    console.log($input.id)  // user
    console.log($input.value) // value

    $input.type="password"
    console.log($input.type) // password
</script>

```
이처럼 HTML 어트리뷰트는 다음과 같이 DOM에서 중복 관리되고 있는 것처럼 보인다.
1. 요소 노드의 attributes 프로퍼티에서 관리하는 어트리뷰트 노드
2. HTML 어트리뷰트에 대응하는 요소 노드의 프로퍼티(DOM 프로퍼티)

HTML 어트리뷰트는 DOM에서 중복 관리되고 있을까? 그렇지 않다. 우선 HTML 어트리뷰트의 역할을 살펴보겠다.   
**HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것이다. 즉, HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않는다.**    
예를 들어, `<input id="user" type="text" value="name">` 요소의 value 어트리뷰트는 input 요소가 렌더링될 때 입력 필드에 표시할 초기값을 지정한다.
즉, input 요소가 렌더링되면 입력 필드에 초기값으로 지정한 value 어트리뷰트 값 'name' 이 표시된다.  
이때 input 요소의 value 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드의 attiributes 프로퍼티에 저장된다. 이와는 별도로 value 어트리뷰트의 값은
요소 노드의 value 프로퍼티에 할당된다. 따라서 input 요소의 요소 노드가 생성되어 첫 렌더링이 끝난 시점까지 어트리뷰트 노드의 어트리뷰트 값과 요소 노드의 
value 프로퍼티에 할당된 값은 HTML 어트리뷰트 값과 동일하다.  
하지만 첫 렌더링 이후 사용자가 input 요소에 무언가를 입력하기 시작하면 상황이 달라진다.  
**요소 노드는 상태(state)를 가지고 있다.** 예를 들어, input 요소 노드(혹은 checkbox 요소)는 사용자가 입력 필드에 입력한 값을 상태로 가지고 있다.
사용자가 input 요소 입력 필드에 foo라는 값을 입력한 경우를 생각해보겠다. 이때 input 요소 노드는 사용자의 입력에 의해 변경된 최신 상태('foo')를 
관리해야 하는 것은 물론, HTML 어트리뷰트로 지정한 초기 상태("name")도 관리해야 한다. **초기 상태 값을 관리하지 않으면 웹페이지를 새로고침할 때 초기
상태를 표시할 수 없다.**  
이처럼 요소 노드는 2개의 상태, 즉 초기 상태와 최신 상태를 관리해야 한다. 요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소 노드의 최신 상태는
DOM 프로퍼티가 관리한다.

##### 어트리뷰트 노드
**HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태는 어트리뷰트 노드에서 관리한다. 어트리뷰트 노드에서 관리하는 어트리뷰트 값은 사용자의 입력에 의해
상태가 변경되어도 변하지 않고 HTML 어트리뷰특로 지정한 HTML 요소의 초기 상태를 그대로 유지한다.**  
어트리뷰트 노드가 관리하는 초기 상태 값을 취득/변경 하려면 getAttribute/setAttribute 메서들르 사용한다.

##### DOM 프로퍼티
**사용자가 입력한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리한다. DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여
언제나 최신 상태를 유지한다.**  
하지만 모든 DOM 프로퍼티가 사용자의 입력에 의해 변경된 최신 상태를 관리하는 것은 아니다. 예를 들어, input 요소의 사용자 입력에 의한 상태 변화는 value
프로퍼티가 관리하고 checkbox 요소의 사용자 입력에 의한 상태 변화는 checked 프로퍼티가 관리한다. 하지만 id 어트리뷰트에 대응하는 id 프로퍼티는 
사용자의 입력과 아무런 관련이 없다.  
이처럼 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리한다. 그 외의 사용자 입력에 의한 상태 변화와 관계없는 어트리뷰트와 DOM
프로퍼티는 항상 동일한 값으로 연동한다.

###### HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계<br>
대부분의 HTML 어트리뷰트는 HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티와 1:1로 대응한다. 단, 다음과 같이 HTML 어트리뷰트와 DOM 프로퍼티가 언제나 1:1로 
대응하는 것은 아니며, HTML 어트리뷰트 이름과 DOM 프로퍼티 키가 반드시 일치하는 것도 아니다.
- id 어트리뷰트와 id 프로퍼티는 1:1 대응하며, 동일한 값으로 연동한다.
- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응한다. 하지만 value 어트리뷰트는 초기상태 value 프로퍼티는 최신상태를 갖는다.
- class 어트리뷰트는 className, classList 프로퍼티와 대응한다.
- for 어트리뷰트는 htmlFor 프로퍼티와 1:1 대응한다.
- td 요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 존재하지 않는다.
- textContent 프로퍼티는 대응하는 어트리뷰트가 존재하지 않는다.
- 어트리뷰트 이름은 대소문자를 구별하지 않지만 대응하는 프로퍼티 키는 카멜 케이스를 따른다.

###### DOM 프로퍼티 값의 타입
getAttribute 메서드로 취득한 어트리뷰트 값은 언제나 문자열이다. 하지만 DOM 프로퍼티로 취득한 최신 상태 값은  문자열이 아닐 수 있다. 예를 들어,
checkbox 요소의 checked 어트리뷰트 값은 문자열이지만 checked 프로퍼티 값은 불리언 타입이다.1

#### 39.7.4 data 어트리뷰트와 dataset 프로퍼티
data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있다. data 어트리뷰트는
data-user-id, data-role 과 같이 data- 접두사 다음에 임의의 이름을 붙여 사용한다.
```html
<div>
    <ul id="users">
        <li id="1" data-user-id="7621" data-role="admin">Lee</li>
        <li id="2" data-user-id="9624" data-role="subscriber">Kim</li>
    </ul>
</div>
```
data 어트리뷰트의 값은 HTMLElement.dataset 프로퍼티로 취득할 수 있다. dataset 프로퍼티는 HTML 요소의 모든 data 어트리뷰트의 정보를 제공하는
DOMStringMap 객체를 반환한다. DOMStringMap 객체는 data어트리뷰트의 data- 접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있다.
이 프로퍼티로 data 어트리뷰트의 값을 취득하거나 변경할 수 있다.
```html
<body>
<div>
    <ul id="users">
        <li id="1" data-user-id="7621" data-role="admin">Lee</li>
        <li id="2" data-user-id="9624" data-role="subscriber">Kim</li>
    </ul>
</div>
<script>
    const users = [...document.querySelector('#users').children];
    const user = users.find(user=>user.dataset.userId==='7621');
    console.log(user.dataset.role) // admin
</script>
</body>
```

### 39.8 스타일

#### 39.8.1 인라인 스타일 조작
HTMLElement.prototype.style 프로퍼티는 setter 와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 **인라인 스타일**을 취득하거나 추가 또는 변경한다.

#### 39.8.2 클래스 조작
.으로 시작하는 클래스 선택자를 사용하여 CSS class를 미리 정의한 다음, HTML 요소의 class 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수 있다.
이때 HTML 요소의 class 어트리뷰트를 조작하려면 39.7 절 '어트리뷰트'에서 살펴보았듯이 class 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티를 사용한다.  
단, class 어트리뷰트에 대응하는 DOM 프로퍼티는 class 가 아니라 className과 classList다. 자바스크립트에서 class는 예약어이기 때문이다.

##### className
Element.prototype.className 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 HTML 요소의 class 어트리뷰트 값을 취득하거나 변경한다.
요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환하고, 요소 노드의 className 프로퍼티에 문자열을 할당하면 class 어트리뷰트
값을 할당한 문자열로 변경한다.
```html
<div>
    <div class="box red">hello world</div>
</div>
<script>
    const $div = document.querySelector('.box')
    console.log($div.className) // box red
    $div.className = $div.className.replace('red','blue')
    console.log($div.className) // box blue
</script>
```
className 프로퍼티는 문자열을 반환하므로 공백으로 구분된 여러 개의 클래스를 반환하는 경우 다루기가 불편하다.

##### classList
Element.prototype.classList 프로퍼티는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환한다.

```html
<body>
<div>
    <div class="box red">hello world</div>
</div>
<script>
    const $div = document.querySelector('.box')
    console.log($div.classList) // ['box', 'red', value: 'box red']

    $div.classList.replace('red', 'blue');
    console.log($div.classList) //['box', 'blue', value: 'box red']
</script>
</body>
```
DOMTokenList 객체는 class 어트리뷰트의 정보를 나타내는 컬렉션 객체로서 유사 배열 객체이면서 이터러블이다. 다음과 같이 유용한 메서드들을 제공한다.
- add(... className)
- remove(... className)
- item(index) : index에 해당하는 클래스를 class 어트리뷰트에서 반환한다.
- contains(className) : 인수로 전달한 문자열과 일치하는 클래스가 class 어트리뷰트에 포함되어 있는지 확인한다.
- replace(oldClassName, newClassName) : 변경한다.
- toggle(className[,force]) : toggle 메서드는 인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고, 존재하지 않으면 추가한다.   
두번째 인수로 불리언 값으로 평가되는 조건식을 전달할 수 있다. 이때 조건식의 평가 결과가 true 이면 class 어트리뷰트에 강제로 첫 번째 인수로 전달받은
문자열을 추가하고, false 이면 class 어트리뷰트에서 강제로 첫 번째 인수로 전달받은 문자열을 제거한다.   

이 밖에도 DOMTokenList 객체는 forEach, entries, keys, values, supports 메서드를 제공한다.

#### 39.8.3 요소에 적용되어 있는 CSS 스타일 참조
style 프로퍼티는 인라인 스타일만 반환한다. 따라서 클래스를 적용한 스타일이나 상속을 통해 암묵적으로 적용된 스타일은 style 프로퍼티로 참조할 수 없다.
HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야 할 경우 getComputedStyle 메서드를 사용한다.

### 39.9 DOM 표준
HTML과 DOM 표준은 W3C(World Wide Web Consortium)과 WHATWG(Web Hypertext Application Technology Working Group) 이라는 두 단체가 나름대로
협력하면서 공통된 표준을 만들어 왔다.    
2018년 4월 부터 구글, 애플, 마이크로소프트, 모질라로 구성된, 4개의 주류 브라우저 벤더사가 주도하는 WHATWG 이 단일 표준을 내놓기로 합의했다.

























































