Template.hunter.events({
	'click button.hunt_id_submit' : function() {
		var hunt_id = document.getElementById("hunt_id_input").value;
		var hunt = Hunts.findOne({_id : hunt_id});
		if (hunt) {
			Session.set("viewing_hunt", hunt._id);
		}
	}
});

Template.player_hunt_view.events({
	'click button.start_hunt' : function() {
		console.log('hi');
		Session.set("hunt_started", 1);
	}
});

Template.hunter.viewing_hunt = function() {
	return Session.get("viewing_hunt");
}

Template.player_hunt_view.hunt_started = function() {
	return Session.get("hunt_started");
}

first_task_in_hunt = function(id) {
	return Tasks.find({hunt_id : id}).fetch()[0];
}

Template.player_hunt_view.task_name = function() {
	return first_task_in_hunt(Session.get("viewing_hunt")).name;
}

Template.player_hunt_view.task_description = function() {
	return first_task_in_hunt(Session.get("viewing_hunt")).description;
}

Template.player_hunt_view.task_question = function() {
	return first_task_in_hunt(Session.get("viewing_hunt")).question;
}