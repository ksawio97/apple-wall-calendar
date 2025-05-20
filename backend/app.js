const express = require('express');
const app = express();
const calendarRoutes = require('./routes/calendar');

app.use(calendarRoutes);

module.exports = app