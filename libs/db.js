var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db('postdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'postdb' database");
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    var model = req.params.model.toString();
    console.log('Retrieving ' + model + ': ' + id);
    db.collection(model, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.find = function(req, res) {
    var model = req.params.model.toString();
	console.log('Getting all posts');
    db.collection(model, function(err, collection) {
        collection.find().toArray(function(err, items) {
        	res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var post = req.body;
    var model = req.params.model.toString();
    console.log('Adding ' + model + ': ' + JSON.stringify(post));
    db.collection(model, function(err, collection) {
        collection.insert(post, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var post = req.body;
    var model = req.params.model.toString();
    console.log('Updating ' + model + ': ' + id);
    console.log(JSON.stringify(post));
    db.collection(model, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating ' + model + ': ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' ' + model + '(s) updated');
                res.send(post);
            }
        });
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    var model = req.params.model.toString();
    console.log('Deleting ' + model + ': ' + id);
    db.collection(model, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' ' + model + '(s) deleted');
                res.send(req.body);
            }
        });
    });
}