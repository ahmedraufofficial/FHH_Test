const controller = require("./controller");


module.exports = function(boxService){
    boxService.route("/").get(controller.size);
};