const express = require('express')
const cors = require('cors')
const transactionsRouter = require('./controllers/transactions')

const app = express();

app.use(cors());
app.use(express.json());
app.use(transactionsRouter);

module.exports = app