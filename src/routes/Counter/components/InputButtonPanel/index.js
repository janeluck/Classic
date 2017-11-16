/**
 * Created by janeluck on 17/9/14.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
//import addEventListener from 'add-dom-event-listener'
import _ from 'lodash'
import {Icon as SvgIcon} from 'antd'
import {preventDefault, stopPropagation} from 'components/common/util'

function noop() {
}

function isEmpty(v) {
  return v === '0' || !v
}

// 内部input组件用于外部渲染占位
export class InnerInput extends React.Component {
  static isInputButtonPanelInput = true
}

class InnerButton extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onMouseDown: PropTypes.func,
    className: PropTypes.string
  }
  static defaultProps = {
    onMouseDown: noop,
  }

  onMouseDown = (event) => {
    const type = this.props.type
    // 阻止虚拟键盘获得焦点, 保留原输入框的focus状态
    preventDefault(event)
    this.props.onMouseDown(type)
  }

  render() {
    return (<button {...(_.omit(this.props, ['children', 'onMouseDown', 'type']))} onMouseDown={this.onMouseDown}
                    tabIndex="-1">{this.props.children}</button>)
  }
}

// todo: 1.  点击按钮的交互样式
export default class InputButtonPanel extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    // 是否展示确定按钮
    showOk: PropTypes.bool,
    // 点击确定的交互事件
    onOk: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }
  static defaultProps = {
    onChange: noop,
    showOk: false,
    onOk: noop
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if('value' in nextProps){
      return nextProps.value !== nextState.value
    }

    return true
  }


  getResultString = (originStr = '', start = 0, end = 0, str = '') => {

    // 回退键特殊处理
    if (str === 'back') {
      str = ''
      if (start === end) start -= 1
    }
    //return originStr.slice(0, start) + (str === 'back' ? '' : str) + originStr.slice(end)
    //return originStr.replace(new RegExp('(^[\\d\\.]{' + start + '})[\\d\\.]{' + (end - start) + '}'), '$1' + str)
    // 根据光标的位置, 处理输入结果
    return originStr.replace(new RegExp('(.{' + start + '}).{' + (end - start) + '}'), '$1' + str)
  }


  handleMouseDown = (type) => {
    // 获取当前焦点的input或者textarea
    let activeEl = document.activeElement
    if (['INPUT', 'TEXTAREA'].indexOf(activeEl.tagName) < 0) return

    const value = activeEl.value || ''
    const {selectionStart, selectionEnd} = activeEl

    const result = this.getResultString(value, selectionStart, selectionEnd, type)
    // 计算光标所在的位置
    const caretPosition = result.length - (value.length - selectionEnd)
    const {onChange, onOk} = this.props
    switch (type) {
      case 'clear':
        onChange('')
        break
      case 'back':
        onChange(result)
        break
      case '.':
        if (value.indexOf('.') < 0) onChange(result)
        break
      case '00':
        onChange(isEmpty(value) ? 0 : result)
        break
      case 'sure':
        onOk(value)
        break
      default:
        onChange(isEmpty(value) ? type : result)
        break
    }

    // 设置元素的光标位置
    setTimeout(() => {
      activeEl.setSelectionRange(caretPosition, caretPosition)
    }, 0)

  }


  onInputChange = (event) => {
    const val = event.target.value
    const {props} = this
    this.setState({
      value: val
    }, ()=>{

    })

  }


  getInputElement = (element) => {
    const {value} = this.state
    return <input {...element.props} onChange={this.onInputChange} value={value}/>
  }

  renderChildren = (children) => {

    const getNewChildren = children => {
      return React.Children.map(children, child => {
        if (!child.type) return child
        if (child.type.isInputButtonPanelInput) {
          return this.getInputElement(child)
        }
        return React.cloneElement(
          child,
          {},
          getNewChildren(child.props.children)
        )

      })
    }


    return getNewChildren(children)


  }

  render() {

    const {showOk} = this.props
    return (<div>
      {this.renderChildren(this.props.children)}
      <div ref={wrap => this.wrap = wrap} className="InputButtonPanelWrap clearfix" onMouseDown={function (event) {
        event.preventDefault()
      }}>


        <div className="num">
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="1">1</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="2">2</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="3">3</InnerButton>
            </div>

          </div>
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="4">4</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="5">5</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="6">6</InnerButton>

            </div>

          </div>
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="7">7</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="8">8</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="9">9</InnerButton>

            </div>

          </div>
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="0">0</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="00">00</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type=".">.</InnerButton>
            </div>
          </div>
        </div>

        <div className={classnames('del', {'InputButtonPanel-hasSure': showOk})}>
          <div>
            <InnerButton className='InputButtonPanel-button-back' onMouseDown={this.handleMouseDown}
                         type="back"><SvgIcon type="shanchu1"/></InnerButton>
          </div>
          <div>

            <InnerButton className='InputButtonPanel-button-clear' onMouseDown={this.handleMouseDown}
                         type="clear"><SvgIcon type="quanbushanchu"/></InnerButton>


          </div>
          {showOk && ( <div className='InputButtonPanel-button-sure'>

            <InnerButton onMouseDown={this.handleMouseDown} type="sure">确定</InnerButton>


          </div>)}

        </div>

      </div>
    </div>)
  }
}
InputButtonPanel.InnerInput = InnerInput


// 使用实例
export class InputButtonPanelExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

  }

  onChange = (v) => {
    this.setState({value: v})
  }
  handleChange = (e) => {
    const value = e.target.value
    this.setState({
      value
    })
  }
  onOk = (v) => {
    console.log(v)
  }


  render() {

    const value = this.state.value
    return (<div>

      {/* <input type="text" value={value} onChange={this.handleChange}/>*/}
      <InputButtonPanel onChange={this.onChange} showOk onOk={this.onOk}>

        <div><span>使用</span> <InnerInput /><span>积分</span> <span>抵扣</span><span>{value * 10}</span></div>
        <div><span>当前积分：</span><span>{value}</span></div>

      </InputButtonPanel>

    </div>)
  }
}

