import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.uncountable('register-interest');
inflector.uncountable('confirm-email');
inflector.uncountable('forgot-password');
inflector.uncountable('reset-password');
inflector.uncountable('register');

// Modules must have an export, so we just export an empty object here
export default {};