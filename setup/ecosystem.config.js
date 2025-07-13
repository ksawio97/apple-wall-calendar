module.exports = {
    apps: [
        {
            name: 'backend',
            script: './apple-wall-calendar/backend/server.js',
            env: {
                NODE_ENV: 'production',
                CALENDAR_LINK: "your-calendar-link",
                PORT: 3001,
            },
        },
        {
            name: 'frontend',
            script: 'npx',
            interpreter: 'none',
            args: 'serve -p 8080 ./apple-wall-calendar/frontend/build',
        },
        // Add Kiosk mode for Chromium browser
    ],
}