const express = require('express');
const router = express.Router();

let db_handler;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

// Home Page
router.get('/', (req, res) => {
  // res.send('Fair Foods Reservation System');
  res.render('pages/index');
});

// Post Order
router.post('/order', (req, res) => {
  const form_data = req.body;

  const name = form_data['name'];
  const number = parseInt(form_data['number']);
  let message = `Order accepted: ${name}, ${number} bag(s). Thanks for your order!`;

  const orderObject = {
    name: name,
    number: number,
    // message: message
  }
  console.log(orderObject);
  console.log(message);

  db_handler.collection(COLLECTION_NAME).insertOne(orderObject, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/');
    };
  });
});

// Get All Orders
router.get('/allOrders', (req, res) => {
  db_handler.collection(COLLECTION_NAME).find({}).toArray( (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      let date = new Date();
      res.render('pages/allOrders', {
        'all_orders': result,
        'date': date
      });
    };
  });
});

module.exports = router;
