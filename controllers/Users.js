const Models = require('../models/index');
cryptoPass = require("../utils/cryptoPasswords");
jwt = require('jsonwebtoken');
const secretkey = "^#@23&*#@!#@&^0K3)NJ}";

module.exports = {
  login: async function (req, res) {
	console.log("??",req.body );
	let { email, password } = _.pick(req.body, ['email', 'password']);
	email = email.toLowerCase();
	try {
		let user = await Models.User.findOne({ email: email });
		if(!user){
            return res.status(401).json({
                result: 'error',
                message: "User not found in the database",
            });
		}
		const passwordMatched = cryptoPass.validatePassword(password,user.password);
		if (passwordMatched === false ) {
			return res.status(401).json({
				result: 'error',
				message: "Invalid Login credentials, please check and try again",
			});
		}
		const secret = secretkey + user.password;
		const token = jwt.sign({
			id: user.id,
			email: user.email
		}, secret, {
			expiresIn: '30d'
		});
		return res.status(200).json({ result: 'success', token: token, user: user })
	} catch (err) {
			return res.status(400).json({ result: 'error', message: "Error while finding the user in DB" })
		}
	},
	signUp: async function (req, res) {
		let userObj = _.pick(req.body, [
			'email',
			'password',
			'firstName',
			'lastName',
			'isAdmin'
		]);
		console.log("??? -  ",userObj );
        userObj.password = cryptoPass.saltHashPassword(userObj.password);
        try {
			console.log("the password is",userObj )
			let user = await Models.User.create(userObj);
			console.log("user",user)
            res.status(200).json(user);
		} catch(error){
            return res.status(500).json({ result: error, message: "DB Error while creating user" })
		}
	}
};