const Post = require('../models/User');

exports.viewCreateScreen = (req, res) => {
	res.render('create-post');
};

exports.create = (req, res) => {
	let post = new Post(req.body);
	post.create()
		.then(function () {
			res.send('new post created');
		})
		.catch(function (err) {
			res.send(err);
		});
};
