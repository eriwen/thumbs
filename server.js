var express = require('express');
var app = express.createServer();
var stylus = require('stylus');

var str = require('fs').readFileSync(__dirname + '/views/style.styl', 'utf8');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var Subject = require('./models/subject').Subject;
var subject = new Subject();

app.get('/', function(request, response) {
	subject.findAll(function(error, subjects) {
		response.render('index', {
			layout: false,
			locals: {
				pageTitle: 'Do we have a quorum?',
				subjects: subjects
			}
		});
	});
	response.end();
});

get('/*.css', function(file){
	stylus.render(str, { filename: file + 'style.styl' }, function(err, css){
		console.log(css);
	});
});

app.listen(process.env.PORT || 8001);