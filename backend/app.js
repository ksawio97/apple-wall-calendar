const express = require('express');
const app = express();
const calendarRoutes = require('./routes/calendar');
const weatherRoutes = require('./routes/weather');

app.use((req, res, next) => {
    // Nagłówki CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
app.use(calendarRoutes, weatherRoutes);

module.exports = app