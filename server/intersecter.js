const path = require('path');
const fs = require('fs'); 
const academyAwards = require('./movie_data/AcademyAwards.json');
const baftaAwards = require('./movie_data/BaftaAwards.json');
const imdb250 = require('./movie_data/IMDB250.json');
const goldenGlobe = require('./movie_data/GoldenGlobe.json');
const netflixDb = require('./movie_data/netflixDb.json')
const nfbPreserved = require('./movie_data/nfbPreserved.json')
const bestDirector = require('./movie_data/bestDirector.json')

let winners = {
  academyAwards:[],
  goldenGlobe:[],
  bafta:[],
  imdb250:[],
  nfbPreserved:[], 
  bestDirector:[]  
};

async function comparator (list,property) {
  for (let i = 0; i < list.length; i++) {
    console.log(list.titleName[i]);

    for (let j = 0; j < netflixDb.length; j++) {
      if (list[i].includes(netflixDb[j].title)) {
        console.log(netflixDb[j].title)
        winners[property].push(netflixDb[j])

      }
    }
  }
}

function compareLists(list,property){
  for (let i = 0; i < list.titleNames.length; i++) {

    for (let j = 0; j < netflixDb.length; j++) {


      if (list.titleNames[i].includes(netflixDb[j].title) && list.dateReleased[i] === netflixDb[j].titlereleased) {
      winners[property].push(netflixDb[j])  
      console.log(winners);
      } 
    }
  }
}

async function printWinners() {
  fs.writeFile('./movie_data/winnersOnNetflix.json', JSON.stringify(winners), (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  });
}

function main () {
  compareLists(academyAwards,'academyAwards');
  // compareLists(baftaAwards,'bafta');
  compareLists(goldenGlobe,'goldenGlobe');
  compareLists(imdb250,'imdb250');
  compareLists(nfbPreserved,'nfbPreserved');
  compareLists(bestDirector,'bestDirector');

  printWinners();
 };

 main();




