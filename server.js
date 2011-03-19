var app = require('express').createServer();
require('express/plugins');

var Subject = require('./models/subject').Subject;

configure(function() {
	use(MethodOverride);
	use(ContentLength);
	use(Logger);
	set('root', __dirname);
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