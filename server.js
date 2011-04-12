var express = require('express'),
	stylus = require('stylus'),
	app = express.createServer(),
    pub = __dirname + '/public',
	views = __dirname + '/views',
	subject = require('./controllers/subject'),
	stacktrace = require('./stacktrace').stacktrace,
    port = process.env.PORT || 8001;

app.use(stylus.middleware({
	src: __dirname + '/public/stylesheets',
	dest: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger({ format: ':date :method :url :status :response-time' }));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'thesecret' }));
app.use(app.router);

// Server error page
process.on('uncaughtException', function(err) {
	for (var prop in err) {
		console.log(prop + ' is ' + err[prop]);
	}
	console.dir(err);
	console.log(stacktrace().join('- \n'));
	res.render('500');
});

app.get('/', subject.list);
app.post('/create', subject.create);
app.get('/:id', subject.read);
app.post('/:id/rate', subject.rate);
app.post('/:id/note', subject.note);
app.post('/:id/invite', subject.invite);
app.get('/:id/archive', subject.archive);
app.get('/:id/delete', subject.delete);

app.listen(port);
