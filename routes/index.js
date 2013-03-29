var utils = require('../utils.js'),
    _ = require('underscore'),
    fs = require('fs');

exports.index = function(req, res){
    var itemSaved,
        defaultCollectionItems = {},
        defaultCollectionName = utils.getDefaultCollectionName(),
        collectionList = utils.getCollectionList();
        
    //Check to see if we where redirected here from a new add
    itemSaved = (req.query && req.query.itemSaved) ? true : null;
        
    if (defaultCollectionName) {
        defaultCollectionItems = utils.getCollectionItems(defaultCollectionName);
    }

    res.locals.itemSaved = itemSaved;
    res.locals.collectionList = collectionList;
    res.locals.defaultCollectionItems = defaultCollectionItems;
    res.render('index', { title: 'Collections' });
};

exports.indexFromSave = function(req, res) {
    var pTitle = 'Collections',
        url = req.body.url || null,
        postContent = req.body.postcontent || null,
        defaultCollectionItems = {},
        defaultCollectionName = utils.getDefaultCollectionName(),
        collectionList = utils.getCollectionList();
        
    if (defaultCollectionName) {
        defaultCollectionItems = utils.getCollectionItems(defaultCollectionName);
    }
        
    res.locals.collectionList = collectionList;
    res.locals.defaultCollectionItems = defaultCollectionItems;
        
    if (!_.isNull(url) && !_.isNull(postContent)) {
        var fileJSON = utils.getFileFromSlug(url);
        
        if (fileJSON) {
            var stream = fs.createWriteStream(fileJSON.fullPath);
            
            stream.once('open', function() {
                if (!_.isUndefined(fileJSON.header) && !_.isEmpty(fileJSON.header)) {
                    stream.write("---\n");
                    stream.write(fileJSON.header);
                    stream.write("\n---\n\n");
                }
            
                stream.write(postContent);
                stream.end();
                
                res.locals.itemSaved = true;
                res.render('index', { title: pTitle });
            });
        } else {
            res.locals.itemSaved = false;
            res.render('index', { title: pTitle });
        }
    } else {
        res.locals.itemSaved = false;
        res.render('index', { title: pTitle });
    }
};