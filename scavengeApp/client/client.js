Template.main.user_name = function(){
  return Session.get("user");
}

// Log in Page

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
      var uid = People.insert({username: name});
      PlayerScoreMaps.insert({user_id: uid});
      PlayerTaskStatusMaps.insert({user_id: uid});
      PlayerHuntTaskNumberMaps.insert({user_id: uid});
      PlayerAnswerMaps.insert({user_id: uid});
    }
    Session.set("user", name);
    var uname = name;
    return false;
  }
});

// Nav Bar
Template.navBar.user_name = function(){
  return Session.get("user");
}

Template.navBar.events({
  'click button.logout_button' : function() {
    for (key in Session.keys) {
      Session.set(key, "");
    }
    return true;
  }
});



Template.content.editing_hunt = function() {
	return Session.get("hunt_edit");
}

Template.content.organizer = function(){
  return Session.get("organizer_true");
}


// Organizer Dashboard Page (list of hunts)

Template.dashboard.hunts = function(){
  return Hunts.find({owner: Session.get("user")}, {sort: {creation_date: -1}});
}

Template.dashboard.creating_hunt = function() {
  return Session.get("creating_hunt");
}

Template.dashboard.creating_hunt = function() {
  return Session.get("creating_hunt");
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
  'click button.observe_hunt' : function(){
    console.log("observing a hunt");
    // console.log(this);
    Session.set("hunt_edit", this.name);
    Session.set("hunt_location", this.location);

    return false;
  },

});

// Leaderboard
Template.leaderboard.players= function(){
  var hunt_id = Hunts.find({name: Session.get("hunt_edit")}).fetch()[0]._id;
  var scoreMaps = PlayerScoreMaps.find({}).fetch();
  for (var i = 0; i < scoreMaps.length; i++) {
    var player = {};
    var map = scoreMaps[i];
    var user_id = map["user_id"];
    player["name"] = People.findOne({_id: user_id}).name;
    player["score"] = map[hunt_id];
  }
  var players = [];
}



// Editing Hunt Page

Template.add_task.tasks = function(){
  return Tasks.find({hunt: Session.get("hunt_edit")}, {sort: {creation_date: -1}});
}

Template.add_task.creating_task = function() {
  return Session.get("creating_task");
}

Template.add_task.editing_task = function() {
  return Session.get("editing_task")==this._id;
}

Template.hunt_edit.hunt_description = function() {
  var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
  if (!hunt) return "";
  return hunt.description;
}
Template.hunt_edit.hunt_name = function() {
  return Session.get("hunt_edit");
}

Template.hunt_edit.hunt_location = function() {
  var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
  if (!hunt) return "";
  return hunt.location;
}

Template.hunt_edit.events({
	'click button.add_location_button' : function() {
		var loc = document.getElementById("hunt_location_input").value;
		if (loc) {
			console.log(loc);
			var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
			Hunts.update(hunt._id, {$set: {location: loc}});
      Session.set("hunt_location", loc);
      load_map();
		}
		return false;
	},
	'click button.edit_location_button' : function() {
		var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
		Hunts.update(hunt._id, {$set: {location: ""}});
    Session.set("hunt_location", hunt);
    load_map();
		return false;
	},
	'click button.add_description_button' : function() {
		var descr = document.getElementById("hunt_description_input").value;
		if (descr) {
			var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
			console.log(descr);
			Hunts.update(hunt._id, {$set: {description: descr}});
		}
		return false;
	},
	'click button.edit_description_button' : function() {
		var hunt = Hunts.findOne({name: Session.get("hunt_edit")});
		Hunts.update(hunt._id, {$set: {description: ""}});
		return false;
	},
});

// Errors in Edit Hunt page
Template.new_task.error = function(){
  console.log(Session.get("error"));
  return Session.get("error");
}

Template.edit_task.error = function(){
  console.log(Session.get("error"));
  return Session.get("error");
}

Template.error_message.error = function(){
  return Session.get("error");
}


// Task list in Edit Hunt page

Template.add_task.events({
	'click button.add_task_button' : function() {
		var task_name = document.getElementById("add_task_input");
		var task_points = document.getElementById("add_task_points");
		var task_location = document.getElementById("add_task_location");
		var task_question = document.getElementById("add_task_question");
		var task_answer = document.getElementById("add_task_answer");

		
		if (task_name.value && task_points.value && task_location.value && task_question.value && task_answer.value) {
			Tasks.insert({name: task_name.value, 
										hunt: Session.get("hunt_edit"),
										points: task_points.value,
										location: task_location.value,
										question: task_question.value,
										answer: task_answer.value,
                    creation_date: new Date(),
										hunt_id: Hunts.find({name: Session.get("hunt_edit")}).fetch()[0]._id

									});
			task_name.value = "";
			task_points.value = "";
			task_location.value = "";
			task_question.value = "";
			task_answer.value = "";

      Session.set("error", null);
      Session.set("creating_task", 0);
		} else {
      console.log("Error - empty fields.")
      Session.set("error", "Please fill in all the required fields.")
    }
		return false;
	},
  
	'click button.new_task_button' : function() {
		console.log("creating task");
  	Session.set("creating_task", 1);
  	return false;
  },
  'click button.cancel-new-task' : function(){
    Session.set("creating_task", 0);
    Session.set("error", null)
    return false;
  },
  'click button.delete_task' : function() {
  	Tasks.remove(this._id);
  	return false;
  },
  'click button.edit_task_button' : function() {
  	Session.set("editing_task", this._id);
  	return false;
  },
  'click button.cancel-edit-task' : function(){
    Session.set("editing_task", 0);
    Session.set("error", null);
    return false;
  },
  'click button.submit_edit_task_button' : function() {
  	var id = Session.get("editing_task");
		var task_name = document.getElementById("edit_task_input").value;
		var task_points = document.getElementById("edit_task_points").value;
		var task_location = document.getElementById("edit_task_location").value;
		var task_question = document.getElementById("edit_task_question").value;
		var task_answer = document.getElementById("edit_task_answer").value;

    if (task_name === "" || task_points === "" || task_location === "" || task_question === "" || task_answer === ""){
      Session.set("error", "Please fill in all the fields.");
      console.log("FIELDS ERROR");
    } else {
      if (task_name) Tasks.update(id, {$set: {name: task_name}});
      if (task_points) Tasks.update(id, {$set: {points: task_points}});
      if (task_location) Tasks.update(id, {$set: {location: task_location}});
      if (task_question) Tasks.update(id, {$set: {question: task_question}});
      if (task_answer) Tasks.update(id, {$set: {answer: task_answer}});

      Session.set("editing_task", 0);
      Session.set("error", null)
    }
		
		return false;
	},
});


// Map in Edit Hunt page


var map;
var markerArray = [];

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

var add_markers = function() {
  var tasks = Tasks.find({hunt: Session.get("hunt_edit")}, {sort: {creation_date: -1}}).fetch();
  for (var i = 0; i < tasks.length; i++){
    console.log(tasks[i].location);
    var marker_loc = getLatLng(tasks[i].location, tasks[i].name);
  }
  console.log(markerArray);
  for (var i = 0; i<markerArray.length; i++){
    markerArray[i].setMap(map);
  }
};

var load_map = function() {
  var address = Session.get("hunt_location");
  if (!address){ 
    address = "760 Market Street, San Francisco, CA";
  }
  var options_key = "edit_hunt_map_options";
  var map_id = "edit_hunt_map_canvas";
  var zoom = 14;
  var edit_hunt_map = map;

  init_map_from_address(address, map_id, edit_hunt_map, zoom);
  // setInterval(function(){
    add_markers();
  // }, 5000);
  
};

var getLatLng = function(location, marker_name) {
  var geocoder = new google.maps.Geocoder();
  var results = null;
  var status = null;
  geocoder.geocode({'address' : location}, function(results, status) {
    console.log('starting geocoder');
    if (status == google.maps.GeocoderStatus.OK) {
      console.log('geocoder status OK');
      var lat = results[0].geometry.location['k'];
      var lng = results[0].geometry.location['B'];
      console.log(lat);
      console.log(lng);

      var latlng = new google.maps.LatLng(lat, lng);

      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: marker_name
      })
      console.log('made a marker!');
      marker.setMap(map);
      markerArray.push(marker);
      // google.maps.event.trigger(map, 'resize');
      return latlng;
    } else {
      console.log("geocoder status NOT OK");
      return null;
    }
  });
};


Template.hunt_edit.rendered = function() {
  load_map();
  google.maps.event.addDomListener(window, 'load', load_map);
}
