const path = require('path');
const fs = require('fs'); 
const academyAwards = require('./movie_data/AcademyAwards.json');
const baftaAwards = require('./movie_data/BaftaAwards.json');
const imdb250 = require('./movie_data/IMDB250.json');
const goldenGlobe = require('./movie_data/GoldenGlobe.json');
const netflixDb = require('./movie_data/netflixDb.json')
const nfbPreserved = require('./movie_data/nfbPreserved.json')

let winners = {
  academyAwards:[],
  goldenGlobe:[],
  bafta:[],
  imdb250:[],
  nfbPreserved:[],
  printWinners: async () => {
    fs.writeFile('./movie_data/winnersOnNetflix.json', JSON.stringify(winners), (err) => {
      if (err) throw err;
      console.log('File has been saved!');
    });
  }
};


async function comparator (list,property) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < netflixDb.length; j++) {
      if (list[i] == netflixDb[j].title) {
        console.log(netflixDb[j].title)
        winners[property].push(netflixDb[j])
      }
    }
  }
  winners.printWinners();
}

comparator(academyAwards,'academyAwards');
comparator(baftaAwards,'bafta');
comparator(goldenGlobe,'goldenGlobe');
comparator(imdb250,'imdb250');
comparator(nfbPreserved,'nfbPreserved');





