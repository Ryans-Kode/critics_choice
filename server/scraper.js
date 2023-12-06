const fs = require('fs'); 
const puppeteer = require('puppeteer');
require('dotenv').config();
const movieDbsite = process.env.MOVIE_DB;


const imdbTitleSelector = '#__next > main > div.ipc-page-content-container.ipc-page-content-container--center.sc-872d7ac7-0.fqEQWL > div.ipc-page-content-container.ipc-page-content-container--center > section > section > div > section > section > div:nth-child(2) > div > section > div.ipc-page-grid.ipc-page-grid--bias-left.ipc-page-grid__item.ipc-page-grid__item--span-2 > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > ul > li > div.ipc-metadata-list-summary-item__c > div > div > div.sc-21df249b-3.gkfizf > div.sc-479faa3c-0.fMoWnh > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-479faa3c-9.dkLVoC.dli-title > a > h3';
const imdbYearSelector = '#__next > main > div.ipc-page-content-container.ipc-page-content-container--center.sc-872d7ac7-0.fqEQWL > div.ipc-page-content-container.ipc-page-content-container--center > section > section > div > section > section > div:nth-child(2) > div > section > div.ipc-page-grid.ipc-page-grid--bias-left.ipc-page-grid__item.ipc-page-grid__item--span-2 > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > ul > li> div.ipc-metadata-list-summary-item__c > div > div > div.sc-21df249b-3.gkfizf > div.sc-479faa3c-0.fMoWnh > div.sc-479faa3c-7.jXgjdT.dli-title-metadata > span:nth-child(1)';

let netflixDb = {};
let websites = [
  { name: 'imdb250',
    url:'https://www.imdb.com/search/title/?title_type=feature&sort=moviemeter,asc&groups=top_250&count=250',
    titleSelector: imdbTitleSelector,
    yearSelector: imdbYearSelector
  },
  { name: 'academyAwards', 
    url:'https://www.imdb.com/search/title/?sort=num_votes,desc&groups=oscar_winner&count=250',
    titleSelector: imdbTitleSelector,
    yearSelector: imdbYearSelector
  },
  { name: 'goldenGlobe',
    url: 'https://www.imdb.com/search/title/?title_type=feature&groups=golden_globe_winner&count=250',
    titleSelector: imdbTitleSelector,
    yearSelector: imdbYearSelector
  },
  { name: 'nfbPreserved', 
    url: 'https://www.imdb.com/search/title/?sort=user_rating,desc&groups=national_film_preservation_board_winner&count=250',
    titleSelector: imdbTitleSelector,
    yearSelector: imdbYearSelector
  },
  { name: 'bestDirector',
    url: 'https://www.imdb.com/search/title/?title_type=feature&sort=user_rating,desc&groups=best_director_winner&count=250',
    titleSelector: imdbTitleSelector,
    yearSelector: imdbYearSelector
  }
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
  

async function scrape() {

    const browser =  await puppeteer.launch({headless: false});
    const page = await browser.newPage();



    for (const site of websites) {
      try {
        await page.goto(site.url,{ waitUntil: 'networkidle2'});

          const title = await page.evaluate((titleSelector) => {
            let content = Array.from(document.querySelectorAll(titleSelector), e => e.innerText);
            return content;
          }, site.titleSelector);
          site.titles = title;
          console.log(`${site.name} winning titles has been scraped`)


          const titleReleased = await page.evaluate((yearSelector) => {
            let content = Array.from(document.querySelectorAll(yearSelector), e => e.innerText);
            return content;
          }, site.yearSelector); 
          site.dateReleased = titleReleased;
          console.log(`${site.name} winning titles date has been scraped`)


          // writeToJson(site,movie);

      } catch (error) {
        console.error('Error in page.evaluate:', error);
      }
      // console.log(site);

    }
    async function writeToJson(site,data){
      fs.writeFile('./movie_data/'+site.name+'.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('File has been saved!');
      });
    }
 

    await browser.close(); 
}

// async function compareLists(list,property){
//   const netflixDb = await fs.readFile('./movie_data/netflixDb.json');
//   for (let i = 0; i < list.titleNames.length; i++) {

//     for (let j = 0; j < netflixDb.length; j++) {

//       if (list.titleNames[i].includes(netflixDb[j].title) && list.dateReleased[i] === netflixDb[j].titlereleased) {
//       winners[property].push(netflixDb[j])  
//       console.log(winners);
//       } 
//     }
//   }
// }
module.exports = {
  scrape,
  getNetflixDb,
  websites,
  netflixDb 
};
