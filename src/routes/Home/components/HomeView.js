import React, {Component} from 'react'
import {Input} from 'antd'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import {preventDefault, stopPropagation, getEventModifiers} from 'src/components/common/util'
import getEventKey from 'src/components/common/getEventKey'
//console.log(window.Immutable = Immutable)
const a = Immutable.fromJS({spring: 0})
console.log(a)
console.log(a.set('summer', 1))



const C = function (...args) {

  _.forEach(args, param => {

    console.log(Immutable.fromJS(param))

  })
}

C({name: 'a'}, {name: 'a', age: 18}, {name: {firstName: 'a'}})
const b = a.set('summer', 1)

class A extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

  }

  onChange = (e) => {

  }
  onKeyDown = (e) => {
    e.persist()
    console.log(e.nativeEvent)
    console.log(e.getModifierState('Ctrl'))
    console.log(e.getModifierState('Control'))
    e.getModifierState('Shift')
    const nativeEvent = e.nativeEvent

    const activeKeys = getEventModifiers(nativeEvent)
    const currentKey = getEventKey(nativeEvent)
    if (currentKey !== '' && _.indexOf(activeKeys, currentKey) < 0) {
      activeKeys.push(currentKey)
    }

    preventDefault(nativeEvent)
    stopPropagation(nativeEvent)
    this.setState({
      value: activeKeys.join('+')
    })
  }

  render() {
    return <input type="text" value={this.state.value}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
    />

  }
}

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <A/>
  </div>
)

export default HomeView
