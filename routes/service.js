var utils = require('../utils.js'),
    _ = require('underscore');
    
exports.getCollectionItemsForSelection = function(req, res) {
    var collectionItemsJSON = {};
    
    if (!_.isUndefined(req.query.collectionName)) {
        collectionItemsJSON = utils.getCollectionItems(req.query.collectionName);  
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(collectionItemsJSON));
    res.end();
};