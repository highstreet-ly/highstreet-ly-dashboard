import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'

import { notEmpty } from '@ember/object/computed';

export default class UAdminEditTeamMemberController extends Controller {

    @service
    router

    @service
    currentUser

    @notEmpty('subscription') hasSubscription

    @action
    toggleIsOperator() {
        this.set('isOperator', !this.isOperator)
    }

    @action
    toggleIsDash() {
        this.set('isDash', !this.isDash)
    }

    @action
    toggleIsAdmin(){
        this.set('isAdmin', !this.isAdmin)
    }

    @action
    toggleEmailConfirmed(){
        this.set('emailConfirmed', !this.emailConfirmed)
    }

    @action
    async setUserSubscription(){
        await this.user.save({ adapterOptions: { command: "SetDefaultUserSubscription" } })
    }

    @action
    async save() {
        this.user.roles.clear()

        var eventOrganiserRoles = await this.store.query('role', {
            filter: {
                name: "EventOrganiser"
            }
        })

        this.user.roles.pushObject(eventOrganiserRoles.firstObject)

        if (this.isOperator) {

            var operatorRoles = await this.store.query('role', {
                filter: {
                    name: "Operator"
                }
            })

            this.user.roles.pushObject(operatorRoles.firstObject)
        }

        if (this.isDash) {

            var dashUserRoles = await this.store.query('role', {
                filter: {
                    name: "DashUser"
                }
            })

            this.user.roles.pushObject(dashUserRoles.firstObject)
        }

        if (this.isAdmin && this.currentUser.isAdmin) {

            var dashUserRoles = await this.store.query('role', {
                filter: {
                    name: "Admin"
                }
            })

            this.user.roles.pushObject(dashUserRoles.firstObject)
        }

        if (this.currentUser.isAdmin) {
            this.user.set('emailConfirmed', this.emailConfirmed)
        }

        await this.user.save()

        await this.currentUser.reload()

        this.router.transitionTo('u.admin.team')
    }
}
