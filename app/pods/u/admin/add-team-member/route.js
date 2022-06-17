import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UAdminAddTeamMemberRoute extends Route.extend(AuthenticatedRouteMixin) {

    setupController(controller){
        controller.set('registerData', {
            name: null,
            email: null,
            password: null
        })
    }
}
