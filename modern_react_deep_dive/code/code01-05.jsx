// 클래스 컴포넌트에서 일반함수와 화살표 함수의 동작 차이(this 바인딩)

import React from "react";
import './ch01/src/App.css';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter:1,
    }
  }

  functionCountUp() {
    console.log(this)  // undefined
    this.setState((prev)=>({counter:prev.counter +1}))
  }

  ArrowFunctionCountUp=()=> {
    console.log(this)  // class Component
    this.setState(prev=>({counter:prev.counter+1}))
  }

  render() {
    return(
      <div>
        <span>{this.state.counter}</span>
        <button onClick={this.ArrowFunctionCountUp}></button>
        <button onClick={this.functionCountUp}></button>
      </div>
    )
  }
}
