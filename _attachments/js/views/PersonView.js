// Person View
// =============

// Includes file dependencies
define([ "jquery", "jquerymobile","backbone","underscore","models/PersonModel" ], 
        function( $, jquerymobile, Backbone, _, PersonModel ) {
    
    var makeLink =  function( person ) { 
                var template = $("script#personItems").html();
                var link = $($.trim(_.template(template, {"person": person}) ));
                link.click(function(e){
                    $("#itemListHeading").html("Items for " + person.firstName);
                    window.mobiGift.collections.itemCollection.personId = person._id;
                    window.mobiGift.collections.itemCollection.fetch({key:person._id});
                });
                link.appendTo(this);
    };

    // Extends Backbone.View
    var PersonView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
    
            // The render method is called when Person Models are added to the Collection
            this.collection.on( "reset", this.render, this );
            this.collection.on( "add", this.add, this );
            $("#addPersonButton").on("click",function(){
                window.mobiGift.views.editPersonView.clear();
            });

        },
        
        add: function(model,collection,options){
            var ul = this.$el.find("ul");
            makeLink.call(ul,model.attributes);
            ul.listview('refresh');
        },
        
        // Renders all of the Person models on the UI
        render: function() {
            var ul = this.$el.find("ul");
            _.each(this.collection.toJSON(), makeLink, ul);

            // Renders the view's template inside of the current listview element
            ul.listview('refresh');

            // Maintains chainability
            return this;
        }

    } );

    // Returns the View class
    return PersonView;

} );