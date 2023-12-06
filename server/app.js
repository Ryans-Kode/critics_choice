const fs = require('fs'); 
const puppeteer = require('puppeteer');
const intersector = require('./intersecter.js');
const scraper = require('./scraper.js');
const movieDbsite = process.env.MOVIE_DB;
require('dotenv').config();

async function main(){
    const getNetflix = await scraper.getNetflixDb();
    const scrapeSites = await scraper.scrape();
    const generateWinners = await intersector.compareLists();
}

main();