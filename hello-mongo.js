//get MongoDb Connection
var mongo = require('mongoose');
mongo.connect('mongodb://localhost/test');

var db = mongo.connection;

db.on('error' , console.error.bind(console , 'connection error:'));
db.once('open' , function callback(){
	var kittySchema = mongo.Schema({
		name : String
	});

	kittySchema.methods.speak = function(){
		var greeting = this.name
		? "Meow name is : " + this.name
		: "I don't have a name";
		console.log(greeting);
	};

	var Kitten = mongo.model('Kitten' , kittySchema);
	
	var fluffy = new Kitten({name : 'fluffy'});
	fluffy.speak(); //print "Meow name is fluffy"
	
	fluffy.save(function(err , fluffy){
		if(err){
			throw err;
		}
	});
	
	Kitten.find(function(err , kittens){
		if(err){
			throw err;
		}
		console.log(kittens);
	});

});
