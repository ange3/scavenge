Template.navBar.events({
	'click .organizer_view': function(){
		console.log('organizer view!');
		Session.set("organizer_true", 1);
		Session.set("hunt_edit", 0);
	},
	'click .hunter_view': function(){
		console.log('hunter view!');
		Session.set("organizer_true", 0);
	},

});