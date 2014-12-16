Template.postSubmit.events({
	'submit form': function(e, templ) {
		e.preventDefault();

		var post = {
			url: templ.find('input[name=url]').value,
			title: templ.find('input[name=title]').value
		};

		var result = Meteor.call('postInsert', post, function(error, result) {
			if (error) {
				return alert(error.reason);
			}

			if (result.postExists) {
				alert('This link has already been posted');
			}
		});

		Router.go('postsList');
	}
});