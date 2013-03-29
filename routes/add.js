var utils = require('../utils.js'),
    _ = require('underscore'),
    fs = require('fs');
    
exports.index = function(req, res){
    var headerFields = null,
        collectionName = req.query.collectionName || null,
        collectionItems = null;
    
    //Verify they have selected a valid collectionName
    if (!_.isNull(req.query.collectionName)) {
        //Find the first item in this collection to grab the header metadata from
        collectionItems = utils.getCollectionItems(req.query.collectionName);
        
        if (collectionItems) {
            var d = new Date(),
                itemToLearnFrom = collectionItems[0],
                itemDetails = utils.getFileFromSlug(itemToLearnFrom.url);
                
            headerFields = [];
            
            //We will pretty much mirror the previous set since we can't anticipate all the 
            //possible meta headers.  The creator can change on the fly.
            itemDetails.meta.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            res.locals.suggestedFileName = itemDetails.meta.date + '-the-hyphenated-title';
            headerFields = itemDetails.meta;
            res.locals.fullDirPath = itemToLearnFrom.fullDirPath;
        }
    }

    res.locals.collectionName = collectionName;
    res.locals.headerFields = headerFields;
    res.render('add', { title: 'Add Collection Item' });
};

exports.saveNew = function(req, res){
    var stream,
        prop,
        headerFields,
        outputfileName,
        requiredProps = ['fullDirPath', 'filename', 'title', 'postcontent'];
        

    //Verify we have the required properties
    for (var i=0; i<requiredProps.length; i++) {
        if (_.isUndefined(req.body[requiredProps[i]])) {
            //Missing info, show error
            res.redirect('/add');
            res.end();
            break;
        }
    }
    
    //We have the required bits, now save it...
    //The incoming header fields are prefixed with header- so that we know which to write
    headerFields = [];
    for (prop in req.body) {
        if (prop === 'title' ) {
            headerFields[headerFields.length] = { 
                name: prop,
                value: "'" + utils.trim(req.body[prop]) + "'"
            };
        } else if (prop.indexOf("header-") > -1) {
            headerFields[headerFields.length] = { 
                name: prop.replace("header-", ""),
                value: utils.trim(req.body[prop])
            };
        }
        /*
        else {
            //Not a header field we know about
        }
        */
    }
    
    outputfileName = req.body.fullDirPath + '/' + req.body.filename + '.html';
    
    stream = fs.createWriteStream(outputfileName);
    stream.once('open', function() {
        stream.write("---\n");
        
        for (var i=0; i<headerFields.length; i++) {
            if (i+1 === headerFields.length) {
                stream.write(headerFields[i].name + ": " + headerFields[i].value);
            } else {
                stream.write(headerFields[i].name + ": " + headerFields[i].value + "\n");
            }
        }
        stream.write("\n---\n\n");
        stream.write(utils.trim(req.body.postcontent));
        stream.end();
        
        //Give some time for the regeneration or the collection list in the following page
        //will be missing the new item.
        setTimeout(function() {
            res.redirect('/?itemSaved=true');
            res.end();
        }, 1000);
    });
    stream.on('error', function(err) {
        console.log(err);
    });
};