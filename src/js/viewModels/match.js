/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojbutton', 'ojs/ojmodel', 'ojs/ojknockout', 'ojs/ojknockout-model'],
 function(oj, ko, $, app) {
  
    function MatchViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var matchModel = oj.Model.extend({
        idAttribute: 'id',
        url: 'http://129.144.154.154/match'
        //url: 'http://localhost:3000/match'
      });

      var graffitiModel = oj.Model.extend({
        idAttribute: 'id',
      });
     

      self.matchedCity = ko.observable();
      self.myMatch = new matchModel();

      self.graffiti = ko.observableArray([]);

      self.townName = ko.observable();
      self.age = ko.observable();
      self.population = ko.observable();
      self.description = ko.observable();
      self.image_url = ko.observable();
      self.distance = ko.observable();
      self.graffiti = ko.observable();
      self.no_graffiti = ko.observable();

      self.townHeading = ko.computed(function() {
        return self.townName() + ', ' + (2018 - self.age());
      })

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Reloqtr");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");
      self.smScreen = app.smScreen;
      
      self.likeClick = function () {
        self.loadNewCity();
      }

      self.noLikeClick = function () {
        self.loadNewCity();
      }

      self.loadNewCity = function () {
        console.log('profile', app.profile);

        self.myMatch.fetch({
          data: JSON.stringify(app.profile),
          type: 'POST',
          contentType: "application/json",
          success:function(model, response) {
            console.log('resp', model, response);
            var koObj = oj.KnockoutUtils.map(self.myMatch);
            self.townName(koObj.name());
            self.description(koObj.description());
            self.age(koObj.age());
            self.population(koObj.pop());
            self.image_url(koObj.image_url());
            self.distance(koObj.distance() + 'km away');
            self.no_graffiti(koObj.no_graffiti());
            
            self.graffiti(koObj.graffiti());
            console.log('graf', self.graffiti);
          }
        });


        //self.townName('City ' + Math.ceil(Math.random() * 1000));
      }

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
        self.loadNewCity();
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new MatchViewModel();
  }
);
