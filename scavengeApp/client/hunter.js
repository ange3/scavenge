Template.hunter.events({
	'click button.hunt_id_submit' : function() {
		var hunt_name = document.getElementById("hunt_name_input").value;
		var hunt = Hunts.findOne({name : hunt_name});
		console.log(hunt);
		if (hunt) {
			Session.set("viewing_hunt", hunt._id);
			var hunt_id = hunt._id;
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
				var to_set = {};
				to_set[hunt_id] = 0;
				PlayerHuntTaskNumberMaps.update(phtnm._id, {$set: to_set});
			}
			console.log(hunt_id, phtnm);
			var h_id = hunt._id;
			var ptaskmap = PlayerTaskStatusMaps.findOne({user_id : player._id});
			// console.log(task_num);
			// console.log(Tasks.find({hunt_id : h_id}).fetch());
			var task_list = Tasks.find({hunt_id : h_id}).fetch();
			if (task_list.length === 0) return false;
			var task = [task_num];
			var status = ptaskmap[task._id];
			if (!status) {
				var to_set = {};
				to_set[hunt_id] = 0;
				status = 0;
				ptaskmap[task._id] = 0;
				PlayerTaskStatusMaps.update(ptaskmap._id, {$set : to_set});
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
		// PlayerAnswerMaps.update();
		var user_name = Session.get("user");
		var user_id = People.findOne({username: user_name})._id;
		var hunt_id = Session.get("viewing_hunt");
		var task_list = Tasks.find({hunt_id: hunt_id}).fetch();
		var numberMap = PlayerHuntTaskNumberMaps.findOne({user_id: user_id});
		var taskNumber = numberMap[hunt_id];
		var task = task_list[taskNumber];
		// console.log(task);

		var correct_answer = task.answer;
		var user_answer = document.getElementById("hunt_answer_input").value;
		if (!user_answer) return false;
		if (user_answer !== correct_answer) {
			alert("Incorrect");
			return false;
		}
		alert("Correct!");
		var phunttaskmap = PlayerHuntTaskNumberMaps.find({user_id : user_id});
		var to_set = {};

		to_set[phunttaskmap.user_id][hunt_id] = phunttaskmap[hunt_id] + 1;
		PlayerHuntTaskNumberMaps.update(phunttaskmap._id, {$set: to_set});
		console.log(PlayerHuntTaskNumberMaps.findOne({user_id : user_id}));
		// phunttaskmap[hunt_id]++;
		
		// console.log(user_id);
		// console.log(taskNumber);

		return true;
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

next_task_in_hunt = function(hunt_id, uid) {
	console.log(uid, hunt_id);
	var task_list = Tasks.find({hunt_id : hunt_id}).fetch();
	var task_num = PlayerHuntTaskNumberMaps.findOne({user_id : uid})[hunt_id];
	console.log(PlayerHuntTaskNumberMaps.findOne({user_id : uid}));
	if (task_list.length > task_num) return task_list[task_num];
	console.log(task_list.length, task_num);
	return task_list[task_list.length -1];
}

Template.player_hunt_view.task_name = function() {
	var hunt = Session.get("viewing_hunt");
	var user_id = People.findOne({username : Session.get("user")})._id;
	// console.log(user_id);
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return next_task_in_hunt(Session.get("viewing_hunt"), user_id).name;
}

Template.player_hunt_view.task_description = function() {
	var hunt = Session.get("viewing_hunt");
	var user_id = People.findOne({username : Session.get("user")})._id;
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return next_task_in_hunt(Session.get("viewing_hunt"), user_id).description;
}

Template.player_hunt_view.task_question = function() {
	var hunt = Session.get("viewing_hunt");
	var user_id = People.findOne({username : Session.get("user")})._id;
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return next_task_in_hunt(Session.get("viewing_hunt"), user_id).question;
}

Template.player_hunt_view.task_location = function() {
	var hunt = Session.get("viewing_hunt");
	var user_id = People.findOne({username : Session.get("user")})._id;
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return next_task_in_hunt(Session.get("viewing_hunt"), user_id).location;
}

Template.player_hunt_view.task_points = function() {
	var hunt = Session.get("viewing_hunt");
	var user_id = People.findOne({username : Session.get("user")})._id;
	if (!hunt || !first_task_in_hunt(hunt)) return "";
	return next_task_in_hunt(Session.get("viewing_hunt"), user_id).points;
}










