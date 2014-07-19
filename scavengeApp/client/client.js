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