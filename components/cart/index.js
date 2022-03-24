const CartDatabase = require('./services/cart')

const Cart = new CartDatabase()

module.exports = Cart

//Cart.createCart('juancho', {name: 'producto 2', price: 200, qty: 1})
//Cart.checkCart('juancho')
//Cart.addToCart('pepe', {name: 'producto 4', price: 400, qty: 1})