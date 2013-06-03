// Person View
// =============

// Includes file dependencies
define([ "jquery", "backbone","underscore","models/PersonModel" ], function( $, Backbone, _, PersonModel ) {

    // Extends Backbone.View
    var PersonView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
    
            // The render method is called when Person Models are added to the Collection
            this.collection.on( "added", this.render, this );
            this.collection.on( "add", this.render, this );
            $("#addPersonButton").on("click",function(){
                window.mobiGift.views.editPersonView.clear();
            });

        },
        add: function(model,collection,options){
            var html = _.template($("script#personItems").html(), {"person": model} );
            var ul = this.$el.find("ul");
            ul.append(html);
            ul.listview('refresh');
        },
        // Renders all of the Person models on the UI
        render: function() {
            var html = "";
            _.each(this.collection.toJSON(), function( person, id ) { 
                html += _.template($("script#personItems").html(), {"person": person} );
            });
            var ul = this.$el.find("ul");

            // Renders the view's template inside of the current listview element
            ul.html(html);
            ul.listview('refresh');

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return PersonView;

} );