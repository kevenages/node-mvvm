var express = require('express')
    , database = require('./libs/db')
	, Auth = require('./libs/auth')
	, app = express();

app.configure(function () {
	/* 'default', 'short', 'tiny', 'dev' */
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.get('/', function(req, res, next){
	Auth.username = 'shorty';
	Auth.password = 'Dog1234';
	Auth.session = 'Ruffage';
	res.send(Auth.checkAuth());
});
/**
 * Routing
 */
app.get('/:model', database.find);
app.get('/:model/:id', database.findById);
app.post('/:model', database.add);
app.put('/:model/:id', database.update);
app.delete('/:model/:id', database.delete);

app.listen(3000);
console.log('Listening on port 3000...');