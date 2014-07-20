Hunts = new Meteor.Collection("hunts");

// Schema
// name:
// owner:

People = new Meteor.Collection("people");

Tasks = new Meteor.Collection("tasks");

Hunts.allow({
	insert: function() {
		return true;
	}, 
	update: function() {
		return true;
	}, 
	remove: function() {
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


