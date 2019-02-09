//simple express server

const express = require('express');
const app = express();

//use public dir as static assests
app.use(express.static('public'));

//dynamic port binding
const PORT = process.env.PORT || 3000;
app.listen(PORT);
