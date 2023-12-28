const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const filePath = path.join(__dirname, 'movie_data', 'winnersOnNetflix.json');

app.get('/data.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendFile(filePath);
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});