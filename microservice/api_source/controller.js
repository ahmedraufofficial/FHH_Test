const Random = () => {
    return Math.floor(Math.random()*(99)+1)
}

let controllers = {
    size: (req, res)=>{
        const boxSize = {
        "height": Random(),
        "width": Random(),
        "length": Random()
        };
        let sizeInfo ={
            "box_size": boxSize,
            "total_products": Object.keys(req.body).length || 0
        };
        req.header("Authorization") == "API" ?  res.json(sizeInfo) : res.json("Make call from authorized RestAPI")
    },
};

module.exports = controllers;