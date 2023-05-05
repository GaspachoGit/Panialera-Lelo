const Ticket = require("./models/ticket.models");

class TiketsMongoDao {
  constructor() {}

  async getAll() {
    try {
      const tikets = await Ticket.find();
      return tikets;
    } catch (error) {
      return error;
    }
  }

	async create(ticket) {
		try {
			return await Ticket.create(ticket)
		} catch (error) {
			return error
		}
	}

	async updateTicket(filter, updatedTicketData) {
		try {
			const result = await Ticket.updateOne(filter, updatedTicketData);
			if (result.modifiedCount === 1) {
				return { success: true, message: 'tiket actualizado exitosamente.' };
			} else {
				return { success: false, message: 'tiket no encontrado o no se pudo actualizar.' };
			}
		} catch (error) {
			return { success: false, message: 'Error al actualizar el tiket.', error: error };
		}
	}

	async deleteMany(){
		try {
			return await Ticket.deleteMany()
		} catch (error) {
			return error
		}
	}
	async findOne(id){
		try {
			const ticket =  await Ticket.findOne({_id: id})
			return ticket
		} catch (error) {
			return error
		}
	}


}

module.exports = TiketsMongoDao;
