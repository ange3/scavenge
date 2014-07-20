Hunts = new Meteor.Collection("hunts");

// Schema
// name:
// owner:

People = new Meteor.Collection("people");

// map hunt id to score
PlayerScoreMaps = new Meteor.Collection("player_score_maps");
// map task to 0,1,2
PlayerTaskStatusMaps = new Meteor.Collection("player_task_maps");
// map hunt to task number
PlayerHuntTaskNumberMaps = new Meteor.Collection("player_hunt_task_number_maps");
// map player to answer
PlayerAnswerMaps = new Meteor.Collection("player_answer_maps");



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


