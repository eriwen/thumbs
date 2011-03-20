var express = require('express'),
    pub = __dirname + '/public',
    port = process.env.PORT || 8001;

var Subject = require('./models/subject').Subject;
var subject = new Subject();

var app = express.createServer();
// Here we use the bodyDecoder middleware
// to parse urlencoded request bodies
// which populates req.body
app.use(express.bodyParser());
    
// The methodOverride middleware allows us
// to set a hidden input of _method to an arbitrary
// HTTP method to support app.put(), app.del() etc
app.use(express.methodOverride());

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

app.post('/subject/create', function(req, res) {
	console.log(req.body.name);
	var newSubject = null;
	subject.save([{name: req.body.name, rating: 3.4}], function(error, subject) {
		res.redirect('/');
	});
});

app.configure(function() {
    app.use(require('stylus').middleware(pub));
    app.use(express.logger({ format: ':method :uri' }));
	// For POST requests
	// app.use(express.bodyParser());
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