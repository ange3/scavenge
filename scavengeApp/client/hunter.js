Template.hunter.events({
	'click button.hunt_id_submit' : function() {
		var hunt_name = document.getElementById("hunt_name_input").value;
		var hunt = Hunts.findOne({name : hunt_name});
		console.log(hunt);
		if (hunt) {
			Session.set("viewing_hunt", hunt._id);

			var player = People.findOne({username: Session.get("user")});

			var pscoremap = PlayerScoreMaps.findOne({user_id : player._id});
			var curr_score = pscoremap[hunt._id];
			var new_score = (curr_score) ? curr_score : 0;
			var to_set = {};
			to_set[hunt_id] = new_score;
			PlayerScoreMaps.update(pscoremap._id, {$set : to_set});

			var phtnm = PlayerHuntTaskNumberMaps.findOne({user_id : player._id});
			
			var task_num = phtnm[hunt_id];
			if (!task_num) {
				task_num = 0;
				phtnm[hunt_id] = 0;
			}
			var h_id = hunt._id;
			var ptaskmap = PlayerTaskStatusMaps.findOne({user_id : player._id});
			var task = Tasks.find({hunt_id : h_id}).fetch()[task_num];
			var status = ptaskmap[task._id];
			if (!status) {
				status = 0;
				ptaskmap[task._id] = 0;
			}
		}
		return false;
	}
});

Template.player_hunt_view.events({
	'click button.start_hunt' : function() {
		Session.set("hunt_started", 1);
		return false;
	},
	'click button.hunt_answer_submit' : function() {
		PlayerAnswerMaps.update();
		var hunt_id = Session.get("viewing_hunt");
		var task_list = Tasks.find({hunt_id: hunt_id}).fetch();
		var numberMap = PlayerHuntTaskNumberMaps.findOne({user_id: user_id});
		var taskNumber = numberMap[hunt_id];
		var task = task_list[taskNumber];
		console.log(task);


		var user_id = PlayerAnswerMaps.get("user_id");
		
		// console.log(user_id);
		// console.log(taskNumber);

		return false;
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
	var hunt = Session.get("viewing_hunt");
	console.log(hunt, first_task_in_hunt(hunt));
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return first_task_in_hunt(Session.get("viewing_hunt")).name;
}

Template.player_hunt_view.task_description = function() {
	var hunt = Session.get("viewing_hunt");
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return first_task_in_hunt(Session.get("viewing_hunt")).description;
}

Template.player_hunt_view.task_question = function() {
	var hunt = Session.get("viewing_hunt");
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return first_task_in_hunt(Session.get("viewing_hunt")).question;
}

Template.player_hunt_view.task_location = function() {
	var hunt = Session.get("viewing_hunt");
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return first_task_in_hunt(Session.get("viewing_hunt")).location;
}

Template.player_hunt_view.task_points = function() {
	var hunt = Session.get("viewing_hunt");
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return first_task_in_hunt(Session.get("viewing_hunt")).points;
}










