Hunts = new Meteor.Collection("hunts");

People = new Meteor.Collection("people");

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
