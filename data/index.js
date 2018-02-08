const fs = require('fs')
const path = require('path')
const data = fs.readFileSync(path.resolve(__dirname, 'state.name.japan.txt'), {
  encoding: 'utf8'
}).replace(/\s{2,}|"/g, '').replace(/(,name_ja)|(name:)/g, '').split(',').slice(0, -1)
const result = data.map(function(item){
  const state = item.split(':')
  return {
    name: state[0].trim(),
    name_ja: state[1].trim(),
    value: Math.floor(Math.random() * 200)
  }
})
fs.writeFile(path.resolve(__dirname, 'japan.state.result.json'), JSON.stringify(result, null, '\t'))




