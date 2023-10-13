const fs = require('fs'); 
const puppeteer = require('puppeteer');
require('dotenv').config();
const movieDbsite = process.env.MOVIE_DB;

const websites = [
  { name: 'IMDB250', url:'https://www.imdb.com/search/title/?title_type=feature&groups=top_250&count=250', selector:'#main > div > div.lister.list.detail.sub-list > div > div > div.lister-item-content > h3 > a'},
  { name: 'AcademyAwards', url:'https://www.imdb.com/list/ls009480135/', selector:'#main > div > div.lister.list.detail.sub-list > div.lister-list > div > div.lister-item-content > h3 > a'},
  { name: 'GoldenGlobe', url: 'https://www.imdb.com/list/ls093647623/?sort=release_date,desc&st_dt=&mode=detail&page=1', selector:'#main > div > div.lister.list.detail.sub-list > div.lister-list > div > div.lister-item-content > h3 > a'},
  { name: 'BaftaAwards', url: 'https://en.wikipedia.org/wiki/BAFTA_Award_for_Best_Film', selector:'#mw-content-text > div.mw-parser-output > table > tbody > tr > td > i > b > a'},
  { name: 'nfbPreserved', url: 'https://www.imdb.com/search/title/?title_type=feature&groups=national_film_preservation_board_winner&view=simple&count=250', selector: '#main > div > div.lister.list.detail.sub-list > div > div > div.lister-item-content > div > div.col-title > span > span > a'}
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

