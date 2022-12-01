const produtos = require('../resources/products.json')
const express = require('express')
const router = express.Router()

router.get('/produtos', async(request, response) => {
    try {
        return response.status(200).send({produtos})
    } catch (error) {
        return response.status(404).send({ error: 'Unexpected error when loading store products'})
    }
})

module.exports = app => app.use('/store', router);