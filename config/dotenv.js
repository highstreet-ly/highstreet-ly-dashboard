/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(env) {
  return {
    path: `./config/environments/${env}/.env`,
    failOnMissingKey: true
  }
};
