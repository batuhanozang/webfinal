const router = require("express").Router();
const Stock = require("../models/Stock.js");

router.post("/addtostock", async (req, res) => {
    let newStock = {
      type: req.body.type,
      name: req.body.name,
      count: req.body.count
    }
    let stock = new Stock(newStock);
    try {
      await stock.save();
      res.send("New Item Created");
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.get("/getAllItems", async (req, res) => {
    let stock = await Stock.find()
    let returnedStockArr = []
    stock.forEach(e => {
      let element = {
        type: e.type,
        name: e.name,
        count: e.count
      }
      returnedStockArr.push(element)
    })

    try {
      res.send(returnedStockArr);
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router
