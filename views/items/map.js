function(doc) {
  if (doc.collection == "items") {
    emit(doc.personId, doc);
  }
};