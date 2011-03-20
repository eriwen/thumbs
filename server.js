var express = require('express'),
    pub = __dirname + '/public',
    port = process.env.PORT || 8001;

var Subject = require('./models/subject').Subject;
var subject = new Subject();

var app = express.createServer();
app.get('/', function(req, res) {
    subject.findAll(function(error, subjects) {
        res.render('index', {
            locals: {
                pageTitle: 'Quorum',
                subjects: subjects
            }
        });
    });
});

app.get('/subject/:id', function(req, res, next) {
	subject.findById(req.params.id, function(err, subject) {
		if (err) return next(err);
		res.render('subject', {
			locals: {
				subject: subject
			}
		});
		
	});
});

app.post('/subject/new', function(req, res) {
	console.log('this: ' + require('sys').inspect(this));
	subject.save({
		name: 'Billy Bob',
		rating: 3.7
	}, function(error, subjects) {
		res.redirect('/subject/1');
	});
});

app.configure(function() {
    app.use(require('stylus').middleware(pub));
    app.use(express.logger());
	// For POST requests
	app.use(express.bodyParser());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(pub));
    app.set('view options', { scope: { development: true }});
});

// Joyent smartmachines setup as production by default
app.configure('production', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(pub));
    app.set('view options', { scope: { development: true }});
});

app.listen(port);