const express = require("express");
const { order } = require("../controllers");
const router = express.Router()
const controllers = require('../controllers');

router.get('/', async (req, res, next) => {
	const data = req.context

	const itemConroller = controllers.item.instance()
	data.coffee = await itemConroller.get({ category: 'coffee' })
	data.tea = await itemConroller.get({ category: 'tea' })
	data.pastries = await itemConroller.get({ category: 'pastries' })

	res.render('home', data)
})
router.get('/blog', (req, res, next) => {

	res.render('blog', req.context)
})
router.get('/items', async (req, res, next) => {
	const filters = req.query
	const itemConroller = controllers.item.instance()
	const items = await itemConroller.get(filters)

	res.json({
		items
	})
})
router.post('/order', async (req, res, next) => {
	const orderData = req.body

	const orderController = controllers.order.instance()
	const order = await orderController.post(orderData)

	res.json(order)
})

module.exports = router