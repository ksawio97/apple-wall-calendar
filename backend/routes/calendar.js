const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendarController');
router.get('/calendar/events', calendarController.getEvents);
module.exports = router;