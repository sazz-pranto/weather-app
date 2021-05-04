const request = require('request');

const geocode = (location, callback) => {
    if(!location) {
        return console.log('Please enter a location!');
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic2F6ZGhvc3NhaW4iLCJhIjoiY2tudW50MXFuMGNnMTJvcXFiMnFqOHVrYiJ9.6xNplBHycUsFFxLfQkaprw&limit=1';

    request({ url: url, json: true }, (err, { body }) => { // destructuring the body property from response object as we only need that
        if(err) {
            callback(`Could not send the request!`, undefined);
        } else if(body.message) {
            callback(body.message, undefined);
        } else if(body.features.length === 0) {
            callback('Location not found, try another location!', undefined);
        } else {
            callback(
                undefined, {
                    longitude: body.features[0].center[0], 
                    latitude: body.features[0].center[1],
                    location: body.features[0].place_name
                }
            );
        }
    });
};

module.exports = geocode;