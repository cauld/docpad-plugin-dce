/**
 * DocPad Collections Editor
 * Copyright Manifold 2013+. All rights reserved.
 * Author Chad Auld (chadauld@gmail.com)
 * Licensed under the BSD License.
 * https://github.com/cauld/docpad-collections-editor
 */
var server,
    express = require('express'),
    http = require('http'),
    app = express(),
    path = require('path'),
    dceConfig = require('../../dce-config'),
    routes = require('./routes'),
    addRoutes = require('./routes/add'),
    editRoutes = require('./routes/edit'),
    serviceRoutes = require('./routes/service');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    if (dceConfig.useHttpAuth === true) {
        if (process.env.DCE_AUTH_USER && process.env.DCE_AUTH_PASSWORD) {
            app.use(express.basicAuth(process.env.DCE_AUTH_USER, process.env.DCE_AUTH_PASSWORD));
        } else {
            console.log("Warning: DCE http auth was requested, but one or more ENV variables are missing! Not enabled.");
        }
    }
  
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// Add DocPad to our Application
var docpadInstanceConfiguration = {
    // Give it our express application and http server
    serverExpress: app,
    serverHttp: server,
    // Tell it not to load the standard middlewares (as we handled that above)
    middlewareStandard: false,
    rootPath: path.resolve('../../')
};
GLOBAL.docpadInstance = require('docpad').createInstance(docpadInstanceConfiguration, function(err){
    if (err)  return console.log(err.stack);
    // Tell DocPad to perform a generation, extend our server with its routes, and watch for changes
    docpad.action('generate server watch', function(err){
        if (err)  return console.log(err.stack);
    });
});

app.get('/', routes.index);
app.post('/', routes.indexFromSave);
app.get('/add', addRoutes.index);
app.post('/add/save', addRoutes.saveNew);
app.get('/edit', editRoutes.index);
app.get('/service/get-collection-items', serviceRoutes.getCollectionItemsForSelection);
