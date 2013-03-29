var utils = require('../utils.js'),
    _ = require('underscore');
    
exports.index = function(req, res){
    var fileJSON = null;
    
    if (!_.isUndefined(req.query.slug)) {
        //Track down the post for editing
        fileJSON = utils.getFileFromSlug(req.query.slug);   
    }
    
    res.locals.collectionItem = fileJSON;
    res.render('edit', { title: 'Edit Collection Item' });
};