import _ from 'lodash'
// 三种状态
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class APromise {

  constructor(func) {
    if (!_.isFunction(func)) {
      throw Error('APromise resolver undefined is not a function')
    }
    this.APromiseStatus = PENDING
    this.value = null
    this.handler = {}
    const reject = (result) => {
      this.APromiseStatus = REJECTED
      this.value = result
      this.next(this.handler)
    }
    const resolve = (result) => {
      this.APromiseStatus = RESOLVED
      this.value = result
      this.next(this.handler)
    }
    func(resolve, reject)

  }

  next({onReject, onResolve}) {
    switch (this.APromiseStatus) {
      case REJECTED:
        onReject && onReject(this.value)
        break
      case RESOLVED:
        onResolve && onResolve(this.value)
        break
      case PENDING:
        this.handler = {onResolve, onReject}

    }
  }


  then(onResolve, onReject) {
   // this.next({onResolve, onReject})
    return new APromise((resolve, reject) => {
      this.next({
        onResolve: (result) => {
          resolve(onResolve(result))
        },
        onReject: (result) => {
          reject(onReject(result))
        }
      })
    })

  }
}

var p = new APromise(function (resolve, reject) {
  console.log('new APromise')
  resolve()
})

p.then(function (data) {
  console.log('APromise resolved!')
  return 'then0 exec'
}).then(function (data) {
  console.log(data)
  console.log('22222')
})

