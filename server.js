var express = require('express');
var app = express.createServer();

var Subject = require('./models/subject').Subject;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

var subject = new Subject();

app.get('/', function(){
	var self = this;
	subject.findAll(function(error, docs) {
		self.halt(200, require('sys').inspect(docs));
	});
});

run();
//app.listen(process.env.PORT || 8001);