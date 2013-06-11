// Item Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","backbone-couchdb", "models/ItemModel" ], function( $, Backbone, BackboneCouchdb, ItemModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {


        db : {
          view :  "items",
          changes : true,
          // The filter avoids that private messages appear in the public stream.
          filter : Backbone.couch_connector.config.ddoc_name + "/items"
        },
        
        url : "/items",

        // Sets the Collection model property to be a Item Model
        model: ItemModel

    } );

    // Returns the Model class
    return Collection;

} );