var express = require('express');
var bodyParser = require('body-parser');
var app = express()
var router = express.Router();
var rally = require('rally');
var Q = require('q');

var apiKeys;
try {
  apiKeys = require('./API_KEYS.js');
} catch (e) {

}

var apikey = '';
if (apiKeys) {
  apikey = apiKeys.RALLY_API_KEY;
} else {
  apikey = process.env.RALLY_API_KEY;
}

var restApi = rally({
  apiKey: apikey,
  server: 'https://rally1.rallydev.com'
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});


app.use(express.static('./'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

router.route('/tasks/:ref')
  .get(function (req, res) {
    var data = {
      ref: '/HierarchicalRequirement/' + req.params.ref + '/Tasks',
      fetch: ['Name']
    };

    restApi.get(data).then(function (data) {
      res.json(data.Object.Results);
    }, function (err) {
      res.json(err);
    });
  });

router.route('/defect')
  .put(function (req, res) {
    var data = {
      ref: {
        _ref: req.body._ref
      },
      data: {
        Actuals: req.body.Actuals
      },
      fetch: ['FormattedID', 'Name', 'Actuals'],

      requestOptions: {}
    };

    restApi.update(data, function (error, result) {
      if (error) {
        res.json(error);
      } else {
        res.json(result.Object);
      }
    });
  });
app.use('/api', router);
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})
