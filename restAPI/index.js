const app = require('express')();
var bodyParser = require('body-parser');
const request = require('request');
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(
    PORT,
    () => console.log(`API running on ${PORT}`)
)

app.get('/get-size', (req, res) => {
    request({
        url: 'http://localhost:5000/',
        headers: {
        "Authorization": "API".toString("base64")
        },
        body: req.query || [],
        json: true
    }, 
        (error, response, body) => {
        error ? console.log(error) : res.json(body)
    })
});