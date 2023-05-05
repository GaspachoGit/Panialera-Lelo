const mongoose = require('mongoose')

const ticketModel = 'ticket'

const ticketSchema = mongoose.Schema({
	code: Number,
	purchaseDatetime: String,
	amount: Number,
	purchaser: String
})

const Ticket = mongoose.model(ticketModel, ticketSchema)

module.exports = Ticket