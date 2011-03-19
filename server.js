var express = require('express');
var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.set('view engine', 'jade');

var Subject = require('./models/subject').Subject;
var subject = new Subject();

app.get('/', function(request, response) {
	response.sendHeader(200, {"Content-Type": "text/plain"});
	subject.findAll(function(error, subjects) {
		response.render('views/index', {
			locals: {
				subjects: subjects
			}
		});
	});
	response.end();
});

app.listen(process.env.PORT || 8001);