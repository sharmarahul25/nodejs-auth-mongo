bodyParser = require('body-parser');
compression = require('compression');
cors = require("cors");


module.exports = (app)=>{
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.json({limit: '20mb'}));
  app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  }))
};
  