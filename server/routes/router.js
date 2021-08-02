const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
require('dotenv').config();

router.post('/', (req, res) => {
    console.log('what is this',req.body);
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    axios.get(`${process.env.census_search_api}&street=${address}&city=${city}&state=${state}&zipCode=${zip}`
    )
 
    .then((response) => {
        console.log('OMG what is this',response.data.result.addressMatches[0].coordinates); 
    })
    .catch((err) => {
        console.log('this is an error',err);
        res.sendStatus(500)
    })

});

router.get('/', (req, res) => {

    pool.query('SELECT * FROM "smush";')
    .then((results) => {
        res.send(results.rows);
    })
    .catch((err) => {
        console.log('Error GETing coordinates', err);
        res.sendStatus(500)
    })
});

module.exports = router;