var express = require('express');
var bodyParser = require('body-parser');
var app = express()
var router = express.Router();
var rally = require('rally');

var Q = require('q');

var apiKeys, memberMap;
try {
  apiKeys = require('./API_KEYS.js');
  memberMap = require('./memberMap.js');
} catch (e) {

}

var apikey = '';
if (apiKeys) {
  apikey = apiKeys.RALLY_API_KEY;
} else {
  memberMap = process.env.MEMBER_MAP;
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
      fetch: ['ObjectID', 'Name', 'Actuals', 'State']
    };

    restApi.get(data).then(function (data) {
      res.json(data.Object.Results);
    }, function (err) {
      res.json(err);
    });
  })
  .post(function (req, res){
    console.log(req.body);
    req.body.WorkProduct = req.params.ref;
    restApi.create({
      'type':'Task',
      'data': req.body
    }).then(function (data) {
      res.json(data.Object);
    }, function (err) {
      res.json(err);
    });
  });

router.route('/defect/:ref')
  .put(function (req, res) {
    var data = {
      ref: '/Task/' +req.params.ref,
      data: req.body,
      fetch: ['ObjectID', 'Name', 'Actuals', 'State'],

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

router.route('/member-map/')
.get(function(req,res){
  res.json(memberMap);
});

app.use('/api', router);
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})
