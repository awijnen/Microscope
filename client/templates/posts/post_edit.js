Template.postEdit.created = function() {
	Session.set('postEditErrors', {});
};

Template.postEdit.helpers({
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
});

Template.postEdit.events({
	'submit form': function(e, templ) {
		e.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			url: templ.find('input[name=url]').value,
			title: templ.find('input[name=title]').value
		};

		var errors = validatePost(postProperties);
		if (errors.title || errors.url) {
			return Session.set('postEditErrors', errors);
		}

		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	'click .delete': function(e, templ) {
		e.preventDefault();

		if (confirm("Are you sure you want to delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});