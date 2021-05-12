const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const jwtSecret = "sdghjak82374ihury83yr3yr2u3h"
const User = require('../models/user')

const signin = (req, res) => {
	User.find(
	{username: req.body.username}, 
	(err, users) => {
		let user = users[0]
		console.log("user" + user)
		if (err || !user) {
			res.status("401").json({
				error: "Incorrect username"
			})
		}
		else if (!req.body.password || user.password != req.body.password) {
			res.status("401").json({
				error: "Incorrect password"
			})
		} else {
			const token = jwt.sign(
				{
					_id : user._id
				},
				jwtSecret
			);
			res.cookie ("cookie", token, {
				expire: new Date() + 999
			});
			res.json({
				token,
				user: {_id: user._id, username: user.username}
			});
		}
	})
}

const signout = (req, res) => {
    res.clearCookie("cookie");
    return res.status("200").json({
      message: "signed out"
    });
  };

const requireSignin = expressJwt({
	secret: jwtSecret,
	requestProperty: "auth",
	algorithms: ['HS256']
});
  
const hasAuthorization = (req, res, next) => {
	const authorized = req.auth && req.body._id == req.auth._id;
	console.log(req.body)
	console.log(req.auth)
	if (!authorized) {
		return res.status("403").json({
		error: "User is not authorized"
		});
	} else {
		res.status(200).json({message: "User is authorized"})
	}
};
  
module.exports = {signin, signout, requireSignin, hasAuthorization};