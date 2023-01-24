const router = require("express").Router();
const Stock = require("../models/Stock.js");
const User = require("../models/User.js");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");
const { update } = require("../models/Stock.js");

router.post("/addtostock", verify, async (req, res) => {
  const token = req.header("authorization");
  const userId = await jwt.decode(token)._id;

  let newStock = {
    type: req.body.type,
    name: req.body.name,
    count: req.body.count,
    creator_user: userId,
    last_updater: userId,
  };
  let stock = new Stock(newStock);
  try {
    await stock.save();
    res.send("New Item Created");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getAllItems", verify, async (req, res) => {

  let stock = await Stock.find();
 

  const stockForEach = async(e) => {
    let objectId = e._id.toString()
    let parsedId = objectId.substring(objectId.length-5,objectId.length)

    let stock_creator = await User.findById(e.creator_user)
    let stock_updater = await User.findById(e.last_updater)


    let element = {
      id: parsedId,
      type: e.type,
      name: e.name,
      count: e.count,
      creator_user: stock_creator.username,
      last_updater: stock_updater.username,
    };
    returnedStockArr.push(element);

    if(returnedStockArr.length === stock.length)
      res.send(returnedStockArr);
  }
  let returnedStockArr = [];

  stock.forEach((el) => {
    stockForEach(el)
  });


  // try {
  //   res.send(returnedStockArr);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

router.post("/updatestock", verify, async (req, res) => {
  const token = req.header("authorization");
  const userId = await jwt.decode(token)._id;

  const stockId = req.body.id
  const updateCount = req.body.count

  let allStockItems = await Stock.find()
  allStockItems.forEach(async (e) => {
    if(e.id.includes(stockId)){
      const stockFilter = { _id: e.id };
      const stockUpdate = {  count: updateCount };
      const userUpdate = {  last_updater: userId };
      await Stock.findOneAndUpdate(stockFilter, stockUpdate);
      await Stock.findOneAndUpdate(stockFilter, userUpdate);
    }
  })

  try {
    res.send("Stock Updated");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/removefromstock", verify, async (req, res) => {

  const stockId = req.body.id
  let allStockItems = await Stock.find()
  let condition = false

  const stockForEach = async(e) => {
    if(e.id.includes(stockId)){
      await Stock.findByIdAndRemove(e.id)
      condition = true
    }
    if(condition)
      res.send("Stock Removed");
  }

  allStockItems.forEach((el) => {
    stockForEach(el)
  })

});

module.exports = router;
