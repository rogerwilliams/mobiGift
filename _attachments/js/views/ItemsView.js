// Item View
// =============

// Includes file dependencies
define([ "jquery", "backbone","underscore","models/ItemModel" ], function( $, Backbone, _, ItemModel ) {
    
    var makeLink =  function( item ) { 
                var link = $($.trim(_.template($("script#itemItems").html(), {"item": item} )));
                var editButton = link.find(".itemEditButton");
                editButton.click(function(e){
                    alert("edit "+ item._id);
                });
                link.find(".itemTakeButton").click(function(e){
                    alert("take " + item._id);
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
            var ul = this.$el.find("tbody");
            makeLink.call(ul,model.attributes);
            $("#itemtable").table("refresh");
            $(".itemListButton").buttonMarkup("refresh");
        },
        
        // Renders all of the Item models on the UI
        render: function() {
            var ul = this.$el.find("tbody");
            ul.empty();
            _.each(this.collection.toJSON(), makeLink, ul);

            // Renders the view's template inside of the current listview element
            var theTable = $("#itemtable");
            theTable.table("refresh");
            $(".itemListButton").buttonMarkup("refresh");
            this.$el.find(".ui-table-columntoggle-btn").hide();

            // Maintains chainability
            return this;
        }

    } );

    // Returns the View class
    return ItemView;

} );