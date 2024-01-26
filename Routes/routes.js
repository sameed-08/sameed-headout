const express = require('express');
const { getData } = require('../Controllers/controller.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const fileName = req.query.n;
    const lineNumber = req.query.m;

    if (!fileName) {
        return res.status(400).send("Error: 'n' parameter is required");
    }

    const filePath = `/Users/apple/Desktop/sameed_headout_oa/tmp/data/${fileName}.txt`;

    try {
        const result = await getData(filePath, lineNumber, res);
        res.status(200).send(result);
    } catch (error) {
        if (error.message === 'File not found') {
            res.status(404).send(`Error: File ${fileName} not found`);
        } else {
            // console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
});

module.exports = router;
