// Mobile Router
// =============

// Includes file dependencies
define([ "jquery","backbone", "../models/PersonModel", "../collections/PersonCollection", "../views/PersonView" ], function( $, Backbone, PersonModel, PersonCollection, PersonView ) {

    // Extends Backbone.Router
    var PersonRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            // Instantiates a new Animal Person View
            this.peopleView = new PersonView( { el: "#people", collection: new PersonCollection( [] , {  } ) } );

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
            this.peopleView.collection.fetch();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",

            // When #Person? is on the url, the Person method is called
            "Person?:type": "Person"

        },

        // Home method
        home: function() {

            // Programatically changes to the Person page
            $.mobile.changePage( "#Person" , { reverse: false, changeHash: false } );

        },

        // Person method that passes in the type that is appended to the url hash
        Person: function(type) {

            // Stores the current Person View  inside of the currentView variable
            var currentView = this[ type + "View" ];

            // If there are no collections in the current Person View
            if(!currentView.collection.length) {

                // Show's the jQuery Mobile loading icon
                $.mobile.loading( "show" );

                // Fetches the Collection of Person Models for the current Person View
                currentView.collection.fetch().done( function() {

                    // Programatically changes to the current Person page
                    $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );
    
                } );

            }

            // If there already collections in the current Person View
            else {

                // Programatically changes to the current Person page
                $.mobile.changePage( "#" + type, { reverse: false, changeHash: false } );

            }

        }

    } );

    // Returns the Router class
    return PersonRouter;

} );