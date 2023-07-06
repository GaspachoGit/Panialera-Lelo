const {Router} = require('express')
const Box = require('../dao/mongo/models/box.models')
const privateAccess = require('../utils/middlewares/privateAcces')
const { errorMonitor } = require('connect-mongo')
const router = Router()


router.get('/', privateAccess ,async(req,res)=>{ //renderizo el box
  try {
    const totalBox = await Box.find()

    const data = {
      box : totalBox[0].acc,
      day: totalBox[0].daySold,
      daily : totalBox[0].dailySolds,
      monthly : totalBox[0].monthlySold
    }
    console.log(data)

    res.render('box.handlebars', data)
  } catch (error) {
    res.status(500).json({msj: error.message})
  }
})

router.post('/post', privateAccess, async (req, res)=>{ //creo un box
  const acc = 0
  const dailySolds ={
    amount : 0,
    date: new Date()
  }
  const monthlySold = {
    amount: 0,
    date: new Date()
  }
  console.log(dailySolds, monthlySold)
  try {
    const box = await Box.create({acc, dailySolds, monthlySold})
    res.status(201).json({msj: box})
  } catch (error) {
    res.status(500).json({msj: error})
  }
})

/* router.patch('/:bid', privateAccess, async(req, res)=>{ //acumulador para el box
  const filter = req.params.bid
  try {

    const box = await Box.findById(filter)
    console.log(box.acc)
    const newAcc = box.acc + price 
    console.log(newAcc)
    const sold = await Box.updateOne({_id: filter}, {$set: {acc: newAcc}})
    res.status(200).json({msj: sold}) 
  } catch (error) {
    res.status(500).json({msj: error})
  }
}) */

router.patch('/:bid', privateAccess ,async(req, res)=>{ //agrego una compra
  const filter = req.params.bid
  const today = new Date()
  const {price} = req.body

  try {
    const box = await Box.findById(filter)
    const newAcc = box.acc + price 


    const update = {
      $push:{
        daySold:{
          $each: [{amount: price, date: today}],
          $sort: {date: -1}
        }
      },
      $set:{ acc: newAcc }
    }
    const updatedBox = await Box.findByIdAndUpdate({_id: filter}, update, {new: true})
    res.status(200).json({msj: updatedBox})
  } catch (error) {
    res.status(400).json({msj: error.message})
  }

})

router.patch('/:bid/daily', privateAccess, async(req, res)=>{ //cierro caja diariamente
  const filter = req.params.bid;
  const today = new Date();

  try {
    const box = await Box.findById(filter);
    const sale = box.acc;
    const update = {
      $push: {
        dailySolds: {
          $each: [{ amount: sale, date: today }],
          $sort: { date: -1 }
        }
      },
      $set: { 
        acc: 0,
        daySold: []
      }
    };

    const updatedBox = await Box.findOneAndUpdate({_id: filter}, update, { new: true });
    res.status(200).json({ msj: updatedBox });
  } catch (error) {
    res.status(500).json({ msj: error });
    console.log(error)
  }
})

router.patch('/:bid/monthly', privateAccess, async (req, res) => { //cierro caja mensualmente
  const filter = req.params.bid;

  try {
    const box = await Box.findById(filter);
    const dailySales = box.dailySolds;
    const monthlyTotal = dailySales.reduce((total, sale) => total + sale.amount, 0);

    const update = {
      $push: {
        monthlySold: {
          amount: monthlyTotal,
          date: new Date(),
        },
      },
      $set: {
        acc: 0,
        dailySolds: [],
      },
    };

    const updatedBox = await Box.findOneAndUpdate({ _id: filter }, update, { new: true });
    res.status(200).json({ msj: updatedBox });
  } catch (error) {
    res.status(500).json({ msj: error });
  }
});

module.exports = router