exports.getWeatherInfo = async (req, res) => {
    const [latitude, longitude, timezone] = [req.query.latitude, req.query.longitude, req.query.timezone];
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Missing latitude, longitude or timezone query parameters' });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&temperature_unit=celsius&precipitation_unit=mm&timezone=${timezone}`;

    const response = await fetch(url);
    if (!response.ok) {
        return res.status(response.status).json({
            error: `Open-Meteo API error: ${response.statusText}`
        });
    }
    const data = await response.json();
    const current = data.current;
    const result = {
      temperature: current.temperature_2m,
      weather_code: current.weather_code,
      is_day: current.is_day,
    };

    res.json(result);
}