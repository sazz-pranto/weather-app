const request = require('request');

const forecast = (lat, long , callback) => {
    const url = 'https://api.tomorrow.io/v4/timelines?location=' + lat + ',' + long + '&fields=temperature&timesteps=current&units=metric&apikey=yejfo4rwdumDbRRxEDaG6jH44cCRx4yX';
    request({ url: url, json: true }, (err, { body }) => { // destructuring the body property from response object as we only need that
        if(err) {
            callback(`Could not send the request!`, undefined);
        } else if(body.message) {
            callback(body.message, undefined);
        } else {
            callback(undefined, {
                temperature: body.data.timelines[0].intervals[0].values.temperature
            });
        }
    });
};

module.exports = forecast;
