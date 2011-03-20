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
    res.end();
});

app.post('/subject/new', function(req, res) {
	subject.save({
		name: this.param('name'),
		rating: 3.7
	}, function(error, subjects) {
		res.redirect('/')
	});
});

// TODO: get subject by id

app.configure(function() {
    app.use(require('stylus').middleware(pub));
    app.use(express.logger());
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