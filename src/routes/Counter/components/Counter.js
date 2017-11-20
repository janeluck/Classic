import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InputButtonPanelExample} from './InputButtonPanel/index.js'
import InputButtonPanel from './InputButtonPanel/index.js'
import 'components/lib/APromise'

class Counter extends Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
    window.onkeydown =  e => {
      if(e.keyCode === 13){
        this.btn.focus()
      }
    }
  }
  render(){
    const { counter, increment, doubleAsync } = this.props
    return ( <div style={{ margin: '0 auto' }} >
    <h2>Counter: {counter}</h2>
    <button className='btn btn-primary' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={doubleAsync}>
      Double (Async)
    </button>

    <button ref= {(btn)=>{this.btn = btn}}  onClick={(e)=>{
      debugger
      console.log('button1')
      console.log(e.target)
      console.log('button2')
    }}>click</button>

    <InputButtonPanelExample />
  </div>)
  }
}


Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Counter
