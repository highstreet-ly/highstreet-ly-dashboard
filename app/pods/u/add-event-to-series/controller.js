import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default class AddEventToSeriesController extends Controller {
    @service
    notifications;

    @service
    router;

    @service
    currentUser;

    saving = false;
}
