Template.postSubmit.created = function() {
	Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.postSubmit.events({
	'submit form': function(e, templ) {
		e.preventDefault();

		var post = {
			url: templ.find('input[name=url]').value,
			title: templ.find('input[name=title]').value
		};

		var errors = validatePost(post);
		if (errors.title || errors.url) {
			return Session.set('postSubmitErrors', errors);
		}

		Meteor.call('postInsert', post, function(error, result) {
			if (error) {
				Errors.throw(error.reason);
			}

			if (result.postExists) {
				throwError('This link has already been posted');
			}

			Router.go('postPage', {_id: result._id});
		});
	}
});