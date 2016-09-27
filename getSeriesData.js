var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var seriesTableTag = 'tbody';
var jsonToWrite = [];
var tempJSON = {};

request('http://stats.espncricinfo.com/ci/content/records/335431.html', function(error, response, body) {
  if(!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var seriesList = $(seriesTableTag);
    
    var seriesHTML = cheerio.load(seriesList.html());

    seriesHTML('tr').each(function(i, element) {
      var seriesDetailHTML = cheerio.load(seriesHTML(element).html());
      tempJSON = {};
      seriesDetailHTML('td').each(function(index, seriesDetail) {
        var temp = cheerio.load(seriesDetailHTML(seriesDetail).html());
        if(index === 0) {
          tempJSON.seriesLink = temp('a').attr('href');
          tempJSON.seriesName = temp('a').text();
        } else if(index === 1) {
          tempJSON.seriesSeason = temp.text();
        } else if(index === 3) {
          tempJSON.seriesWinner = temp.text();
        } else if(index === 4) {
          tempJSON.seriesResult = temp.text();
        }
      });
      jsonToWrite.push(tempJSON);
    });

    fs.writeFile('1.json', JSON.stringify(jsonToWrite), function(err) {
      console.log('done');
    });


  } else {
    console.log('phat gaya be');
    // console.log(response);
    // console.log(error);
  }
});
