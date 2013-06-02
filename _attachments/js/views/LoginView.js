// Person View
// =============

// Includes file dependencies
define([ "jquery", "backbone" ,"views/PersonView", "collections/PersonCollection"], function( $, Backbone, PersonView, PersonCollection ) {

    // Extends Backbone.View
    var LoginView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
            $("#loginButton").on("click",function(){
//                window.mobiGift.collections.personCollection =  new PersonCollection( [] , {  } );
//                window.mobiGift.views.peopleView = new PersonView( { el: "#people", collection: window.mobiGift.collections.personCollection} );
                var deferred = window.mobiGift.views.peopleView.collection.fetch();
//                deferred.done(function () {
//                    $.mobile.changePage( "#peoplePage", { reverse: false, changeHash: false } );
//                });
            });

        },

        // Renders all of the Person models on the UI
        render: function() {
//
//            // Sets the view's template property
//            this.template = _.template( $( "script#personItems" ).html(), { "collection": this.collection } );
//            
//            var ul = this.$el.find("ul");
//
//            // Renders the view's template inside of the current listview element
//            ul.append(this.template);
//            ul.trigger('create');
////            ul.listview('refresh');

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return LoginView;

} );