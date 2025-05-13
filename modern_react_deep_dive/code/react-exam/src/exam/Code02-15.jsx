// 리액트 컴포넌트 트리의 렌더링 과정을 살펴보기 위한 예제
import {memo, useState} from "react";

export default function A() {
  return (
    <div>
    <h1>Hello React!</h1>
    <B/>
    </div>
  )
}

function B() {
  const [counter, setCounter] = useState(0);

  function handleButtonClick() {
    setCounter(cnt => cnt + 1);
  }

  return (
    <>
      <label>
        <C number = {counter}/>
      </label>
      <button onClick={handleButtonClick}>+</button>
    </>
  )
}

function C({number}) {
  return (
    <div>
      {number} <D />
    </div>
  )
}

// memo를 추가하면 변화가 없으므로 렌더링 되지 않음
// memo가 없으면 C가 렌더링 되므로 자식 요소인 D는 무조건 렌더링이 된다.
const D=memo(()=> {
  return <>리액트 리액트!</>
})