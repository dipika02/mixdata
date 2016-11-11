var express = require('express'),
	app = express(),
	path = require('path');
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	// config = require('./config/config.js'),
	// ConnectMongo = require('connect-mongo')(session),
	// ConnectMongo = require('connect-mongo')(session),
	// mongoose = require('mongoose').connect(config.dbURL),
	// passport = require('passport'),
	// FacebookStrategy = require('passport-facebook').Strategy

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('hogan-express'));
app.set('view engine','html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
var env = process.env.NODE_ENV || 'development';
// var api = require('./routes/routes')(app, express);
// app.use('/api',api);  

// app.use(express.static(__dirname + '/public'));

// if(env === 'development'){
// 	//dev specific setting
// 	console.log("temp value");
// 	console.log(config.sessionSecret);
// app.use(session({Secret:config.sessionSecret}))
app.use(session({secret:'catscanfly'}));
// 	console.log("temp value5555"+config.sessionSecret);

// app.use(session({
// 	Secret:config.sessionSecret,
// 		store:new ConnectMongo({
// 			// url:config.dbURL,
// 			mongooseConnection:mongoose.connections[0],
// 			stringfy:true

// 		})
// 		}))
// 			console.log("config.dbURL"+config.dbURL)

// } else{
// 	//production specific setting1 
// 	console.log("temp value....1234");
// app.use(session({Secret:config.sessionSecret}))

// app.use(session({
// 	Secret:config.sessionSecret,
// 		store:new ConnectMongo({
// 			// url:config.dbURL,
// 			mongoose_connection:mongoose.mongoose_connection[0],
// 			stringfy:true
// 		})
// 		}))
// }

require('./routes/routes.js')(express,app);
app.listen(8001, function () {
  console.log('ChatApplication Example app listening on port 8001!');
  console.log('Mode: ' + env);
});
