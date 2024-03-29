const { Router } = require("express");
const router = Router();
const ProductsMongoDao = require("../dao/mongo/products.mongo");
const privateAccess = require("../utils/middlewares/privateAcces");

const Product = new ProductsMongoDao()

router.get("/", privateAccess, async (req, res) => {
  const { orderBy, type, brand, size, page, perPage,  } = req.query;
  const {user} = req.session
  const query={}//Solamente deseo filtrar por esos campos
  if(type) query.type = type
  if(brand) query.brand = brand
  if(size) query.size = size

  const order = orderBy || 'name'

  const limit = perPage || 150
  
  const options = {
    page: page||1,
    sort: {[orderBy]: 1},
    limit
  }

  try {
    const products = await Product.paginate(query, options); //proximamente: aquí hacer la convercion de la cantidad de ganancia porcentual

    const productsMapped = products.docs.map(({name, description, unitPriceMargin, purchasePrice, type, _id, img, boxQuantity, salePriceMargin ,size})=>({
      id: _id,
      name,
      description,
      type,
      img,
      purchasePrice,
      boxQuantity,
      unitPrice: purchasePrice + (purchasePrice * (unitPriceMargin/100)),
      salePrice: purchasePrice + (purchasePrice * (salePriceMargin/100)),
      size
    }))
    res.render('products.handlebars',{ productsMapped, user });
  } catch (error) {
    console.log(error);
  }
});



router.post("/", privateAccess,async (req, res) => {
  const product = req.body
  try {
    await Product.created(product);
    res.status(201).json({ msj: "product added" });
  } catch (error) {
    res.status(500).json({msj: error})
  }
});

router.patch('/:pid', privateAccess,async(req,res)=>{
  const campos = req.body
  const {pid} = req.params
  
  const filter = {_id: pid}
/*   const update = {unitPrice:unitPrice} */

  try {
    await Product.updateProduct(filter, {$set:campos}) 
    res.send('Product updated')
  } catch (error) {
    console.log(error)
  }

})

router.delete("/", privateAccess,async (req, res) => {
  await Product.deleteMany();
  res.send("productos eliminados");
});

router.delete('/:id',privateAccess, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.deleteProductById(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:pid/update', privateAccess,async(req, res)=>{
  const {pid} = req.params
  const data = await Product.findOne(pid)
  res.render('editProd.handlebars', data)
})

router.get('/addProds', async (req, res)=>{
  res.render('addProduct.handlebars')
})

router.get('/:pid', privateAccess , async (req, res)=>{
  const {pid} = req.params

  try {
    const prod = await Product.findOne(pid)
    const prodPuncharse = prod.purchasePrice
    const unitMargin = prod.unitPriceMargin
    const saleMargin = prod.salePriceMargin

    const unitPrice = prodPuncharse + (prodPuncharse * (unitMargin/100))
    const salePrice = prodPuncharse + (prodPuncharse * (saleMargin/100))
    
    res.render('oneProd.handlebars',{prod, unitPrice, salePrice})
  } catch (error) {
    res.status(400).json({msj: error.message})
  }
})
module.exports = router;
