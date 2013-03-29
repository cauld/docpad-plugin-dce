## DocPad Collections Editor (DCE) ##

A simple WYSIWYG style editor interface for [DocPad][1] Collections. Allows creating and editing of DocPad collections from the browser.

## Why is this helpful? ##

DCE attempts to mitigate a potential roadblock for adoption within some companies/clients.  While DocPad allows us to write content in whatever we feel comfortable with and we can utilize any number of HTML pre-processors to generate the actual HTML... this is outside the reach of less technical people.  You could argue that Markdown is super simple to learn and use (and I agree), but often clients see this as a complete deal breaker.  They just refuse to learn it.  They want a WYSIWYG editor like what Wordpress provides them.  DCE attempts to help offer the goodness of DocPad without turning users off due to what they would see as a key missing feature.  With a simple editing interface we can still base the site on the solid foundation that is DocPad and grant access to allow editing of certain aspects of the site, (e.g.) blog posts, to less technical authors.

A typical usage scenario might be:

 - Run the site on a development server with DCE enabled
 - Provide the DCE endpoint to specific people (there is optional support for protecting the editor interface - basic auth for now)
 - Users add and/or edit items in approved collections.  When they are done they tell the development team to push out a new version of the site to the production server.  Since DCE wraps around DocPad running in a generate/watch mode their changes are immediately generated.
 - The development team checks the latest changes into source control and deploys to production.

## Setup ##

 1. Clone and/or download and place the "docpad-collections-editor" folder within the DocPad node\_modules directory much like you would do with other plugins.  The path will end up being something like /path/to/docpad/node_modules/docpad-collections-editor.
 2. DCE enables editing of DocPad collections.  Before this can happen you must define some collections in DocPad and tell DCE which ones you'd like to expose.  For help in creating collections see the "CREATING CUSTOM COLLECTIONS VIA THE CONFIGURATION FILE" of [the DocPad documentation][2].  Once you have some collections defined simply add them to the config.collectionsAvailableForEdit array found in the new /path/to/docpad/node_modules/docpad-collections-editor/config.js file.
 3. Now instead of starting DocPad as you normally would, jump into the "docpad-collections-editor" folder and start everything from there with the command "node app".  DCE uses the DocPad API to start DocPad in watch mode for you.
 4. Once started you can find DocPad at the normal location (e.g.) http://localhost:9778/ and you'll also now find an additional endpoint for DCE on port 3000 (e.g.) http://localhost:3000/.

## Third Party ##

 1. DCE bundles the [CKEditor][3], a popular open source WYSIWYG editor.  CKEditor is distributed under the GPL, LGPL and MPL Open Source licenses.


  [1]: http://docpad.org/
  [2]: http://docpad.org/docs/begin
  [3]: http://ckeditor.com/