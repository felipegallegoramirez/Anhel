const fs = require("fs");

const as = {};

as.get = async (req, res, next) => {
    const { id } = req.params;
    console.log("./Storage/"+id)
    fs.readFile("./Storage/"+id, function(err, data) {
        res.writeHead(200, {"Content-type": "image/jpg"});
        res.write(data);
        return res.end();
      });
  };

  module.exports = as;