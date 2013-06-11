// Person View
// =============

// Includes file dependencies
define([ "jquery", "backbone" ,"views/PersonView", "collections/PersonCollection"], function( $, Backbone, PersonView, PersonCollection ) {

    // Extends Backbone.View
    var LoginView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
            $("#loginButton").on("click",function(){
                var deferred = window.mobiGift.views.peopleView.collection.fetch();
//                deferred.done(function () {
//                    $.mobile.changePage( "#peoplePage", { reverse: false, changeHash: false } );
//                });
            });

        },

        // Renders all of the Person models on the UI
        render: function() {

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return LoginView;

} );