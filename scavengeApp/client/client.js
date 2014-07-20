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
  return Hunts.find({});
}

Template.hunt.creating_hunt = function() {
	return Session.get("creating_hunt");
}

Template.content.editing_hunt = function() {
	return Session.get("hunt_edit");
}

Template.hunt_edit.hunt_name = function() {
	return Session.get("hunt_edit");
}

Template.dashboard.events({
  'click button.edit_hunt' : function(){
    console.log("editing a hunt");
    // console.log(this);
    Session.set("hunt_edit", this.name);
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
