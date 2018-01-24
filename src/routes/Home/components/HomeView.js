import React, {Component} from 'react'
import {Input, InputNumber, Icon, Button} from 'antd'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import {preventDefault, stopPropagation, getEventModifiers} from 'src/components/common/util'
import getEventKey from 'src/components/common/getEventKey'
import math from 'mathjs'
////console.log(window.Immutable = Immutable)
const a = Immutable.fromJS({spring: 0})
import addEventListener from 'add-dom-event-listener'
import 'src/components/lib/APromise.js'
import _ from 'lodash'
import Diff from 'src/components/Diff'
const {Map} = Immutable
const originalMap = Map({a: 1, b: 2, c: 3})
const updatedMap = originalMap.set('b', 2)
//console.log(updatedMap === originalMap) // No-op .set() returned the original reference.
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
    //console.log(22)
    //console.log(this.state.value)
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
      //console.log(e)
    })
  }

  onChange = (e) => {
    const v = e.target.value
    //console.log(v)
    this.setState({
      value: v
    })
  }

  handleClick = () => {
    //console.log(11111)
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
    //console.log('clicked')
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


class C extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <h1 onTouchEnd={
        () => {
          //console.log('C: onTouchEnd')
        }
      }>C</h1>
      <h2>C</h2>
    </div>
  }

}

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <A/>
    <B/>
    <C/>
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

//console.log(getCommonLongStr(str0, str1))


// by jane
// 01背包问题
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

//console.log('KnapsackAnswer:')
//console.log(KnapsackProblem([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10))


// 优化版


function KnapsackProblem01(weights, values, W) {

  const n = weights.length, selected = []
  let finalV, f = new Array(n)
  f[-1] = new Array(W + 1).fill(0)

  // 计算最大价值
  for (let i = 0; i < n; i++) {
    f[i] = []
    for (let j = 0; j <= W; j++) {
      if (j < weights[i]) {
        f[i][j] = f[i - 1][j]
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])
      }
    }
  }


  finalV = f[n - 1][W]
  // 逆向找到所放物品
  for (let i = n - 1; i >= 0; i--) {
    if (finalV > f[i - 1][W]) {
      finalV = f[i - 1][W - weights[i]]
      selected.push(i)
      //console.log(`背包里有第${i}件物品, 价值为${values[i]}, 重量为${weights[i]}`)
    }

  }
  return [f[n - 1][W], selected.reverse()]
}

//console.log('KnapsackAnswer01:')
//console.log(KnapsackProblem01([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10))


// 完全背包问题
function completeKnapsack(weights, values, W) {
  let finalV
  const n = weights.length, f = [], selected = []
  f[-1] = new Array(W + 1).fill(0)

  for (let i = 0; i < n; i++) {
    f[i] = []
    for (let j = 0; j <= W; j++) {
      for (let k = 0; k <= j / weights[i]; k++) {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - k * weights[i]] + k * values[i])
      }
    }
  }


  // 逆向找到所放物品
  finalV = f[n - 1][W]
  for (let i = n - 1; i >= 0; i--) {
    for (let k = 0; k <= W / weights[i]; k++) {
      if (finalV > f[i - 1][W - weights[i] * k]) {
        finalV = f[i - 1][W - weights[i] * k]
        selected.push(i)
        //console.log(`背包里有第${i}件物品, 价值为${values[i]}, 重量为${weights[i]}`)
      }
    }
  }

  return [f[n - 1][W], selected.reverse()]
}

//console.log('completeKnapsack:')
//console.log(completeKnapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 30))
//console.log('completeKnapsack:')
//console.log(completeKnapsack([3, 2, 2], [5, 10, 20], 85))

// 多重背包问题
function multipleKnapsack(weights, values, numbers, W) {
  let finalV
  const n = weights.length, f = [], selected = []
  f[-1] = new Array(W + 1).fill(0)

  for (let i = 0; i < n; i++) {
    f[i] = []
    for (let j = 0; j <= W; j++) {
      for (let k = 0; k <= j / weights[i] && k <= numbers[i]; k++) {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - k * weights[i]] + k * values[i])
      }
    }
  }


  // 逆向找到所放物品
  finalV = f[n - 1][W]
  for (let i = n - 1; i >= 0; i--) {
    for (let k = 0; k <= Math.min(W / weights[i], numbers[i]); k++) {
      if (finalV > f[i - 1][W - weights[i] * k]) {
        finalV = f[i - 1][W - weights[i] * k]
        selected.push(i)
        //console.log(`背包里有第${i}件物品, 价值为${values[i]}, 重量为${weights[i]}`)
      }
    }
  }

  return [f[n - 1][W], selected.reverse()]


}

//console.log('multipleKnapsack:')
//console.log(multipleKnapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], [2, 3, 5, 1, 6], 10))
//console.log('multipleKnapsack:')
//console.log(multipleKnapsack([2, 3, 1], [2, 3, 4], [1, 4, 1], 6))
// c数组记录最长公共子序列的长度
function lcs(X, Y) {
  const xLength = X.length, yLength = Y.length, c = [], b = []
  c[-1] = new Array(yLength).fill(0)
  for (let i = 0; i < xLength; i++) {
    b[i] = []
    c[i] = []
    c[i][-1] = 0
    for (let j = 0; j < yLength; j++) {
      if (X[i] === Y[j]) {
        c[i][j] = c[i][j - 1] + 1
        b[i][j] = 0
      } else {
        //c[i][j] = Math.max(c[i - 1][j], c[i][j - 1])

        if (c[i - 1][j] > c[i][j - 1]) {
          c[i][j] = c[i - 1][j]
          b[i][j] = 1
        } else {
          c[i][j] = c[i][j - 1]
          b[i][j] = 2

        }

      }
    }
  }


  return [c, b]
}


console.log(lcs('ABCDAB', 'BADABA'))

// C数组记录最长公共子序列矩阵
function LCS(X, Y) {
  const xLength = X.length, yLength = Y.length, C = []
  C[-1] = new Array(yLength).fill(0)
  for (let i = 0; i < xLength; i++) {
    C[i] = []
    C[i][-1] = 0
    for (let j = 0; j < yLength; j++) {
      if (X[i] === Y[j]) {
        C[i][j] = 0
      } else {
        if (C[i - 1][j] > C[i][j - 1]) {
          C[i][j] = 1
        } else {
          C[i][j] = 2
        }
      }
    }
  }
  return C

}


// 打印最长公共子序列矩阵
function printLCS(lcsArr, X, Y, i, j) {
  if (i === -1 || j === -1) {
    return ''
  }
  if (lcsArr[i][j] === 0) {
    return printLCS(lcsArr, X, Y, i - 1, j - 1) + X[i]
  } else if (lcsArr[i][j] === 1) {
    return printLCS(lcsArr, X, Y, i - 1, j)
  } else {
    return printLCS(lcsArr, X, Y, i, j - 1)
  }
}


//console.log(LCS('ABCDAB', 'BADABA'))
//console.log(printLCS(lcs('ABCDAB', 'BADABA')[1], 'ABCDAB', 'BADABA', 5, 5))

Diff('ABCDAB', 'BADABA')
