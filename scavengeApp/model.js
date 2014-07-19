Hunts = new Meteor.Collection("hunts");

// Hunts.allow({
// 	insert: function(name, owner_id, start_location) {

// 	}

// 	update: function() {

// 	}
// });

createHunt = function(options) {
	var id = options._id || Random.id();
	Hunts.insert({
		_id : id
		// owner : 
	});
};