const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 
require('dotenv').config({ path: '.env.keys' })

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});
  
async function main (){
  try {
    console.log('starting to rehost images....')
    const winners = await require('./movie_data/winnersOnNetflix.json');
    for (const awardshow in winners) {
      if (winners.hasOwnProperty(awardshow)) {
        for (const movie of winners[awardshow]) {
          const updatedUrl = await uploadImage(movie.image_portrait);
          console.log(updatedUrl)
          movie.image_portrait = updatedUrl;
        }
      }
    }
    await printWinners(winners)
    
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

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

async function printWinners(winners) {
  try {
    fs.writeFile('./movie_data/winnersOnNetflix.json', JSON.stringify(winners), (err) => {
      if (err) throw err;
      console.log('File has been saved!');
    });
  } catch(error) {
    console.error(error)
  }

}

  module.exports = {
    main
  }
  
  
  
  
  