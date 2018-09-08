define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojrouter', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojcheckboxset'], function(oj, ko, $, app) {
	function SigninViewModel() {
		var self = this;

		var storage = window.localStorage;

		self.userName = ko.observable(storage.getItem('username'));
		self.password = ko.observable(storage.getItem('password'));

		self.rememberUserName = ko.observable(['remember']);
		self.notification = ko.observable();

		self.signIn = function() {
			
			if (self.rememberUserName()[0] == 'remember') {
				storage.setItem('username', self.userName());
				storage.setItem('password', self.password());
			} else {
				storage.removeItem('username');
				storage.removeItem('password');
			}
			app.user = {
				username : self.userName()
			}
			oj.Router.rootInstance.go('profile');

		};

	}
	return SigninViewModel;
});