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
import _ from 'lodash'

const {Map} = Immutable
const originalMap = Map({a: 1, b: 2, c: 3})
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
    }, () => {
      setTimeout(() => {
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


var str0 = 'abcdef', str1 = 'acdebwr'


// 生成子集集合, 数量为2的N次方, 包括空字符串和字符串本身
function generateChildren(str) {
  var children = []
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      children.push(str.substr(i, j))
    }
  }
  return children
}

// 穷举搜索法
function getCommonLongStr(str0, str1) {
  var commonCollect = []
  // 拿到所有的公共子序列
  for (let i = 0; i < str0.length; i++) {
    for (let j = i; j < str0.length; j++) {
      const child = str0.substr(i, j)
      if (str1.indexOf(child) > -1) {
        commonCollect.push(child)
      }
    }
  }
  //

  const result = _.sortBy(commonCollect, item => {
    return item.length
  })
  return result.length > 0 ? result[result.length - 1] : ''

}

console.log(getCommonLongStr(str0, str1))


// by jane
function KnapsackProblem(weights, values, W) {
  const n = weights.length, f = [[]]
  for (let j = 0; j <= W; j++) {
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        if (j < weights[0]) {
          f[0][j] = 0
        } else {
          f[0][j] = values[0]
        }
      } else {
        if (typeof  f[i] === 'undefined') {
          f[i] = []
        }
        if (j < weights[i]) {
          f[i][j] = f[i - 1][j]
        } else {
          f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])
        }
      }

    }
  }

  return f[n - 1][W]
}

console.log('KnapsackAnswer:')
console.log(KnapsackProblem([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10))


// 优化版


function KnapsackProblem01(weights, values, W) {
  const n = weights.length
  let f = new Array(n)
  f[-1] = new Array(W + 1).fill(0)

  for (let j = 0; j <= W; j++) {
    for (let i = 0; i < n; i++) {
      if (typeof  f[i] === 'undefined') {
        f[i] = []
      }
      if (j < weights[i]) {
        f[i][j] = f[i - 1][j]
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])
      }
    }
  }

  return f[n-1][W]
}

console.log('KnapsackAnswer01:')
console.log(KnapsackProblem01([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10))
