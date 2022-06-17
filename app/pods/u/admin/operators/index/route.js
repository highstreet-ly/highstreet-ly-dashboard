import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminOperatorsIndexRoute extends Route.extend(AuthenticatedRouteMixin) {


    setupController(controller, model) {
        controller.set('eventOrganisersQuery', {
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 1
            }
        })
    }
}
