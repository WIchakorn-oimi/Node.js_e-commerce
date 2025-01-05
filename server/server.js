// server.js

const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/auth'));

// โหลดทุกไฟล์ในโฟลเดอร์ routes
readdirSync('./routes').map((file) => app.use('/api', require('./routes/' + file)));

app.listen(5000, () => console.log('Server is running on port 5000'));
