var express = require('express');
var app = express.createServer();

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
	subject.findById(2, function(error, docs) {
		response.write(require('sys').inspect(docs));
	});
	response.end();
});

app.listen(process.env.PORT || 8001);