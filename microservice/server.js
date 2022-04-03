const app = require("express")();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const boxService = app;

const PORT = 5000;


const routes = require("./api_source/routes");

routes(boxService);


boxService.listen(PORT, ()=>{
    console.log(`Box size service running on ${PORT}`);
});