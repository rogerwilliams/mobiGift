// This is a simple app that demonstrates how to use the Backbone.js couch-connector.
// It is sort of a real time chat with private messages support.

// Sets the require.js configuration for your application.
require.config( {

      // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
      paths: {

            // Core Libraries
            "jquery": "http://code.jquery.com/jquery-1.9.1.min",
            "jquerymobile": "http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min",
            "underscore": "libs/lodash",
            "backbone": "libs/backbone",
            "jquery-couch":"libs/jquery.couch",
            "jquery-couchLogin":"libs/jquery.couchLogin.min",
            "backbone-couchdb": "libs/backbone-couchdb"
      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {

            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            },
           "jquery-couch": {
                  "deps": [  "jquery" ],
                  "exports": "jqueryCouch"  //attaches "jqueryCouch" to the window object
            },
            "jquery-couchLogin": {
                  "deps": [  "jquery-couch" ],
                  "exports": "jqueryCouchLogin"  //attaches "jqueryCouchLogin" to the window object
            },
            "backbone-couchdb": {
                  "deps": [ "underscore" ,"jquery-couch","backbone"],
                  "exports": "BackboneCouchdb"  //attaches "BackboneCouchdb" to the window object
            }

      } // end Shim Configuration

} );

// Includes File Dependencies
require([ "jquery", "backbone", "backbone-couchdb", "views/LoginView", 
    "views/PersonView", "collections/PersonCollection", "views/EditPersonView",
    "views/EditItemView", "views/ItemsView", "collections/ItemCollection"] , function( $, Backbone, BackboneCouchdb,
        LoginView, PersonView, PersonCollection, EditPersonView,
        EditItemView, ItemsView,ItemCollection) {
    
    Backbone.couch_connector.config.db_name = "mobigift";
    Backbone.couch_connector.config.ddoc_name = "backbone_example";
  
  // If set to true, the connector will listen to the changes feed
  // and will provide your models with real time remote updates.
  // But in this case we enable the changes feed for each Collection on our own.
    Backbone.couch_connector.config.global_changes = false;
	require( [ "jquerymobile" ], function() {
        window.mobiGift = {};
        window.mobiGift.collections = {};
        window.mobiGift.views = {};
        
        window.mobiGift.views.loginView = new LoginView();
        window.mobiGift.collections.personCollection = new PersonCollection( [] , {  } );
        window.mobiGift.collections.itemCollection = new ItemCollection( [] , {  } );
        window.mobiGift.views.editPersonView = new EditPersonView( { el: "#editPersonElement", collection: window.mobiGift.collections.personCollection} );
        window.mobiGift.views.peopleView = new PersonView( { el: "#people", collection: window.mobiGift.collections.personCollection} );
        window.mobiGift.views.itemsView = new ItemsView( { el: "#items", collection: window.mobiGift.collections.itemCollection} );
        window.mobiGift.views.editItemView = new EditItemView( { el: "#editItemElement", collection: window.mobiGift.collections.itemCollection} );
	});
} );

//// Includes File Dependencies
//require([ "jquery", "underscore","backbone","jquery-couch","backbone-couchdb","jquery-couchLogin"], 
//    function( $, _, Backbone, jqueryCouch,BackboneCouchdb,jqueryCouchLogin) {
//
//$(function(){
//  // Fill this with your database information.
//  // `ddoc_name` is the name of your couchapp project.
//  Backbone.couch_connector.config.db_name = "mobigift";
//  Backbone.couch_connector.config.ddoc_name = "backbone_example";
//  
//  // If set to true, the connector will listen to the changes feed
//  // and will provide your models with real time remote updates.
//  // But in this case we enable the changes feed for each Collection on our own.
//  Backbone.couch_connector.config.global_changes = false;
//  
//  // Enables Mustache.js-like templating.
//  _.templateSettings = {
//    interpolate : /\{\{(.+?)\}\}/g
//  };
//  
//  var UserModel = Backbone.Model.extend({
//    defaults : {
//      name : "Anonymus"
//    }
//  });
//  
//  window.CurrentUser = new UserModel();
//  
//  // The model for a message is kinda simple.
//  // We only need a name, a text and a date.
//  var MessageModel = Backbone.Model.extend({
//    initialize : function(){
//      if(!this.get("date")){
//        this.set({"date": new Date().getTime()});
//      }
//    }
//  });
//  
//  // Now let's define a new Collection of Messages
//  var MessagesList = Backbone.Collection.extend({
//    db : {
//      view : "messages",
//      changes : true,
//      // If you don't know what filters are in CouchDB, then read it up here:
//      // <a href="http://guide.couchdb.org/draft/notifications.html#filters">http://guide.couchdb.org/draft/notifications.html#filters</a>
//      // Look up how the filter works in `chat_example/filters/private_messages.js`.
//      // IMPORTANT: see `filters/messages.js` to see how to retrieve remove events
//      filter : Backbone.couch_connector.config.ddoc_name + "/messages"
//    },
//    // The couchdb-connector is capable of mapping the url scheme
//    // proposed by the authors of Backbone to documents in your database,
//    // so that you don't have to change existing apps when you switch the sync-strategy
//    url : "/messages",
//    model : MessageModel,
//    // The messages should be ordered by date
//    comparator : function(comment){
//      return comment.get("date");
//    }
//  });
//  
//  var Messages = new MessagesList();
//
//  var PrivateMessage = MessageModel.extend({
//  });
//  
//  // Private messages get an own collection because they need a filter
//  var PrivateMessageList = Backbone.Collection.extend({
//    db : {
//      view : "none__",
//      changes : false,
//      // The filter avoids that private messages appear in the public stream.
//      filter : Backbone.couch_connector.config.ddoc_name + "/private_messages"
//    },
//    
//    url : "/private_messages",
//    
//    model : PrivateMessage
//  });
//  
//  var PrivateMessages = new PrivateMessageList();
//
//  // Displays the current user's name and the message input field.
//  var InputView = Backbone.View.extend({
//    el : $('#input'),
//    
//    regex : /@(\w+)/,
//    
//    events : {
//      "click #send" : "onSubmit",
//      "keypress #message" : "keypress"
//    },
//    
//    initialize : function(){
//      _.bindAll(this, "onSubmit", "nameChanged", "keypress");
//      CurrentUser.bind("change:name", this.nameChanged);
//    },
//    
//    onSubmit : function(){
//      var message = $("#message").val();
//      // Sanitize messages a bit before we send them to the server.
//      message = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
//      if(message.length > 0){
//        var executed = this.regex.exec(message);
//        // Do a regex check to see if it is a private message
//        if(executed != null)
//          PrivateMessages.create({
//            "from" : CurrentUser.get("name"),
//            "to" : executed[1],
//            "message" : message.replace(executed[0], "")
//          });
//        else
//          Messages.create({
//            "from" : CurrentUser.get("name"),
//            "message" : message
//          });
//      }
//      $("#message").val("");
//    },
//    
//    nameChanged : function(){
//      $('#name').text(CurrentUser.get('name'));
//    },
//    
//    keypress : function(ev){
//      // Send message on ENTER
//      if(ev.keyCode == 13)
//        this.onSubmit();
//    },
//    
//    fillAndFocus : function(text){
//      $('#message').val(text).focus();
//    }
//  });
//  
//  // Represents a message entry
//  var EntryView = Backbone.View.extend({
//    tagName : "li",
//    
//    template : _.template($("#entry-template").html()),
//    
//    events : {
//      "click .delete" : "delete_me"
//    },
//    
//    // If there's a change in our model, rerender it
//    initialize : function(){
//      _.bindAll(this, 'render', 'delete_me', 'delete_row');
//      this.model.bind('change', this.render);
//      this.model.bind('remove', this.delete_row);
//    },
//    
//    render : function(){ 
//      var content = this.model.toJSON();
//      $(this.el).html(this.template(content));
//      return this;
//    },
//    
//    delete_me : function(){
//      if(CurrentUser.get('name') == this.model.get('from')){
//        this.model.destroy();
//        this.delete_row(); 
//      }else{
//        alert("You can only delete your own messages!");
//      }
//    },
//    
//    delete_row : function(){
//      $(this.el).remove();
//    }
//  });
//  
//  // A private message
//  var PrivateEntryView = EntryView.extend({
//    className : "private",
//    template : _.template($("#private-entry-template").html())
//  });
//  
//  // The view for the chat messages
//  var MessagesList = Backbone.View.extend({
//    el: $("#messages"),
//  
//    initialize : function(){
//      _.bindAll(this, 'reseted', 'addRow', 'addPrivateRow');
//    
//      Messages.bind("reset", this.reseted);
//      Messages.bind("add", this.addRow);
//      PrivateMessages.bind("add", this.addPrivateRow);
//    },
//  
//    // Adds an entry row 
//    addRow : function(comment){
//      var view = new EntryView({model: comment});
//      var rendered = view.render().el;
//      this.el.append(rendered);
//    },
//  
//    addPrivateRow : function(private_message){
//      var view = new PrivateEntryView({model: private_message});
//      var rendered = view.render().el;
//      this.el.append(rendered);
//    },
//  
//    // Renders all comments into the table
//    reseted : function(){
//      // reset the table
//      this.el.html("");
//      if(Messages.length > 0){
//        // add each element
//        Messages.each(this.addRow);
//      }
//    }
//  });
//
//  
//  var UserSession = Backbone.Model.extend({
//  });
//
//  var UserListCollection = Backbone.Collection.extend({
//    db : {
//      changes : true
//    },
//    url : "/user_list",
//    model : UserSession
//  });
//
//  var UserList = new UserListCollection();
//
//  var UserListEntry = Backbone.View.extend({
//    tagName : "li",
//    className : "user",
//  
//    initialize : function(){
//      _.bindAll(this, 'remove_me');
//      
//      // When the session gets destroyed, the row will be destroyed too
//      this.model.bind("remove", this.remove_me);
//    },
//  
//    render : function(){
//      this.el = $(this.el);
//      this.el.html("");
//      this.el.unbind();
//      this.el.text(this.model.get("name"));
//      // Insert "@username" into the input field
//      var temp = "@" + this.model.get("name") + " ";
//      this.el.click(function(){
//        Input.fillAndFocus(temp);
//      });
//      return this.el;
//    },
//  
//    remove_me : function(){
//      that = this;
//      this.el.fadeOut(function(){
//        that.el.remove();
//      });
//    }
//  });
//  
//  // The list where all usernames are displayed
//  var UserListView = Backbone.View.extend({
//    el : $('#userlist'),
//  
//    initialize : function(){
//      _.bindAll(this, 'reseted', 'addRow');
//      
//      // The view listens to the realtime updates of the couchdb changes feed
//      UserList.bind("add", this.addRow);
//      UserList.bind("reset", this.reseted);
//    },
//  
//    addRow : function(model){
//      this.el.append(new UserListEntry({model:model}).render());
//    },
//  
//    reseted : function(){
//      UserList.each(this.addRow);
//    }
//  });
//
//  // The App router initializes the app by calling `UserList.fetch()`
//  var App = Backbone.Router.extend({
//    initialize : function(){
//      UserList.fetch();
//    }
//  });
//
//  // The current session will be stored in here
//  var CurrentSession = null;
//
//  var Input = new InputView();
//  
//  // Booststrap app after delay to avoid continuous activity spinner 
//  _.delay(function(){
//    
//    // Destroy the current session on unload
//    $(window).unload(function(){
//      $.ajaxSetup({
//        async : false
//      });
//      if(CurrentSession != null)
//        CurrentSession.destroy();
//    });
//    
//    // Includes the couchlogin
//    // check it out here: <a href="https://github.com/couchapp/couchdb-login-jquery">https://github.com/couchapp/couchdb-login-jquery</a>
//    $('#login').couchLogin({
//      loggedIn : function(user){
//        CurrentUser.set(user);
//        PrivateMessages.listen_to_changes();
//        // Only add a User if it's not already in the list
//        if(!UserList.detect(function(user){return user.get("name") == CurrentUser.get("name");})){
//          CurrentSession = UserList.create({
//            "name" : CurrentUser.get("name"),
//            "logged_in_at" : new Date().getTime()
//          });
//        }
//      },
//      loggedOut : function(){
//        PrivateMessages.stop_changes();
//        CurrentUser.set(new UserModel().toJSON());
//        CurrentUser.trigger("change:name");
//        if(CurrentSession != null)
//          CurrentSession.destroy();
//      }
//    });
//    
//    // Bootstrapping
//    new MessagesList();
//    new UserListView();
//    new App();
//
//  }, 100);
//});
//});