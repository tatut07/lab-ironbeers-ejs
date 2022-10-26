const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req, res) => {
  const beer = await punkAPI.getBeers();
  res.render('beers', { beer });
});
app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  res.render('random-beer', { randomBeer });
});
app.get('/beerId/:id', async (req, res) => {
  const id = req.params.id;
  const singleBeer = await punkAPI.getBeer(id);
  res.render('beerId', { singleBeer });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
