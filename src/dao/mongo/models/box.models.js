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
		amount:{
			type: Number,
			default: 0
		}
	}],
	monthlySold: [{
		amount:{
		type: Number,
		default: 0
		},
		date:{
			type: Date,
			default:0
		}
		}]

})

const Box = mongoose.model(boxColecction, BoxSchema)

module.exports = Box

