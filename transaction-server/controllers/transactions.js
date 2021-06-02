const express = require("express");
const { getData, setData } = require("../data/dataHandler");
const router = new express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const data = getData();
        console.log(data);
        res.status(200).send(JSON.parse(data));
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
});

router.post('/transactions/add', async (req, res) => {
    try {
        const { transaction } = req.body;
        console.log(transaction);
        const data = getData();
        const parsedData = JSON.parse(data);
        parsedData.transactions.push(transaction);
        setData(JSON.stringify(parsedData));
        res.status(201).send();
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
});

module.exports = router