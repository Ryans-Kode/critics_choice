const fs = require('fs'); 
const cloudinary = require('cloudinary').v2;
const puppeteer = require('puppeteer');
const movieDbsite = process.env.MOVIE_DB;
require('dotenv').config({ path: '.env.keys' })


const intersector = require('./intersecter.js');
const scraper = require('./scraper.js');
const imageRehoster = require('./imageRehoster.js');

require('dotenv').config();

async function main(){
    const scrape = await scraper.main();
    const generateWinners = await intersector.main();
    const reHostImages = await imageRehoster.main();
}


main();