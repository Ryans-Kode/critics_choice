const fs = require('fs'); 
const cloudinary = require('cloudinary').v2;
const puppeteer = require('puppeteer');
const movieDbsite = process.env.MOVIE_DB;

const intersector = require('./intersecter.js');
const scraper = require('./scraper.js');
const schedule = require('node-schedule');
const imageRehoster = require('./imageRehoster.js');

require('dotenv').config();

async function main(){
    const getNetflixDb = await scraper.getNetflixDb();
    const scrapeSites = await scraper.scrape();
    const generateWinners = await intersector.compareLists();
    const reHostImages = await imageRehoster.main();
}


// Schedule the job to run every Sunday at a specific time (e.g., 12:00 PM)
// const job = schedule.scheduleJob('0 12 * * 0', function() {
//   main();
// });
main();