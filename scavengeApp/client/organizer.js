Template.navBar.events({
	'click .organizer_view': function(){
		console.log('organizer view!');
		Session.set("organizer_true", 1);
		Session.set("viewing_hunt", 0);
	},
	'click .hunter_view': function(){
		console.log('hunter view!');
		Session.set("organizer_true", 0);
		Session.set("viewing_hunt", 0);
	},

});