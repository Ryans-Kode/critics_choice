const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const filePath = path.join(__dirname, 'movie_data', 'winnersOnNetflix.json');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/data.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json');

    res.sendFile(filePath);
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});