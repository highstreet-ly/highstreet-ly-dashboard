import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class BasicInfoRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    currentUser;

    @service
    contextService;

    async model() {
        await this.currentUser.load();
        
        return {
            organiser: this.currentUser.eventOrganiser
        }
    }

    async setupController(controller, model) {
        controller.set('organiser', model.organiser);
        if(!model.organiser){
            controller.set('noOrganiser', true);
        }
    }
}
