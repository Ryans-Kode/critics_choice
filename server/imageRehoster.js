const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 
const winners = require('./movie_data/winnersOnNetflix.json');
require('dotenv').config();


          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});
  
async function main (){
  for (const awardshow in winners) {
    if (winners.hasOwnProperty(awardshow)) {
      for (const movie of winners[awardshow]) {
        const updatedUrl = await uploadImage(movie.image_portrait);
        movie.image_portrait = updatedUrl;
      }
    }
  }
  fs.writeFile('./movie_data/winnersOnNetflix.json', JSON.stringify(winners), (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  });
}
  

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result.url);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};
  main();  

  module.exports = {
    main
  }
  
  
  
  
  