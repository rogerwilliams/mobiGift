// Item View
// =============

// Includes file dependencies
define([ "jquery", "backbone","underscore","models/ItemModel" ], function( $, Backbone, _, ItemModel ) {
    
    var makeLink =  function( item ) { 
                var link = $(_.template($("script#itemItems").html(), {"item": item} ));
                link.click(function(e){
                    alert(item._id);
                });
                link.appendTo(this);
    };

    // Extends Backbone.View
    var ItemView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
    
            // The render method is called when Item Models are added to the Collection
            this.collection.on( "reset", this.render, this );
            this.collection.on( "add", this.add, this );
            $("#addItemButton").on("click",function(){
                window.mobiGift.views.editItemView.clear();
            });

        },
        
        add: function(model,collection,options){
            var ul = this.$el.find("ul");
            makeLink.call(ul,model.attributes);
            ul.listview('refresh');
        },
        
        // Renders all of the Item models on the UI
        render: function() {
            var ul = this.$el.find("ul");
            ul.empty();
            _.each(this.collection.toJSON(), makeLink, ul);

            // Renders the view's template inside of the current listview element
            ul.listview('refresh');

            // Maintains chainability
            return this;
        }

    } );

    // Returns the View class
    return ItemView;

} );