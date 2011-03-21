var express = require('express'),
	stylus = require('stylus'),
	app = express.createServer(),
    pub = __dirname + '/public',
	views = __dirname + '/views',
	subject = require('./models/subject'),
	// note = require('./models/note'),
	site = require('./site'),
    port = process.env.PORT || 8001;

function compileCss(str, path, compress, fn) {
	stylus(str).set('filename', path).set('compress', compress).render(fn);
}

app.use(stylus.middleware({src: pub + '/stylesheets', dest: pub, compile: compileCss}));
app.set('views', views);
app.set('view engine', 'jade');
app.use(express.logger());
// NOTE: must include there here and NOT in app.config or req.body will always be undefined!
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/', site.index);

app.all('/subject', subject.list);
app.all('/subject/:id/:op?', subject.load);
app.get('/subject/:id', subject.read);
app.get('/subject/:id/read', subject.read);
app.put('/subject/:id/create', subject.create);
app.get('/subject/:id/update', subject.edit);
app.post('/subject/:id/update', subject.update);
app.get('/subject/:id/delete', subject.delete);

// app.put('/note/:id/create', vote.create);

app.listen(port);
