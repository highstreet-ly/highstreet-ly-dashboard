import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UAdminEditTeamMemberRoute extends Route.extend(AuthenticatedRouteMixin) {
    async model(params) {

        let user = await this.store.findRecord("user", params.id, {
            include: 'claims',
        })

        let subscription = await this.store.query("subscription",{
            filter:  `expr:and(equals(user-email,'${user.email}'),or(equals(status,'in_trial'),equals(status,'active')))`,
            include: 'plan'
        })

        let roles = await user.roles
        let allRoles = await this.store.query('role', {});

        return {
            user: user,
            roles: roles,
            allRoles: allRoles,
            subscription: subscription.firstObject
        }
    }

    setupController(controller, models) {
        controller.set('user', models.user)
        controller.set('roles', models.roles)
        controller.set('allRoles', models.allRoles)
        controller.set('subscription', models.subscription)

        controller.set('isDash', false)
        controller.set('isOperator', false)
        controller.set('isAdmin', false)

        controller.set('emailConfirmed', models.user.emailConfirmed)

        models.roles.forEach(element => {
            if (element.name === "Operator") {
                controller.set('isOperator', true)
            }

            if (element.name === "DashUser") {
                controller.set('isDash', true)
            }

            if (element.name === "Admin") {
                controller.set('isAdmin', true)
            }
        });

    }
}
