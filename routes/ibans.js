var express = require('express');
var router = express.Router();

// var path = require('path');
// var salesforceConfig = JSON.parse(
//     fs.readFileSync(path.join(__dirname,
//     '../data/salesforce.json'),
//     'utf8')
// );

// var BALANCE = normalizePort(process.env.BALANCE || '3000');
// console.log("process: ", process);
var BALANCE = 100000;

var REMAIN_BALANCE = BALANCE;

var RESPONSES = {
  SUCCESS: 200,
  ACCEPTED: 202,
  NON_AUTHORITATIVE: 203,
  BAD_REQUEST: 400,
  PAYMENT_REQUIRED: 402,
  NOT_FOUND: 404,
  GATEWAY_TIMEOUT: 504,
  SEREVER_ERROR: 500,
  CONFLICT: 409,
  TEAPOT: 418
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/balance', function (req, res) {
    // (req, res, next)

    console.log(req.body);
    let configData = {"​code": RESPONSES["SUCCESS"], "data": {"balance": REMAIN_BALANCE}};

    res.set('Content-type', 'application/json');

    res.send(configData);
});

router.get('/bank/:iban', function (req, res) {
    // (req, res, next)

    console.log(req.params);
    let configData = {"​code": RESPONSES["NON_AUTHORITATIVE"],"data": {"bank": "MASHREQBANK PSC.", "logo": "https://dq8dwmysp7hk1.cloudfront.net/logos/mashreq.svg"}};

    res.set('Content-type', 'application/json');
    // res.json(JSON.parse(configData));

    res.send(configData);
});

router.post('/transfer/:iban', function (req, res) {
    console.log(req.params);
    console.log(req.body);

    let configData = {"​code": RESPONSES["ACCEPTED"]};
    if (REMAIN_BALANCE >= req.body.amount) {
      REMAIN_BALANCE -= req.body.amount;
    } else {
      configData["code"] = RESPONSES["PAYMENT_REQUIRED"]
    }
    res.set('Content-type', 'application/json');

    res.send(configData);
});

module.exports = router;
