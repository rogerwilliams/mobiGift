// Person View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/PersonModel" ], function( $, Backbone, PersonModel ) {

    // Extends Backbone.View
    var EditPersonView = Backbone.View.extend( {

        clear: function()  {
               $("#epPersonFirstName").val("") ;    
               $("#epPersonLastName").val("") ;    
        },
        
        // The View Constructor
        initialize: function() {
            $("#editPerson .saveButton").on("click",function(){
                var person = new PersonModel();
                window.mobiGift.collections.personCollection.create({
                    firstName:$("#epPersonFirstName").val(),
                    lastName:$("#epPersonLastName").val()
                    });
            });

        },

        // Renders all of the Person models on the UI
        render: function() {


        }

    } );

    // Returns the View class
    return EditPersonView;

} );