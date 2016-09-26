var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('http://stats.espncricinfo.com/ci/content/records/335431.html', function(error, response, body) {
  console.log('reaches here');
  if(!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var list = $('tbody');
    console.log(list.html());
  } else {
    console.log('phat gaya be');
    console.log(response);
    // console.log(error);
  }
});
