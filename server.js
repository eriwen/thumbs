var express = require('express'),
	stylus = require('stylus'),
	app = express.createServer(),
    pub = __dirname + '/public',
	views = __dirname + '/views',
	subject = require('./controllers/subject'),
	site = require('./site'),
    port = process.env.PORT || 8001;

app.use(stylus.middleware({
	src: __dirname + '/views',
	dest: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger({ format: ':method :url :status' }));
// NOTE: must include there here and NOT in app.config or req.body will always be undefined!
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'thesecret' }));
// app.use(express.compiler({ src: __dirname + '/views', enable: ['stylus'] }));
app.use(app.router);

// Server error page
app.error(function(err, req, res){
	console.dir(err);
	res.render('500');
});

app.get('/', site.index);

app.all('/subject', subject.list);
app.post('/subject/create', subject.create);
app.get('/subject/:id', subject.read);
/*app.get('/subject/:id/update', subject.edit);
app.post('/subject/:id/update', subject.update);
app.del('/subject/:id', subject.delete);
*/

app.listen(port);
