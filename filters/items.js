function(doc) {
  // IMPORTANT: in order to retrieve remove events, you should add "doc._deleted" to the filter
  // only send notifications for message docs
  if (doc.collection == "items" || doc._deleted)
    return true;
  else
    return false;
};