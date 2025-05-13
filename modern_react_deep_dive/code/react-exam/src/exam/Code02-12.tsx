// class component
// React.Component, React.PureComponent 로 컴포넌트를 만드는 예제

import React from 'react'

interface State {
  count:number
}

// 키가 문자열(string), 값이 never인 객체 : never 는 TypeScript 에서 '아무 값도 가질 수 없는' 타입이다. 즉 빈 객체를 나타낸다.
// Props는 빈 객체를 의미하며, 이 컴포넌트는 어떤 props도 받지 않는다.
type Props = Record<string, never>

// Component 는 버튼을 누르는 데로, 즉 state 가 업데이트되는 대로 렌더링이 일어난다.
export class ReactComponent extends React.Component<Props, State> {
  private renderCounter = 0

  private constructor(props: Props) {
    super(props);
    this.state = {
      count:1,
    }
  }

  private handleClick = () => {
    this.setState({count:1})
  }

  public render() {
    console.log('ReactComponent',++this.renderCounter)
    return (
      <h1>
        ReactComponent: {this.state.count}{' '}
        <button onClick={this.handleClick}>+</button>
      </h1>
    )
  }

}

//PureComponent는 state 값이 업데이트되지 않아서 렌더링이 일어나지 않는다.
//state 값에 대해 얕은 비교를 수행해 결과가 다를 때만 렌더링을 수행한다.
export class ReactPureComponent extends React.PureComponent<Props, State> {
  private renderCounter = 0

  private constructor(props: Props) {
    super(props);
    this.state = {
      count:1,
    }
  }

  private handleClick = () => {
    this.setState({count:1})
  }

  public render() {
    console.log('ReactPureComponent',++this.renderCounter)
    return (
      <h1>
        ReactPureComponent: {this.state.count}{' '}
        <button onClick={this.handleClick}>+</button>
      </h1>
    )
  }
}