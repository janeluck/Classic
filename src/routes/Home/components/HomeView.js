import React, {Component} from 'react'
import {Input, InputNumber, Icon, Button} from 'antd'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import {preventDefault, stopPropagation, getEventModifiers} from 'src/components/common/util'
import getEventKey from 'src/components/common/getEventKey'
import math from 'mathjs'
//console.log(window.Immutable = Immutable)
const a = Immutable.fromJS({spring: 0})
import addEventListener from 'add-dom-event-listener'
import 'src/components/lib/APromise.js'

const { Map } = Immutable
const originalMap = Map({ a: 1, b: 2, c: 3 })
const updatedMap = originalMap.set('b', 2)
console.log(updatedMap === originalMap) // No-op .set() returned the original reference.
const c = Immutable.Map({
  a: 'jane'
})

window.Immutable = Immutable
const d = c.set('b', 'lucy')
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

  clear = (e) => {

    e.preventDefault()
    this.setState({
      value: ''
    })
  }
  onBlur = () => {

  }

  iconClick = (e) => {

  }

  render() {

    return <span onBlur={this.onBlur}><Input type="text" value={this.state.value}
                                             onChange={this.onChange}
                                             onKeyDown={this.onKeyDown}
                                             suffix={<Icon type="cross-circle-o"
                                                           onClick={this.clear}/>}

    />

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
    </span>
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


class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {

  }

  onChange = (e) => {

  }

  handleClick = () => {
    console.log('clicked')
    this.setState({
      loading: true
    }, ()=>{
      setTimeout(()=>{
        this.setState({
          loading: false
        })
      }, 2000)
    })
  }

  ondivBlur = (e) => {

  }
  oninputBlur = (e) => {

  }
  ondivFocus = (e) => {

  }
  oninputFocus = (e) => {

  }
  ondivClick = (e) => {

  }
  oninputClick = (e) => {

  }

  render() {
    return <div onBlur={this.ondivBlur} onFocus={this.ondivFocus} onClick={this.ondivClick}>
      <input type="text" onBlur={this.oninputBlur} onFocus={this.oninputFocus} onClick={this.oninputClick}/>
      <div>
        <Button disabled={this.state.loading} onClick={this.handleClick}>

        </Button>
      </div>
    </div>
  }
}


export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <A/>
    <B/>
  </div>
)

export default HomeView
