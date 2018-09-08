/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
  function(oj, ko, moduleUtils) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
        'signin': {label: 'Sign In', isDefault: true},
        'profile': {label: 'Profile', canEnter: authenticate},
        'match': {label: 'Match', canEnter: hasProfile}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.moduleConfig = ko.observable({'view':[], 'viewModel':null});

      self.loadModule = function() {
        ko.computed(function() {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({'viewPath':viewPath}),
            moduleUtils.createViewModel({'viewModelPath':modelPath})
          ]);
          masterPromise.then(
            function(values){
              self.moduleConfig({'view':values[0],'viewModel':values[1]});
            }
          );
        });
      };

      self.profile = undefined;

      function hasProfile () {
        if (!authenticate()) return false;
        if (self.profile == undefined) return false;
        else return true;
      }

      function authenticate (){
        var storage = window.localStorage;

        if (self.user) {
          return true;
        } else {
          user = storage.getItem('username');
          if (user) {
            self.user = {
              username : user
            };
            console.log('logged in');
            return true;
          }
          console.log('not logged in');
          return false;
        }
      }

     
     
      // Footer
     
     }

     return new ControllerViewModel();
  }
);
