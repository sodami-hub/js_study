import {memo,useEffect, useState} from 'react'

type Props = {
  counter:number
}

const Component = memo((props:Props)=>{
  useEffect(() => {
    console.log('Component has been rendered!')
  });

  return <h1>{props.counter}</h1>
})

type DeeperProps = {
  counter : {
    counter : number
  }
}

// button을 클릭해서 콤포넌트를 강제로 렌더링을 일으키는 경우 얕은 복사로 객체를 비교하는 리액트 에서 Component 함수는 memo를 사용하여 렌더링 방지가 동작하지만
// DeeperComponent 에서는 변화가 없음에도 렌더링이 발생하는 것을 확인할 수 있다.
const DepperComponent = (props:DeeperProps) => {
  useEffect(()=>{
    console.log('DeeperComponent has been rendered!')
  })

  return <h1>{props.counter.counter}</h1>
}

export default function App() {
  const [cnt,setCnt] = useState(0);

  function handleClick() {
    setCnt(cnt => cnt+1);
  }

  return (
    <div>
      <span>{cnt}</span>
      <Component counter={100}/>
      <DepperComponent counter={{counter:100}}/>
      <button onClick={handleClick}>+</button>
    </div>
  )
}