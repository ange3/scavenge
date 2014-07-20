Template.main.user_name = function(){
  return Session.get("user");
}

Template.dashboard.user_name = function(){
  return Session.get("user");
}

Template.login.events({
  'click button.login_btn': function(){
    console.log('button clicked');
    var name = document.getElementById('login_username').value;
    if(!name) {
      // alert('Please enter your username.');
      return;
    }
    if(People.find({username: name}).fetch().length === 1){
      console.log("Logged in as returning user.");
    } else {
      console.log("Creating new user.");
      People.insert({username: name});
    }
    Session.set("user", name);
    return false;
  }
});

Template.dashboard.hunts = function(){
  return Hunts.find({}, {sort: {creation_date: -1}});
}

Template.add_task.tasks = function(){
	return Tasks.find({hunt: Session.get("hunt_edit")});
}

Template.dashboard.creating_hunt = function() {
	return Session.get("creating_hunt");
}

Template.content.editing_hunt = function() {
	return Session.get("hunt_edit");
}

Template.hunt_edit.hunt_name = function() {
	return Session.get("hunt_edit");
}

Template.hunt_edit.hunt_location = function() {
	var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
	if (!hunt) return "";
	return hunt.location;
}

Template.dashboard.events({
  'click button.edit_hunt' : function(){
    console.log("editing a hunt");
    // console.log(this);
    Session.set("hunt_edit", this.name);
    Session.set("hunt_location", this.location);
    return false;
  },
  'click button.new_hunt' : function() {
  	console.log("create new hunt");
  	Session.set("creating_hunt", 1);
  	return false;
  },
  'click button.insert_hunt' : function() {
  	var hunt_name = document.getElementById("hunt_name_input").value;
  	// console.log("Insering hunt");
  	Session.set("creating_hunt", 0);
  	if (hunt_name) Hunts.insert({name: hunt_name, owner: Session.get("user"), creation_date: new Date()});
  	return false;
  }
});

Template.hunt_edit.events({
	'click button.add_location_button' : function() {
		var loc = document.getElementById("hunt_location_input").value;
		if (loc) {
			console.log(loc);
			var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
			Hunts.update(hunt._id, {$set: {location: loc}});
		}
		return false;
	},
	'click button.edit_location_button' : function() {
		var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
		Hunts.update(hunt._id, {$set: {location: ""}});
		return false;
	},
	'load div#edit_hunt_map_canvas' : function() {
		console.log("map");
	}
});


Template.add_task.events({
	'click button.add_task_button' : function() {
		var task_name = document.getElementById("add_task_input");
		var task_points = document.getElementById("add_task_points");
		if (task_name && task_points) {
			Tasks.insert({name: task_name.value, 
										hunt: Session.get("hunt_edit"),
										points: task_points.value
									});
			task_name.value = "";
			task_points.value = "";
		}
		return false;
	}
});
