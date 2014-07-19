Meteor.startup(function(){
  if (Hunts.find().count() === 0) {
    var maker = "example_owner";
    var hunt_names = ["SF Hunt",
       "Stanford Women in CS Hunt",
       "Palantir Puzzle Hunt"];
    for (var i = 0; i < hunt_names.length; i++){
      Hunts.insert({name: hunt_names[i], owner: maker});
    }
  }
});