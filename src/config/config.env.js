require('dotenv').config();

const config = {
  development: {
    port: process.env.PORT || 3000,
    database: {
			password: process.env.MONGOPASS,
			username: process.env.MONGOUSER
    }
	}
}
module.exports = config
