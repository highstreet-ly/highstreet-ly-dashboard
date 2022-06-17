'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = EmberApp.env();
var isProductionLikeBuild = ['production'].indexOf(env) > -1;

var fetchSSL = process.env.FETCH_SSL

// if(fetchSSL){
// const exec = require('child_process').exec;
/* exec('sh ssl/get-certs.sh',
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });*/
// }


var fingerprintOptions = {
  enabled: isProductionLikeBuild,
  replaceExtensions: ['html', 'css', 'js', 'hbs'],
  extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg'],
};

console.log("==ENV: " + env);
console.log("==isProductionLikeBuild: " + isProductionLikeBuild);

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {

    // speed up the build:
    hinting: false,
    tests: false,

    snippetPaths: ['snippets'],
    'ember-prism': {
      'theme': 'twilight',
      'components': ['scss', 'javascript'], //needs to be an array, or undefined.
      'plugins': ['line-highlight']
    },
    babel: {
      sourceMaps: 'inline'
    },
    
    'ember-fetch': {
      preferNative: true
    },
    fingerprint: fingerprintOptions,

    sourcemaps: {
      enabled: !isProductionLikeBuild,
    },

    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },

    // Add options here
    sassOptions: {
      sourceMap: !isProductionLikeBuild,
    },
    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.


  return app.toTree();
};
