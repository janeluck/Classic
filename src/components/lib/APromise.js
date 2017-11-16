import _ from 'lodash'
// 三种状态
const PENDING = Symbol()
const RESOLVED = Symbol()
const REJECTED = Symbol()

class APromise {
  constructor(func) {
    if (!_.isFunction(func)) {
      throw Error('param must be a function!')
    }
    this.status = PENDING
    this.value = null
    this.handler = {}
    const reject = (result) => {
      this.status = REJECTED
      this.value = result
      this.handler.onReject && this.handler.onReject(result)
    }
    const resolve = (result) => {
      this.status = RESOLVED
      this.value = result
      this.handler.onResolve && this.handler.onResolve(result)
    }
    func(resolve, reject)

  }


  then(onResolve, onReject) {
    switch (this.status) {
      case REJECTED:
        onReject(this.value)
        break
      case RESOLVED:
        onResolve(this.value)
        break
      case PENDING:
        this.handler = {onResolve, onReject}

    }
  }
}

var p = new APromise(function (resolve, reject) {
  console.log('new APromise')
  setTimeout(resolve, 2000)
})

p.then(function (data) {
  console.log('APromise resolved!')
})
