# Apple Wall Calendar
This projects is a digital calendar with events displayed from apple official calendar app.

## Configuration
Download `/setup/setup.sh` file 
```
curl https://raw.githubusercontent.com/ksawio97/apple-wall-calendar/master/setup/setup.sh -o setup.sh
```
Run setup file
```
sudo sh setup.sh
```
Add valid `CALENDAR_LINK` to `/setup/ecosystem.config.js` then start pm2 ecosystem
```
pm2 start ./apple-wall-calendar/setup/ecosystem.config.js
```


### TODO
- fix: cursor showing in kiosk mode
- fix: allow geolocation issues in kiosk mode
- photos of calendar on the wall
- add icon for data refresh progress bar
