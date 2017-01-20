var express = require('express');
var router = express.Router();
var config = require('../config.json')
var request = require('request')

router.get('/', function(req, res) {
    res.render('index', { title: 'express' })
})

var history = []

router.get('/api/imagesearch/:query', function(req, res, next) {
    history.push({
        query: req.params.query,
        time: new Date()
    })
    var page = req.query.offset || 1
    var url = 'https://api.imgur.com/3/gallery/search/top/'+page+'?q=' + req.params.query;
    console.log(url)
    console.log(config.clientId)
    request({
        method: 'GET',
        url: url,
        headers: {
            Authorization: 'Client-ID ' + config.clientId
        }
    }, function(err, response, body) {
    	var result = JSON.parse(body);
    	res.json(result.data)
    })
});

router.get('/api/latest/imagesearch', function(req, res, next) {
    res.json(history)
});

module.exports = router;
