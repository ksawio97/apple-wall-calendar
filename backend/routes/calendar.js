const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendarController');
router.get('/calendar/update', calendarController.updateCalendarData);

module.exports = router;