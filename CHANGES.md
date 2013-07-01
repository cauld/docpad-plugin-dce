Changes
-------

* v0.9.0
  * Initial release
* v0.9.1
  * Upgrading jQuery to 2.0.2
  * Upgrading Bootstrap to 2.3.2
  * Upgrading CKEditor to 4.1.2
  * Making installable NPM package (issue #2)
  * Moving the config file to the DocPad site root (issue #1)
  * The http auth feature now looks for env variables rather than string from the config file (process.env.DCE_AUTH_USER & process.env.DCE_AUTH_PASSWORD).  This is a breaking change.
  * Renaming project/package from docpad-collections-editor to docpad-plugin-dce