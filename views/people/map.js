function(doc) {
  if (doc.collection == "people") {
    emit(doc.collection, doc);
  }
};