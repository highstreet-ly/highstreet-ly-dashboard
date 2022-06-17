import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminTeamRoute extends Route.extend(AuthenticatedRouteMixin) {

    @service
    currentUser;

    model() {

    }

    setupController(controller, model) {
        controller.set('usersQuery', {
            filter: `expr:and(or(equals(claim-type,'member-of-eoid'),equals(claim-type,'eoid')),equals(claim-value,'${this.currentUser.eventOrganiser.id}'))`,
            include: 'user.roles',
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 1
            }
        })
    }
}