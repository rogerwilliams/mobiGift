// Person View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/PersonModel" ], function( $, Backbone, PersonModel ) {

    // Extends Backbone.View
    var PersonView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Person Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },

        // Renders all of the Person models on the UI
        render: function() {

            // Sets the view's template property
            this.template = _.template( $( "script#personItems" ).html(), { "collection": this.collection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template);

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return PersonView;

} );