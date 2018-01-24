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


  return b
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

//console.log(printLCS(lcs('ABCDAB', 'BADABA'), 'ABCDAB', 'BADABA', 5, 5))


// @param  X {String}
// @param  Y {String}
// return diffText {String}
// 1. 计算最长公共子序列
// 2. 比较输出


export default function Diff(X, Y) {
  const LCS = printLCS(lcs(X, Y), X, Y, X.length - 1, X.length - 1)
  let mStart = 0, nStart = 0, result = []
  for (let i = 0; i < LCS.length; i++) {
    for (let m = mStart; m < X.length; m++) {
      if (X[m] === LCS[i]) {
        X.slice(mStart, m) !== '' && result.push({
          'signal': '-',
          'str': X.slice(mStart, m)
        })
        mStart = m + 1
        break
      }
    }

    for (let n = nStart; n < Y.length; n++) {
      if (Y[n] === LCS[i]) {
        Y.slice(nStart, n) !== '' && result.push({
          'signal': '+',
          'str': Y.slice(nStart, n)
        })
        nStart = n + 1
        break
      }
    }
    result.push({
      'signal': '',
      'str': LCS[i]
    })

  }
  if (mStart !== X.length) {
    result.push({
      'signal': '-',
      'str': X.slice(mStart)
    })
  }
  if (nStart !== Y.length) {
    result.push({
      'signal': '+',
      'str': Y.slice(nStart)
    })
  }
  return result.map(function (line) {
    console.log(line.signal + line.str)
  })

}
