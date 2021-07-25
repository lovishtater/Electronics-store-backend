const express = require('express');
const router = express.Router();
const {makepayment} = require('../controllers/stripePayment');

router.post('/stripepayment', makepayment);

module.exports = router;
