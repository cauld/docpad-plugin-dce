/* Config info - 
 * collectionsAvailableForEdit:
 * An array of collections you'd like to expose for editing. For help in creating collections
 * see the "CREATING CUSTOM COLLECTIONS VIA THE CONFIGURATION FILE" of the DocPad 
 * documentation here - http://docpad.org/docs/begin.  "Posts" would be an example usage.
 *
 * useHttpAuth:
 * You can enable simple http-auth to help protect who can edit collections.  
*/
var config = {
    useHttpAuth: false, //true or false
    collectionsAvailableForEdit: [] //(e.g.) posts
};

module.exports = config;