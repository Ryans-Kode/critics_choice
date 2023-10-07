const fs = require('fs'); 
const puppeteer = require('puppeteer');
require('dotenv').config();
const movieDbsite = process.env.MOVIE_DB;



async function getMovieDb() {
  try {
    const response = await fetch(movieDbsite);
    const data = await response.json();
    fs.writeFile("movieDb.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('File has been saved!');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function scrapper() {

    const browser =  await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.imdb.com/chart/top/?ref_=nv_mv_250',{ waitUntil: 'networkidle2'});

    const result = await page.evaluate(() => {

     
      let title = Array.from(document.querySelectorAll(' div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul > li > div.ipc-metadata-list-summary-item__c > div > div > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-6fa21551-9.dKJKsK.cli-title > a > h3'),
      e => e.innerText); 

      return title;

    });
    console.log(result);

 
}

scrapper();
// getMovieDb();
debugger;
