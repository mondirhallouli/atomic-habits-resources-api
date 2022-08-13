const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 5000
const hostname = 'localhost';

// scrapped resources collection
const resources = [];

// initiate the express app
const app = express();

// listen for requests on this path
app.get('/', (request, response) => {
    // fetch the webpage
    axios.get('https://jamesclear.com/atomic-habits/resources').then(res => {
        let html = res.data;
        // load the cheerio library
        const $ = cheerio.load(html);

        // scrape the page for the desired links
        $('div.content a', html).each(function() {
            let title = $(this).text();
            let url = $(this).attr('href');

            // create an object for each resource
            resources.push({title: title, url: url});
        })

        // send the json response
        response.json(resources);
    }).catch(error => console.log(error));
})

app.listen(PORT, () => {
    console.log(`server live at: http://${hostname}:${PORT}`);
})