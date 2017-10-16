Package.describe({
  name: 'knil:applozic-web',
  version: '0.1.14',
  // Brief, one-line summary of the package.
  summary: 'Web client and javascript api for applozic chat',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/knil-public/applozic-web.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});


Npm.depends({
  glob: '6.0.1'
});

// Cordova.depends({});

Package.onUse((api) => {
  api.versionsFrom('1.3')
  api.use('ecmascript');
  var path = Npm.require('path');
  var globSync = Npm.require('glob').sync
  var curpath = path.resolve('.')
  var options = {}
  //handle local package
  if(!curpath.endsWith("knil_applozic-web"))
    options.cwd = path.join(path.resolve('.'), 'packages', 'knil_applozic-web')
  api.addAssets(globSync('js/**/*.js',options),["web.browser"])
  api.addAssets(globSync('images/**/*.*',options),["web.browser"])
  api.addAssets(globSync('autosuggest/**/*.*',options),["web.browser"])
  //add as files so they are minified
  api.addFiles(globSync('css/app/sidebox/*.css',options),["web.browser"])
  api.addFiles('css/app/videocall.css',["web.browser"])

  api.mainModule("index.jsx",['server','client'])
});
