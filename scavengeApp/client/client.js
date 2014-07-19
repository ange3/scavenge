Template.main.user_id = function(){
	return false;

}

Template.content.name = function(){

}

Template.login.events({

	'click button.login_btn': function(){
		console.log('button clicked');
		var name = document.getElementById('login_username').value;
		console.log(name);
		if(name){
			if(Meteor.users.findOne({username: name})){
				console.log("Logged in as returning user.");
			} else {
				console.log("Creating new user.");
				Meteor.users.insert({username: name});
			}
		} else {
			console.log('type something');
		}
	}

});