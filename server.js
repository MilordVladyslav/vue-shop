/* eslint-disable no-param-reassign */
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()

const ITEMS_DATA_FILE = path.join(__dirname, 'items.json')

app.set('port', (process.env.PORT || 3000))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})
app.get('/items/pricevalues', (req, res) => {
  fs.readFile(ITEMS_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache')
    const values = JSON.parse(data).sort(compareNumeric)
    function compareNumeric (a, b) {
      return a.price - b.price
    }
    // console.log(values[0])
    //      fromPrice: values[0].price,
    //       toPrice: values[values[values.length - 1].price]
    res.send({
      fromPrice: values[0].price,
      toPrice: values[values.length - 1].price
    })
  })
})
app.get('/items/:name/:fromprice/:toprice/:gender/:category/:color/:size', (req, res) => {

  fs.readFile(ITEMS_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache')
    // console.log(req.params.fromprice)
    // console.log(req.params.toprice)
    for (let key in req.params) {
      req.params[key] = noSpace(req.params[key])
    }
    const value = JSON.parse(data)
    let trueValidation = {}
    for (let key in req.params) {
      if (req.params[key] !== 'null' && req.params[key] !== '') {
        trueValidation[key] = req.params[key].toLowerCase()
      }
    }
    let filteredValues = value.filter(compare)
    function compare (element) {
      return compareKeyValues(element, trueValidation)
    }
    res.send(filteredValues)
  })
})
function compareKeyValues (element, trueValidation) {
  let unsame = []
  for (let key in trueValidation) {
    if (key === 'name') {
      if (!element[key].toLowerCase().includes(trueValidation[key].toLowerCase())) {
        unsame.push(1)
      }
      continue
    }
    if (key === 'fromprice') {
      if (element.price < trueValidation[key]) {
        unsame.push(1)
      }
      continue
    }
    if (key === 'toprice') {
      if (element.price > trueValidation[key]) {
        unsame.push(1)
      }
      continue
    }
    if (element[key].toLowerCase() !== trueValidation[key].toLowerCase()) {
      unsame.push(1)
    }
  }
  if (unsame.length === 0) {
    unsame = []
    return true
  }
}
function noSpace (str) {
  var VRegExp = new RegExp(/[\s{2,}]+/g, '')
  var VResult = str.replace(VRegExp, '')
  return VResult
}
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
