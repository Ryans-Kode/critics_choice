const fs = require('fs'); 
const puppeteer = require('puppeteer');
require('dotenv').config();
const movieDbsite = process.env.MOVIE_DB;

const websites = [
  { name: 'IMDB 250', url:'https://www.imdb.com/chart/top/?ref_=nv_mv_250', selector:'div > div.ipc-page-grid.ipc-page-grid--bias-left > div > ul > li > div.ipc-metadata-list-summary-item__c > div > div > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-6fa21551-9.dKJKsK.cli-title > a > h3'},
  { name: 'Academy Awards', url:'https://www.imdb.com/list/ls009480135/', selector:'#main > div > div.lister.list.detail.sub-list > div.lister-list > div > div.lister-item-content > h3 > a'},
  { name: 'Golden Globe', url: 'https://www.imdb.com/list/ls093647623/?sort=release_date,desc&st_dt=&mode=detail&page=1', selector:'#main > div > div.lister.list.detail.sub-list > div.lister-list > div > div.lister-item-content > h3 > a'},
  { name: 'Bafta Awards', url: 'https://en.wikipedia.org/wiki/BAFTA_Award_for_Best_Film', selector:'#mw-content-text > div.mw-parser-output > table > tbody > tr > td > i > b > a'}
  ];

async function getNetflixDb() {
  try {
    const response = await fetch(movieDbsite);
    const data = await response.json();
    fs.writeFile("./movie_data/netflixDb.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('File has been saved!');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function launchPuppeteer() {

    const browser =  await puppeteer.launch({headless: false});
    const page = await browser.newPage();



    for (const site of websites) {
      try {
        await page.goto(site.url,{ waitUntil: 'networkidle2'});

          const scrape = await page.evaluate((selector) => {
            let content = Array.from(document.querySelectorAll(selector), e => e.innerText);
            return content;
          }, site.selector);
          writeToJson(site,scrape);
      } catch (error) {
        console.error('Error in page.evaluate:', error);
      }
    }
    async function writeToJson(site,data){
      fs.writeFile('./movie_data/'+site.name+'.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('File has been saved!');
      });
    }
    await browser.close(); 
}

launchPuppeteer();
getNetflixDb();

