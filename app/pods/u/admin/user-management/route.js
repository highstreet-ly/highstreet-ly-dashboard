import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminUserManagementRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    currentUser

    setupController(controller, model) {
        controller.set('usersQuery', {
            filter: `expr:equals(claim-type,'member-of-eoid')`,
            include: 'user,user.roles',
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 1
            }
        })
    }

    async beforeModel() {
        super.beforeModel(...arguments)
        if (!this.currentUser.isDashUser) {
            console.log('user does not have the required roles to access this resource')
            this.router.transitionTo('u.index')
          }
    }
}

