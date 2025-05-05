require('dotenv').config();  // Add this at the top

const express = require('express');
const app = express();

const PORT = process.env.PORT ; 

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
