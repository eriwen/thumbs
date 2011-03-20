var express = require('express'),
     pub = __dirname + '/public',
     port = process.env.PORT || 8001;

var Subject = require('./models/subject').Subject;
var subject = new Subject();

var app = express.createServer();
app.get('/', function(req, res) {
     subject.findAll(function(error, subjects) {
          res.render('index', {
               layout: false,
               locals: {
                    pageTitle: 'Do we have a quorum?',
                    subjects: subjects
               }
          });
     });
     response.end();
     res.render('index');
});
app.listen(port);

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

app.listen(process.env.PORT || 8001);