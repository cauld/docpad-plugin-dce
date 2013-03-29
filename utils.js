var config = require('./config.js'),
    _ = require('underscore'),
    fs = require('fs');

exports.getFileFromSlug = function(slug) {
    var fileJSON = false,
        file = docpadInstance.getFile({url: slug});
    
    if (file) {
        fileJSON = file.toJSON();
    }
    
    return fileJSON;
};

exports.getDefaultCollectionName = function() {
    var defaultCollectionName = false;
    
    if (_.isEmpty(config.collectionsAvailableForEdit) === false) {
        defaultCollectionName = config.collectionsAvailableForEdit[0]; 
    }
    
    return defaultCollectionName;
};

exports.getAvailableCollections = function() {
    var collections = null;
    
    if (_.isEmpty(config.collectionsAvailableForEdit) === false) {
        collections = {};
        
        //Track down the items for the requested collections 
        for (var i=0; i<config.collectionsAvailableForEdit.length; i++) {
        var collectionName = config.collectionsAvailableForEdit[i];
            collections[collectionName] = getCollectionItems(collectionName);
        } 
    }
    
    return collections;
};

exports.getCollectionList = function() {
    var collectionList = [];
    
    if (_.isEmpty(config.collectionsAvailableForEdit) === false) {
        collectionList = config.collectionsAvailableForEdit;
    }
    
    return collectionList;
};

exports.getCollectionItems = function(collectionName) {
    var collectionItemsJSON = null,
        collectionItems = docpadInstance.getCollection(collectionName);
    
    if (collectionItems) {
        collectionItemsJSON = collectionItems.toJSON();
    }
    
    return collectionItemsJSON;
};

exports.trim = function(string) {
	return string.replace(/^\s*|\s*$/g, '');
};