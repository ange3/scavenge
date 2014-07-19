Hunts = new Meteor.Collection("hunts");

Hunts.allow({
	insert: function() {
		return true;
	}

	update: function() {
		return true;
	}

	remove: function() {
		return true;
	}

	get: function() {
		return true;
	}
});

createHunt = function(options) {
	var id = options._id || Random.id();
	Hunts.insert({
		_id : id
		// owner : 
	});
};