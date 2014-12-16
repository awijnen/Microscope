if (Posts.find().count() === 0) {
	var now = new Date().getTime();

	// create two users
	var anthonyId = Meteor.users.insert({
		profile: {name: 'Anthony Wijnen'}
	});
	var anthony = Meteor.users.findOne(anthonyId);
	var celineId = Meteor.users.insert({
		profile: {name: 'Celine Loots'}
	});
	var celine = Meteor.users.findOne(celineId);

	var telescopeId = Posts.insert({
		title: 'Introducing Telescope',
		userId: anthony._id,
		author: anthony.profile.name,
		url: 'http://sachagreof.com/introducing-telescope',
		submitted: new Date(now - 7 * 3600 * 1000),
		commentsCount: 2
	});

	Comments.insert({
		postId: telescopeId,
		userId: celine._id,
		author: celine.profile.name,
		submitted: new Date(now - 5 * 3600 * 100),
		body: 'Interesting project Anthony, can I get involved?'
	});

	Comments.insert({
		postId: telescopeId,
		userId: anthony._id,
		author: anthony.profile.name,
		submitted: new Date(now - 3 * 3600 * 100),
		body: 'You sure can Celine!'
	});

	Posts.insert({
		title: 'Meteor',
		userId: anthony._id,
		author: anthony.profile.name,
		url: 'http://meteor.com',
		submitted: new Date(now - 10 * 3600 * 1000),
		commentsCount: 0
	});

	Posts.insert({
		title: 'The Meteor Book',
		userId: anthony._id,
		author: anthony.profile.name,
		url: 'http://themeteorbook.com',
		submitted: new Date(now - 12 * 3600 * 1000),
		commentsCount: 0
	});
}