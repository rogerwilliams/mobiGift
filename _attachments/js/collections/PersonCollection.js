// Person Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","backbone-couchdb", "models/PersonModel" ], function( $, Backbone, BackboneCouchdb, PersonModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
//        initialize: function( models, options ) {
//
//            // Sets the type instance property (ie. animals)
//           this.type = options.type;
//
//        },
        db : {
          view :  "people",
          changes : true,
          // The filter avoids that private messages appear in the public stream.
          filter : Backbone.couch_connector.config.ddoc_name + "/people"
        },
        
        url : "/people",

        // Sets the Collection model property to be a Person Model
        model: PersonModel,

        // Sample JSON data that in a real app will most likely come from a REST web service
        jsonArray: [

            { "firstName": "Roger", "lastName": "Williams" },

            { "firstName": "Kathy", "lastName": "Tolputt" } 

        ]
//        ,
//
//        // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
//        sync: function( method, model, options ) {
//
//            // Local Variables
//            // ===============
//
//            // Instantiates an empty array
//            var people = [],
//
//                // Stores the this context in the self variable
//                self = this,
//
//                // Creates a jQuery Deferred Object
//                deferred = $.Deferred();
//
//            // Uses a setTimeout to mimic a real world application that retrieves data asynchronously
//            setTimeout( function() {
//
//                people = self.jsonArray;
//
//                // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
//                options.success( people );
//
//                // Triggers the custom `added` method (which the Category View listens for)
//                self.trigger( "added" );
//
//                // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
//                deferred.resolve();
//
//            }, 1000);
//
//            // Returns the deferred object
//            return deferred;
//
//        }

    } );

    // Returns the Model class
    return Collection;

} );