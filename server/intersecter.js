const fs = require('fs'); 
const scraper = require('./scraper.js');



let winnersOnNetflix = {
  academyAwards:[],
  goldenGlobe:[],
  imdb250:[],
  nfbPreserved:[], 
  bestDirector:[]  
};

async function compareLists(){
  const netflixDb = await require('./movie_data/netflixDb.json')
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
  printWinners(winnersOnNetflix)
}

async function printWinners(winners) {
  fs.writeFile('./movie_data/winnersOnNetflix.json', JSON.stringify(winners), (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  });
}



module.exports = {
  compareLists
}




