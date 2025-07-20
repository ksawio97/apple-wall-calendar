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
            script: 'serve',
            args: './apple-wall-calendar/frontend/build 3000',
            env: {
                NODE_ENV: 'production',
                REACT_APP_BACKEND_LINK: "http://localhost:3001/",
            },
        },
        {
            name: 'kiosk',
            script: 'bash',
            args: '-c "sleep 5 && unclutter -idle 0 & chromium-browser --kiosk http://localhost:3000 --start-maximized --noerrdialogs --enable-features=OverlayScrollbar --disable-infobars --enable-geolocation --disable-geolocation-constant-prompt"'
        },
    ]
}   