const fs = require('fs'); 
const fsPromises = require('fs').promises;
const scraper = require('./scraper.js');



let winnersOnNetflix = {
  academyAwards:[],
  goldenGlobe:[],
  imdb250:[],
  nfbPreserved:[], 
  bestDirector:[]  
};

async function compareLists(){
  console.log('starting to compare lists');
  const netflixDb = await require('./movie_data/netflixDb.json');
  const awardWinners = await scraper.websites
  for (winner of awardWinners){
    for(let i = 0; i < winner.titles.length; i++){
      for(let j = 0; j < netflixDb.length; j++){
        if (winner.titles[i].includes(netflixDb[j].title) && winner.dateReleased[i] === netflixDb[j].titlereleased) {
          winnersOnNetflix[winner.name].push(netflixDb[j])  
        } 
      }
    }
  }
  console.log('completed comparing lists');
}

async function printWinners(winnersOnNetflix) {
  console.log('starting to print list')
  await fsPromises.writeFile('./movie_data/winnersOnNetflix.json', JSON.stringify(winnersOnNetflix), (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  });
}

async function main() {
  const compare = await compareLists();
  const print = await printWinners(winnersOnNetflix);
}

module.exports = {
  main,
  compareLists,
  printWinners,
  winnersOnNetflix
}




