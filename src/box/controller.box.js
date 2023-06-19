const {Router} = require('express')
const Box = require('../dao/mongo/models/box.models')
const privateAccess = require('../utils/middlewares/privateAcces')
const router = Router()


router.get('/'/* , privateAccess */,async(req,res)=>{
  try {
    const totalBox = await Box.find()
    res.status(200).json({msj: totalBox})
  } catch (error) {
    res.status(500).json({msj: error.message})
  }
})

router.post('/post', /* privateAccess, */async (req, res)=>{
  const acc = 0
  const dailySolds = 0
  const monthlySold = 0
  try {
    const box = await Box.create({acc, dailySolds, monthlySold})
    res.status(201).json({msj: box})
  } catch (error) {
    res.status(500).json({msj: error})
  }
})

router.patch('/:bid', async(req, res)=>{
  const {price} = req.body
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
})

router.patch('/:bid/daily', privateAccess,async(req, res)=>{
  const filter = req.params.bid;
  const today = new Date();

  try {
    const box = await Box.findById(filter);
    const sale = box.acc;
    const update = {
      $push: {
        dailySolds: {
          $each: [{ sale, date: today }],
          $sort: { date: -1 }
        }
      },
      $set: { acc: 0 }
    };

    const updatedBox = await Box.findOneAndUpdate({_id: filter}, update, { new: true });
    res.status(200).json({ msj: updatedBox });
  } catch (error) {
    res.status(500).json({ msj: error });
  }
})
module.exports = router