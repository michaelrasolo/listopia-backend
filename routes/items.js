var express = require("express");
var router = express.Router();
const fetch = require("node-fetch"); // node-fetch install
const Item = require("../models/items");

// CREATE A NEW ITEM
router.post("/newitem", (req, res) => {


  const newItem = new Item({
    itemName: req.body.itemName,
    image: req.body.image,
    url: req.body.url,
    dealer: req.body.dealer,
    booked: req.body.booked,
    price: req.body.price,
    category: req.body.category,
  });

  newItem.save().then((newDoc) => {
    res.json({ result: true, token: newDoc.token });
  });
});

module.exports = router;

// GET ALL ITEMS
router.get("/", (req, res) => {
  Item.find({})
    .then((items) => {
      const itemElements = items.map(item => {
        return {
          itemName: item.itemName,
          image: item.image,
          url: item.url,
          dealer: item.dealer,
          booked: item.booked,
          category: item.category,
          price: item.price,
          desc: item.desc,
        }
      })
      res.json({ result: true, items:itemElements });
    })
    .catch((error) => {
      console.error(error);
    });
});

// GET ITEMS BY CATEGORY
router.get("/:category", (req, res) => {
  Item.find({ category: req.params.category })
    .then((items) => {
      const itemElements = items.map(item => {
        return {
          itemName: item.itemName,
          image: item.image,
          url: item.url,
          dealer: item.dealer,
          booked: item.booked,
          category: item.category,
          price: item.price,
          desc: item.desc,
        }
      })
      res.json({ result: true, items: itemElements });
    })
    .catch((error) => {
      console.error(error);
    });
});

// BOOK AN ITEM

router.put("/book", async (req, res) => {
  // Find item
  const item = await Item.findOne({ _id: req.body._id });
  if (!item) return res.json({ result: false, error: "Item not found" });
  console.log(req.body.gifter, req.body.email, req.body.message);
  item.booked = true;
  item.message = req.body.message;
  item.gifter = req.body.gifter;
  item.email = req.body.email;

  await item.save();
  res.json({
    result: true,
    message: `${item.itemName} has been booked by ${item.gifter}`,
  });
});

// CANCEL BOOKED  ITEM

router.put("/unbook", async (req, res) => {
  // Find item
  const item = await Item.findOne({ _id: req.body._id });
  if (!item) return res.json({ result: false, error: "Item not found" });
  // Check the user's email
  console.log("DB:",item.email,"Req", req.body._id);
  if (req.body.email.toLowerCase() !== item.email.toLowerCase())
    return res.json({ result: false, error: "Email not matching" });
  // Cancel the booking
  item.booked = false;
  item.message = null;
  item.gifter = null;
  item.email = null;

  await item.save();
  res.json({
    result: true,
    message: `${item.itemName}'s booking has been canceled`,
  });
});
