import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class ConfirmemailRoute extends Route {
    @service
    sonaticketAnonAjax;

    async setupController(controller) {

        let confirm = this.store.createRecord('confirm-email', {
            userId: controller.userId,
            code: controller.code
        });

        await confirm.save();
    }
}