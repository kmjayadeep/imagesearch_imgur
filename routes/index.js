var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('index',{title:'express'})
})

var history = []

router.get('/api/imagesearch/:query', function(req, res, next) {
	history.push({
		query:req.params.query,
		time:new Date()
	})
	res.json(req.params.query)
});

router.get('/api/latest/imagesearch', function(req, res, next) {
	res.json(history)
});

module.exports = router;
