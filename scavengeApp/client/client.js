Template.main.user_name = function(){
  return Session.get("user");
}

Template.content.user_name = function(){
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

Template.dashboard.events({
  'click button.edit_hunt' : function(){
    console.log("editing a hunt");
    // console.log(this.getAttribute('data-id'));
    console.log(this);
    return false;
  },
  'click button.new_hunt' : function() {
  	console.log("create new hunt");
  	Session.set("creating_hunt", 1);
  	return false;
  },
  'click button.insert_hunt' : function() {
  	var hunt_name = document.getElementById("hunt_name_input").value;
  	if (!hunt_name) return false;
  	console.log("Insering hunt");
  	Session.set("creating_hunt", 0);
  	Hunts.insert({name: hunt_name, owner: Session.get("user"), creation_date: new Date()});
  	return false;
  }
});
