### 39.6 DOM 조작
DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다. DOM 조작에 의해 DOM에 새로운 노드가 추가되거나 삭제되면
리플로우와 리페인트가 발생하는 원인이 되므로 성능에 영향을 준다. 따라서 DOM 조작은 성능 최적화를 위해 주의해서 다뤄야 한다.

#### 39.6.1 innerHTML
Element.prototype.innerHTML 프로퍼티는 요소 노드의 HTML 마크업을 취득하거나 변경한다. 요소 노드의 innerHTML 프로퍼티를 참조하면 요소 노드의
콘텐츠 영역(시작 태그와 종료 태그 사이) 내에 포함된 모든 HTML 마크업을 문자열로 반환한다.  
textContent 프로퍼티를 참조하면 HTML 마크업을 무시하고 텍스트만 반환하지만 innerHTML 프로퍼티는 HTML 마크업이 포함된 문자열을 그대로 반환한다.  
또한 요소 노드의 innerHTML 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어
요소 노드의 자식 노드로 DOM에 반영된다. 이처럼 innerHTML 프로퍼티를 사용하면 HTML 마크업 문자열로 간단히 DOM 조작이 가능하다.  
요소 노드의 innerHTML 프로퍼티에 할당한 HTML 마크업 문자열은 렌더링 엔지에 의해 파싱되어 요소 노드의 자식으로 DOM에 반영된다. 이때 사용자로부터
입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은 크로스 사이트 스크립팅 공격에 취약하므로 위험하다. HTML 마크업 내에 자바스크립트
악성 코드가 포함되어 있다면 파싱 과정에서 그대로 실행될 가능성이 있기 때문이다.  
innerHTML 프로퍼티의 또 다른 단점은 요소 노드의 innerHTML 프로퍼티에 HTML 마크업 문자열을 할당하는 경우 요소 노드의 모든 자식 노드를 제거하고
할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경한다는 것이다.
```html
<body>
<div>
    <ul id="fruits">
        <li class="apple">apple</li>
    </ul>
</div>
<script>
    const $fruits = document.getElementById('fruits');
    $fruits.innerHTML += '<li class="orange">orange</li>';
</script>
</body>
```
위 예제는 fruits 요소에 li.orange 를 추가한다. 이때 li.apple은 아무런 변경이 없으므로 다시 생성할 피룡가 없다. 하지만 innerHTML은 모든 자식 노드를
제거하고 새롭게 요소 노드를 생성하여 #fruits 요소의 자식 요소로 추가한다.  
innerHTML 프로퍼티의 또다른 단점은 새로운 요소를 삽입할 때 삽입할 위치를 지정할 수 없다는 단점도 있다. innerHTML 프로퍼티는 복잡하지 않은 요소를 새롭게
추가할 때 유용하지만 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입해야 할 때는 사용하지 않는 것이 좋다.

#### 39.6.2 insertAdjacentHTML 메서드
Element.prototype.insertAdjacentHTML(position, DOMString) 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.

#### 39.6.3 노드 생성과 추가
innerHTML 프로퍼티와, insertAdjacentHTML 메서드는 HTML 마크업 문자열을 파싱하여 노드를 생성하고 DOM에 반영한다. DOM은 노드를 직접 생성/삽입/삭제/치환하는
메서드도 제공한다.
```html
<body>
<div>
    <ul id="fruits">
        <li class="apple">apple</li>
    </ul>
</div>
<script>
    const $fruits = document.getElementById('fruits');

    const newLi = document.createElement('li');
    const textNode = document.createTextNode('banana');

    newLi.appendChild(textNode);
    $fruits.appendChild(newLi);
</script>
</body>
```
위 예제는 새로운 요소 노드를 생성하고 텍스트 노드를 생성하여 요소 노드의 자식 노드로 추가한 다음, 요소 노드를 DOM에 추가한다

##### 요소 노드 생성     
Document.prototype.createElement(tagName) 메서드는 요소 노드를 생성하여 반환한다. createElement 메서드로 생성한 요소 노드는 기존 DOM에
추가되지 않고 홀로 존재하는 상태다. 또한 아무런 자식 노드를 가지고 있지 않다. 따라서 요소 노드의 자식 노드인 텍스트 노드도 없는 상태다.

##### 텍스트 노드 생성
Document.prototype.createTextNode(text) 메서드는 텍스트 노드를 생성하여 반환한다.

##### 텍스트 노드를 요소 노드의 자식 노드로 추가
Node.prototype.appendChild(childNode) 메서드는 매개변수 chlidNode에게 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막
자식 노드로 추가한다.

##### 요소 노드를 DOM에 추가

#### 39.6.4 복수의 노드 생성과 추가
이번에는 여러 개의 요소 노드를 생성하여 DOM에 추가해보겠다.
```html
<body>
<div>
    <ul id="fruits">
        <li class="apple">apple</li>
    </ul>
</div>
<script>
    const $fruits = document.getElementById('fruits');

    ['apple','banana','mango','orange'].forEach(fruit => {
        const $li = document.createElement('li');
        const $textNode = document.createTextNode(fruit);
        $li.appendChild($textNode);
        $fruits.appendChild($li);

    })
</script>
</body>
```
위와 같은 방식은 요소 노드를 생성하여 DOM에 3번 추가하므로 DOM이 3번 변경된다. 이때 리플로우와 리페인트가 3번 실행된다. 따라서 위와 같이 기존 DOM에
요소 노드를 반복하여 추가하는 것은 비효율적이다.  
이러한 문제를 해결하기 위해서 컨테이너 요소를 사용해보겠다. 컨테이너 요소를 미리 생성한 다음, DOM에 추가해야 할 3개의 요소를 컨테이너 요소에 자식 노드로 추가하고,
컨테이너 요소를 $fruits 요소에 자식으로 추가하면 DOM은 한 번만 변경된다.
```html
<div>
    <ul id="fruits">
        <li class="apple">apple</li>
    </ul>
</div>
<script>
    const $fruits = document.getElementById('fruits');

    // 컨테이너 요소 생성
    const container = document.createElement('div');

    ['apple','banana','mango','orange','pizza'].forEach(fruit => {
        const $li = document.createElement('li');
        const $textNode = document.createTextNode(fruit);
        $li.appendChild($textNode);
        container.appendChild($li);
    })

    $fruits.appendChild(container);
</script>
</body>
```
위 예제는 DOM을 한 번만 변경하므로 성능에 유리하지만 불필요한 컨테이너 요소가 DOM에 추가되는 부작용이 있다. 이는 바람직하지 않다.  
이러한 문제는 DocumentFragment 노드를 통해 해결할 수 있다. DocumentFragment 노드는 문서, 요소, 어트리뷰트, 텍스트 노드와 같은 노드 객체의 일종으로,
부모 노드가 없어서 기존 DOM과는 별도로 존재한다는 특징이 있다. DocumentFragment 노드는 위 예제의 컨테이너 요소와 같이 자식 노드들의 부모 노드로서
별도의 서브 DOM을 구성하여 기존 DOM에 추가하기 위한 용도로 사용한다.  
이 노드는 기존 DOM 과는 별도로 존재하므로 자식 노드를 추가하여도 기존 DOM 에는 어떠한 변경도 발생하지 않는다. 또한 이 노드를 DOM에 추가하면 자신은
제거되고 자식 노드만 DOM에 추가된다.  
Document.prototype.createDocumentFragment 메서드는 비어 있는 DocumentFragment 노드를 생성하여 반환한다.
```html
<body>
<div>
    <ul id="fruits">
        <li class="apple">apple</li>
    </ul>
</div>
<script>
    const $fruits = document.getElementById('fruits');

    // 컨테이너 요소 생성
    const df = document.createDocumentFragment();

    ['apple','banana','mango','orange','pizza'].forEach(fruit => {
        const $li = document.createElement('li');
        const $textNode = document.createTextNode(fruit);
        $li.appendChild($textNode);
        df.appendChild($li);
    })

    $fruits.appendChild(df);
</script>
</body>
```

#### 39.6.5 노드 삽입
##### 마지막 노드로 추가
appendChild 메서드는 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가한다. 추가할 위치를 지정할 수 없다.

##### 지정한 위치에 노드 삽입
Node.prototype.insertBefore(newNode, childNode) 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입한다.
두 번째 인수로 전달받은 노드는 반드시 insertBefore 메서드를 호출한 노드의 자식 노드이어야 한다. 그렇지 않으면 DOMException 에러가 발생한다.
두 번째 인수로 전달받은 노드가 null 이면 첫번째 인수로 전달한 노드를 메서드를 호출한 요소의 마지막 자식 노드로 추가한다.

#### 39.6.6 노드 이동
DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에
노드를 추가한다. 즉, 노드가 이동한다.

#### 39.6.7 노드 복사
Node.prototype.cloneNode([deep:true|false]) 메서드는 노드의 사본을 생성하여 반환한다. 매개변수 deep에 true 인수로 전달하면 노드를 깊은 복사하여
모든 자손 노드가 포함된 사본을 생성하고, false를 인수로 전달하거나 생략하면 얕은 복사하여 노드 자신만의 사본을 생성한다. 얕은 복사로 생성된 요소 노드는
자손 노드를 복사하지 않으므로 텍스트 노드도 없다.
```html
<body>
<div>
    <ul id="fruits">
        <li class="apple">apple</li>
    </ul>
</div>
<script>
    const $fruits = document.getElementById('fruits');
    const $apple = document.querySelector('.apple');

    // 얕은 복사하여 사본을 생성
    const $shallowClone = $apple.cloneNode();

    // 사본 요소에 텍스트 노드 추가
    $shallowClone.appendChild(document.createTextNode('shallowCopyNode'))
    $fruits.appendChild($shallowClone)

    // fruits 요소를 깊은 복사하여 모든 자손 노드가 포함된 사본생성
    const $deepClone = $fruits.cloneNode(true);
    // 생성된 사본을 fruits 요소의 마지막 노드로 추가
    $fruits.appendChild($deepClone);
</script>
</body>
```

#### 39.6.8 노드 교체
Node.prototype.replaceChild(newChild, oldChild) 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다. 즉, replaceChild 메서드는
자신을 호출한 노드의 자식 노드인 oldChild 노드를 newChild 노드로 교체한다. oldChild는 DOM에서 제거된다.

#### 39.6.9 노드 삭제
Node.prototype.removeChild(child) 메서드는 child 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다. 











































