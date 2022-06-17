import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class CreateNewEventRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;

    async model() {
        return {
            businessTypes: await this.store.query('business-type',{
                sort: 'name'
            }),
        }
      }
    

    setupController(controller, models) {
        // default the start and end date
        var today = new Date();
        today.setHours(today.getHours() + 4);

        var later = new Date();
        later.setHours(today.getHours() + 32);

        controller.set('eventSeries', this.store.createRecord('event-series', {
            visible: false
        }));

        controller.set('eventInstance', this.store.createRecord('event-instance', {
            visible: false,
        }));

        controller.set('businessTypes', models.businessTypes)
    }
}
