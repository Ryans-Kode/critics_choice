const fsPromises = require('fs').promises;
const puppeteer = require('puppeteer');
require('dotenv').config({ path: '.env.development' })
const movieDbsite = process.env.MOVIE_DB;


const imdbTitleSelector = '#__next > main > div.ipc-page-content-container.ipc-page-content-container--center.sc-9b618954-0.sqGLE > div.ipc-page-content-container.ipc-page-content-container--center > section > section > div > section > section > div:nth-child(2) > div > section > div.ipc-page-grid.ipc-page-grid--bias-left.ipc-page-grid__item.ipc-page-grid__item--span-2 > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > ul > li > div.ipc-metadata-list-summary-item__c > div > div > div.sc-b4e41383-3.bdsEXx > div.sc-1e00898e-0.jyXHpt > div.ipc-title.ipc-title--base.ipc-title--title.ipc-title-link-no-icon.ipc-title--on-textPrimary.sc-1e00898e-9.jQixeG.dli-title > a > h3'
const imdbYearSelector = '#__next > main > div.ipc-page-content-container.ipc-page-content-container--center.sc-9b618954-0.sqGLE > div.ipc-page-content-container.ipc-page-content-container--center > section > section > div > section > section > div > div > section > div.ipc-page-grid.ipc-page-grid--bias-left.ipc-page-grid__item.ipc-page-grid__item--span-2 > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > ul > li > div.ipc-metadata-list-summary-item__c > div > div > div.sc-b4e41383-3.bdsEXx > div.sc-1e00898e-0.jyXHpt > div.sc-1e00898e-7.hcJWUf.dli-title-metadata > span:nth-child(1)';


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
    console.log('grabing netflix db')
    try {
      const response = await fetch(movieDbsite);
      const data = await response.json();
      fsPromises.writeFile("./movie_data/netflixDb.json", JSON.stringify(data), (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('File has been saved!');
  }
  

async function scrape() {
    console.log('starting scraping')
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

    await browser.close(); 
}

async function main()
{
  const netfilixDB = await getNetflixDb()
  const scraper = await scrape()
}

module.exports = {
  main,
  websites 
};
