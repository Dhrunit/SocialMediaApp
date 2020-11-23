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

exports.viewSingle = async function (req, res) {
	try {
		let post = await Post.findSingleById(req.params.id, req.visitorId);
		console.log(post);
		res.render('single-post-screen', { post: post });
	} catch (error) {
		res.render('404');
	}
};

exports.viewEditScreen = async function (req, res) {
	try {
		let post = await Post.findSingleById(req.params.id);
		res.render('edit-post', {
			post,
		});
	} catch (error) {
		res.render('404');
	}
};

exports.edit = async function (req, res) {
	let post = new Post(req.body, req.visitorId, req.params.id);
	post.update()
		.then((status) => {
			// The post was succesfully updated
			// or some validation errors
			if (status == 'success') {
				// Post was Updated
				req.flash('success', 'Post successfully Updated');
				req.session.save(() => {
					res.redirect(`/post/${req.params.id}` / edit);
				});
			} else {
				post.errors.forEach((error) => {
					req.flash('errors', error);
				});
			}
			req.session.save(() => {
				res.redirect(`/post/${req.params.id}/edit`);
			});
		})
		.catch(() => {
			// a post with requested id does not exist
			// or if the current visitor is not the owner of the requested post
			req.flash(
				'errors',
				'You do not have the permission to perform that action '
			);
			req.session.save(() => {
				res.redirect('/');
			});
		});
};
