// Item View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/ItemModel", "Utils" ], function( $, Backbone, ItemModel ,Utils) {

    // Extends Backbone.View
    var EditItemView = Backbone.View.extend( {

        clear: function()  {
               $("#eiItemtName").val("") ;    
        },
        
        // The View Constructor
        initialize: function() {
            $("#editItem .saveButton").on("click",function(){
                var newItem = 
                    new ItemModel({
                    _id:Utils.guid(),
                    itemName:$("#eiItemName").val(),
                    personId: window.mobiGift.collections.itemCollection.personId
                    });
                window.mobiGift.collections.itemCollection.create(
                    newItem);
            });

        },

        // Renders all of the Item models on the UI
        render: function() {


        }

    } );

    // Returns the View class
    return EditItemView;

} );