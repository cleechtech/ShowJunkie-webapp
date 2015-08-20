// script to get "Popular tickets in SF Bay Area" from songkick
//======

var fs = require('fs');
var cheerio = require('cheerio');
var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);

var outputPath = './results.json';

client
    .init()
    .url('http://www.songkick.com/metro_areas/26330-us-sf-bay-area')
    .waitForExist('[data-ga-category="metro_area_page"]')
    .getHTML('.carousel-item')
    .then(function(items){    	

    	items.forEach(function(item, i){

    		var $ = cheerio.load(item, {normalizeWhitespace: true});

    		// ignore the five Popular artists in SF Bay Area
    		if(i > 4){
    			var artistName = $('.carousel-item-name').text();
    			var concertDate = $('.carousel-item-details > a').contents().get(0).nodeValue;
    			var venueName = $('.event-details:nth-child(2)').text();

    			// location
    			var cityState = $('.event-details:nth-child(3)').text().split(',');
    			var city = cityState[0];
    			var state = cityState[1];
    			var country = cityState[2];


    			// click on artist details


    			// click on show details

    			
    		}
    	});
    })
    .end();