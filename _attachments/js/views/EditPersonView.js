// Person View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/PersonModel", "Utils" ], function( $, Backbone, PersonModel ,Utils) {

    // Extends Backbone.View
    var EditPersonView = Backbone.View.extend( {

        clear: function()  {
               $("#epPersonFirstName").val("") ;    
               $("#epPersonLastName").val("") ;    
        },
        
        // The View Constructor
        initialize: function() {
            $("#editPerson .saveButton").on("click",function(){
                var newPerson = 
                    new PersonModel({
                    _id:Utils.guid(),
                    firstName:$("#epPersonFirstName").val(),
                    lastName:$("#epPersonLastName").val()
                    });
                window.mobiGift.collections.personCollection.create(
                    newPerson);
            });

        },

        // Renders all of the Person models on the UI
        render: function() {


        }

    } );

    // Returns the View class
    return EditPersonView;

} );