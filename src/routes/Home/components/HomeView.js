import React from 'react'
import Immutable from 'immutable'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

console.log(window.Immutable = Immutable)
const a = Immutable.fromJS({name: 'jane'})
console.log(a)

class A {
  constructor() {
  }
}

console.log((new A()))
export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>

  </div>
)

export default HomeView
