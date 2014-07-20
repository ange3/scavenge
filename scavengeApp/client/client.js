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

Template.add_task.creating_task = function() {
	return Session.get("creating_task");
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
});

init_map_from_address = function(address, map_id, map, zoom_level) {
	var geocoder = new google.maps.Geocoder();
	var results = null;
	var status = null;
	var map_options = null;
	geocoder.geocode({'address' : address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location['k'];
			var lng = results[0].geometry.location['B'];

			var latlng = new google.maps.LatLng(lat, lng);
			map_options = {
				zoom: zoom_level,
				center: latlng
			};
			map = new google.maps.Map(
				document.getElementById(map_id),
				map_options
			);
		}
	});

}

Template.hunt_edit.rendered = function() {
	var address = "760 Market Street, San Francisco, CA";
	var options_key = "edit_hunt_map_options";
	var map_id = "edit_hunt_map_canvas";
	var zoom = 16;
	var edit_hunt_map = null;

	var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  };
	init_map_from_address(address, map_id, edit_hunt_map, zoom);
}


Template.add_task.events({
	'click button.add_task_button' : function() {
		var task_name = document.getElementById("add_task_input");
		var task_points = document.getElementById("add_task_points");
		var task_location = document.getElementById("add_task_location");
		var task_question = document.getElementById("add_task_question");
		var task_answer = document.getElementById("add_task_answer");
		
		if (task_name.value && task_points.value && task_location.value) {
			Tasks.insert({name: task_name.value, 
										hunt: Session.get("hunt_edit"),
										points: task_points.value,
										location: task_location.value,
										question: task_question.value,
										answer: task_answer.value
									});
			task_name.value = "";
			task_points.value = "";
			task_location.value = "";
			task_question.value = "";
			task_answer.value = "";
		}
		Session.set("creating_task", 0);
		return false;
	},
	'click button.new_task_button' : function() {
		console.log("creating task");
  	Session.set("creating_task", 1);
  	return false;
  },
  'click button.delete_task' : function() {
  	Tasks.remove(this._id);
  }
});
