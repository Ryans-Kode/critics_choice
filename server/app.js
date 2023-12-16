const fs = require('fs'); 
const puppeteer = require('puppeteer');
const intersector = require('./intersecter.js');
const scraper = require('./scraper.js');
const schedule = require('node-schedule');
const movieDbsite = process.env.MOVIE_DB;
require('dotenv').config();

async function main(){
    const getNetflix = await scraper.getNetflixDb();
    const scrapeSites = await scraper.scrape();
    const generateWinners = await intersector.compareLists();
}


// Schedule the job to run every Sunday at a specific time (e.g., 12:00 PM)
const job = schedule.scheduleJob('0 12 * * 0', function() {
  main();
});
