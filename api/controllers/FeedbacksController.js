/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing Feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function(req, res) {
		var links = req.body.links || [];
		var images = req.body.images || [];

		Feedbacks.create(req.body || {}).exec(function(err, model) {
			if (err) {
				console.log(err.message);
				if (err || !model) return res.badRequest('Save feedback error');
			}

			images.feedback_post = model.alias;
			FeedbackImage.create(images).exec(function(err, model) {
				if (err) {
					console.log(err.message);
					if (err || !model) return res.badRequest('Save images error');
				}
			});

			links.feedback_post = model.alias;
			FeedbackLink.create(images).exec(function(err, model) {
				if (err) {
					console.log(err.message);
					if (err || !model) return res.badRequest('Save links error');
				}
			});

			console.log("Saved ", model);
			return res.ok(model);
		})
	},

	find: function(req, res) {
		Feedbacks.find().populate('images').populate('links').populate('author').exec(function(err, model) {
			if (err) {
				console.log(err);
				if (err || !model) return res.json(404, {});
			}

			if (Array.isArray(model)) {
				model.map(function(row) {
					if (row.hiddenInfo) row.author = {};

					return row;
				})
			}

			if (model && model.hiddenInfo == true) {
				model.author = {};
			}

			return res.json(model);
		});
	},

	findOne: function(req, res) {
		var id = req.params.id;
		Feedbacks.findOne(id).populate('images').populate('links').populate('author').exec(function(err, model) {
			if (err) {
				console.log(err);
				if (err || !model) return res.json(404, {});
			}

			if (model && model.hiddenInfo) {
				model.author = {};
			}

			return res.json(model);
		});
	},

	comment: function(req, res) {

	},

	findFromAlias: function(req, res) {
		console.log(this);
		var _alias = req.params.id || '';
		Feedbacks.findOne({alias: _alias}, function(err, model) {
			if (err || !model) return res.json(404, {});
			
			return res.json(model);
		});
	},

	lite: function(req, res) {
		Feedbacks.find({}, function(err, models) {
			if (err || !models) return res.json(401, []);
			
			return res.json(models);
		});
	},
};

