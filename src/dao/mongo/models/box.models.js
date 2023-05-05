const mongoose = require('mongoose')

const boxColecction = 'box'

const BoxSchema = new mongoose.Schema({
	acc:{
		type: Number,
		default: 0
	},
	dailySolds: [{
		date:{
			type: Date,
			default: Date.now
		},
		sold:{
			type: Number,
			default: 0
		}
	}],
	monthlySold: {
		type: Number,
		default: 0
	}

})

const Box = mongoose.model(boxColecction, BoxSchema)

module.exports = Box

