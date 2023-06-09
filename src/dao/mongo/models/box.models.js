const mongoose = require('mongoose')

const boxColecction = 'box'

const BoxSchema = new mongoose.Schema({
	acc:{
		type: Number,
		default: 0
	},
	daySold: [{
		amount:{
			type: Number,
			default: 0
		},
		date:{
			type: Date,
			default: Date.now
		}
	}],
	dailySolds: [{
		amount:{
			type: Number,
			default: 0
		},
		date:{
			type: Date,
			default: Date.now
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

