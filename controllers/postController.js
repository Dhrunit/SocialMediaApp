const Post = require('../models/Post');

exports.viewCreateScreen = (req, res) => {
	res.render('create-post');
};

exports.create = (req, res) => {
	let post = new Post(req.body, req.session.user._id);
	post.create()
		.then(function () {
			res.send('new post created');
		})
		.catch(function (err) {
			res.send(err);
		});
};

exports.viewSingle = (req, res) => {
	res.render('single-post-screen');
};
