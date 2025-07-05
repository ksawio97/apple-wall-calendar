const express = require('express');
const router = express.Router();

const weatherController = require('../controllers/weatherController');
router.get('/weather', weatherController.getWeatherInfo);
module.exports = router;