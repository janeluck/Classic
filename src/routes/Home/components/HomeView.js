import React, {Component} from 'react'
import {Input} from 'antd'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
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

  }

  render() {
    return <Input type="text" value={this.state.value}
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
