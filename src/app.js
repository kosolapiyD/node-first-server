const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getWeather = require('./utils/weather_utils');


const app = express();
// port will be used if exist if not will local
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Diman'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Diman'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Diman'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You must provide city!'
        });
    }

    getWeather(req.query.city, (data) => {
        console.log('data', data)
        res.send({
            coord: data.coord,
            forecast: data.weather,
            location: data.sys.country,
            city: req.query.city
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log("query search value =>", req.query.search)
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Diman',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});