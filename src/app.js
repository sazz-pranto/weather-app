const path = require('path');

const express = require('express');
const hbs = require('hbs');

const getcode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views locaiton
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pranto'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Pranto'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need help?',
        name: 'Pranto'
    })
});

app.get('/weather', (req, res) => {
    // if no query is passed, send an error message
    if(!req.query.address) {
        return res.send({
            error: "Location must be sent!"
        })
    }
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => { // an empty object is given as a default value so the app doesn't break if the location is not found
        if(err) {
            return res.send({ error: err });
        } else {
            forecast(latitude, longitude, (err, { temperature }) => {
                if(err) {
                    return res.send({ error: err });
                } else {
                    res.send({
                        temperature: temperature,
                        location: location,
                        address: req.query.address
                    })
                }
            });
        }
    });
    // res.send({
    //     forecast: `Its ${weather.temperature} now`,
    //     location: weather.Location,
    //     address: req.query.address
    // })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        page: 'Help article', 
        name: 'Pranto'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        page: 'Page', 
        name: 'Pranto'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
