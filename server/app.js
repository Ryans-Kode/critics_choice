require('dotenv').config({ path: '.env.keys' })


const intersector = require('./intersecter.js');
const scraper = require('./scraper.js');
const imageRehoster = require('./imageRehoster.js');

require('dotenv').config();

async function main(){
    try {
        const scrape = await scraper.main();
        const generateWinners = await intersector.main();
        const reHostImages = await imageRehoster.main();
    } catch (err) {
        console.error(err)
    }
}


main();