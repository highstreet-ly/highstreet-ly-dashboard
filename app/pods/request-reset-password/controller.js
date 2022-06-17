import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class RequestResetPasswordController extends Controller {
    @service
    ajax;

    @service
    router;

    resetSuccess = false;
    env = Env;

    @action
    cancel() {
        this.router.transitionTo('login');
    }

    @action
    async requestResetPassword() {
        let redirectURI = `${window.location.origin}/resetpassword`;

        try {

            let request = this.store.createRecord('forgot-password', {
                email: this.resetEmail,
                redirect: redirectURI
            });

            await request.save();
        } catch (error) {
            this.set('resetError', true);
            return;
        }

        this.set('resetSuccess', true)
    }
}
