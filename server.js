/* eslint-disable no-param-reassign */
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const FAKE_DELAY = 0
const ITEMS_DATA_FILE = path.join(__dirname, 'items.json')
const CART_DATA_FILE = path.join(__dirname, 'cart.json')

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
    res.send({
      fromPrice: values[0].price,
      toPrice: values[values.length - 1].price
    })
  })
})
app.get('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.json(JSON.parse(data))
  })
})
app.post('/cart/clearAll', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'co-cache')
    fs.writeFile(CART_DATA_FILE, JSON.stringify([], null, 4), () => {
      res.json([])
    })
  })
})
app.post('/cart/removeitem', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'co-cache')
    const cartItems = JSON.parse(data)
    console.log(req.body.quantity)
    cartItems.map((cartProduct) => {
      if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
        cartProduct.quantity--
      } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
        const cartIndexToRemove = cartItems.findIndex(cartProduct => cartProduct.id === req.body.id)
        cartItems.splice(cartIndexToRemove, 1)
      }
    })
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartItems, null, 4), () => {
      res.json(cartItems)
    })
  })
})
app.post('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache')
    const cartItems = JSON.parse(data)
    const newCartItem = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      gender: req.body.gender,
      category: req.body.category,
      color: req.body.color,
      size: req.body.size,
      image_tag: req.body.image_tag,
      quantity: 1
    }
    let cartItemExists = false
    cartItems.map((cartItem) => {
      if (cartItem.id === newCartItem.id) {
        cartItem.quantity++
        cartItemExists = true
      }
    })
    if (!cartItemExists) cartItems.push(newCartItem)
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartItems, null, 4), () => {
      res.json(cartItems)
    })
  })
})
app.get('/items/:name/:fromprice/:toprice/:gender/:category/:color/:size', (req, res) => {
  setTimeout(() => {
    fs.readFile(ITEMS_DATA_FILE, (err, data) => {
      res.setHeader('Cache-Control', 'no-cache')

      for (let key in req.params) {
        req.params[key] = noSpace(req.params[key])
      }
      const value = JSON.parse(data)
      let trueValidation = {}
      for (let key in req.params) {
        if (req.params[key] !== 'null' && req.params[key] !== '' && req.params[key] !== 'undefined') {
          trueValidation[key] = req.params[key].toLowerCase()
        }
      }
      let filteredValues = value.filter(compare)
      function compare (element) {
        return compareKeyValues(element, trueValidation)
      }
      res.send(filteredValues)
    })
  }, FAKE_DELAY)
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
