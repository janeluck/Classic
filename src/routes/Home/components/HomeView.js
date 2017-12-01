import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
//console.log(window.Immutable = Immutable)
const a = Immutable.fromJS({spring: 0})
console.log(a)
console.log(a.set('summer', 1))
const C = function(...args){

  _.forEach(args, param => {

    console.log(Immutable.fromJS(param))

  })
}

C({name: 'a'}, {name: 'a', age: 18}, {name: {firstName: 'a'}})
debugger
const b = a.set('summer', 1)


export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>

  </div>
)

export default HomeView
