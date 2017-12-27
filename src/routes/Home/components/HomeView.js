import React, {Component} from 'react'
import {Input, InputNumber, Icon} from 'antd'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import {preventDefault, stopPropagation, getEventModifiers} from 'src/components/common/util'
import getEventKey from 'src/components/common/getEventKey'
import math from 'mathjs'
//console.log(window.Immutable = Immutable)
const a = Immutable.fromJS({spring: 0})
import addEventListener from 'add-dom-event-listener'
import 'src/components/lib/APromise.js'

window.math = math


class A extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

  }

  onChange = (e) => {
    console.log(22)
    console.log(this.state.value)
  }
  onKeyDown = (e) => {
    //  e.persist()
    const nativeEvent = e.nativeEvent
    const activeKeys = getEventModifiers(nativeEvent)
    const currentKey = getEventKey(nativeEvent)
    if (currentKey !== '' && _.indexOf(activeKeys, currentKey) < 0) {
      activeKeys.push(currentKey)
    }
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      value: activeKeys.join('+')
    }, this.onChange)
  }

  clear = () => {
    this.setState({
      value: ''
    })
  }

  render() {

    return <div><Input type="text" value={this.state.value}
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
    />
      <span onClick={this.clear}>x</span>
{/*      <InputNumber
        upHandler={<span
          unselectable="unselectable"
          className={`ant-input-number-handler ant-input-number-handler-up-inner `}
          onClick={function () {
            alert(333)
            preventDefault()
          }}
        />}
      />*/}
    </div>
  }
}

class MyInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    addEventListener(document, 'selectionchange', (e) => {
      console.log(e)
    })
  }

  onChange = (e) => {
    const v = e.target.value
    console.log(v)
    this.setState({
      value: v
    })
  }

  handleClick = () => {
    console.log(11111)
  }

  render() {
    return <div>
      <button onClick={_.throttle(this.handleClick, 3000)}>click</button>
    </div>
  }
}


export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>

    <A/>
  </div>
)

export default HomeView
