import Application from 'sonaticket-dashboard/app';
import config from 'sonaticket-dashboard/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
