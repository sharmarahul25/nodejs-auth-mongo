Router = require('express').Router();
jwt = require('jsonwebtoken');
Controllers = require('./controllers/index');
const Models = require('./models/index');
const secretkey = "^#@23&*#@!#@&^0K3)NJ}";

ensureAuthentic = function(req,res,next){
	sendErr = function() {
		return res.status(401).json({
			message: 'Authentication Error!'
		});
	};
	const token = req.headers['authorization'];
	const decoded_token = jwt.decode(token);
	if(!decoded_token || !decoded_token.email){
		return sendErr()
	}
	Models.User.findOne({
		email: decoded_token.email,
	}).exec(function(err, user) {
		if (err || !user){
            return sendErr()
		}
		const secret = secretkey + user.password;
		return jwt.verify(token, secret, function(err, decoded) {
			if (err != null) {
               return sendErr();
			}
			req.user = user;
			next();
		});
    });
      
};

Router.post('/login', Controllers.Users.login);
Router.post('/signup', Controllers.Users.signUp);
Router.get('/listItems',ensureAuthentic ,Controllers.Items.listItems);

module.exports = Router;