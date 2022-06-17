/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV["azure-tables"] = {
      storageAccount: "sonadeliverydash",
      storageAccessKey: "UR66EAFyB73FS+JgnZtPqI3CPCYva0MZKIr1WC9S1qjmszcAjLfVS1YDhO8kivcLotHnmIgIVdZr5yV8gyXpmA=="

      // You can also connect using your connection string, set it as:
      // connectionString: "my-connection-string"
    };

    ENV["azure-blob"] = {
      storageAccount: "sonadeliverydash",
      storageAccessKey: "UR66EAFyB73FS+JgnZtPqI3CPCYva0MZKIr1WC9S1qjmszcAjLfVS1YDhO8kivcLotHnmIgIVdZr5yV8gyXpmA==",
      containerName: "uicontainer" // defaults to 'emberdeploy'

      // You can also connect using your connection string, set it as:
      // connectionString: "my-connection-string"
    };
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
