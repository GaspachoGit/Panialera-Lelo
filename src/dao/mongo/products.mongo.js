const Product = require("./models/products.models");

class ProductsMongoDao {
  constructor() {}

  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      return error;
    }
  }

	async paginate(query, options) {
		try {
			const products = await Product.paginate(query, options)
			return products
		} catch (error) {
			return error
		}
	}

	async create(product) {
		try {
			return await Product.create(product)
		} catch (error) {
			return error
		}
	}

	async updateProduct(filter, updatedProductData) {
		try {
			const result = await Product.updateOne(filter, updatedProductData);
			if (result.modifiedCount === 1) {
				return { success: true, message: 'Producto actualizado exitosamente.' };
			} else {
				return { success: false, message: 'Producto no encontrado o no se pudo actualizar.' };
			}
		} catch (error) {
			return { success: false, message: 'Error al actualizar el producto.', error: error };
		}
	}

	async deleteMany(){
		try {
			return await Product.deleteMany()
		} catch (error) {
			return error
		}
	}
	async findOne(id){
		try {
			const product =  await Product.findOne({_id: id})
			return product
		} catch (error) {
			return error
		}
	}
	async deleteProductById(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      throw new Error(`Could not delete product: ${error.message}`);
    }
  }

}

module.exports = ProductsMongoDao;
