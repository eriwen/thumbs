var express = require('express'),
	app = express.createServer(),
    pub = __dirname + '/public',
	subject = require('./models/subject'),
	// vote = require('./models/vote'),
	site = require('./site'),
    port = process.env.PORT || 8001;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(require('stylus').middleware(pub));
app.use(express.logger());
// NOTE: must include there here and NOT in app.config or req.body will always be undefined!
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/', site.index);

app.all('/subjects', subject.list);
app.all('/subject/:id/:op?', subject.load);
app.get('/subject/:id', subject.read);
app.get('/subject/:id/read', subject.read);
app.post('/subject/:id/create', subject.create);
app.get('/subject/:id/update', subject.edit);
app.put('/subject/:id/update', subject.update);
app.del('/subject/:id/delete', subject.delete);

// app.post('/vote/:id/create', vote.create);

app.listen(port);
