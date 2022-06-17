import Controller from '@ember/controller'
import { action } from '@ember/object'
import Env from 'sonaticket-dashboard/config/environment'
import { isEmpty } from '@ember/utils'
import { inject as service } from '@ember/service'

export default class UAdminAddTeamMemberController extends Controller {

    @service
    currentUser

    @service
    router

    constructor() {
        super(...arguments)
        
    }

    @action
    toggleIsOperator() {
        this.set('isOperator', !this.isOperator)
    }

    @action
    toggleIsDash() {
        this.set('isDash', !this.isDash)
    }

    @action
    async addTeamMember() {
        this.set('registering', true)
        this.set("emailInvalid", false)
        this.set("emailExists", false)
       
        if (!this.validateEmail(this.registerData.email)) {
            this.set("emailInvalid", true)
            this.set('registering', false)
            return
        } else {
            this.set("emailInvalid", false)
        }      

        // when registering as an event organiser the redirect is
        // to the dashboard
        let redirectURI = `${window.location.origin}/resetpassword`
       
        let roles = []

        var eventOrganiserRoles = await this.store.query('role', {
            filter: {
                name: "EventOrganiser"
            }
        })

        roles.push(eventOrganiserRoles.firstObject)

        if (this.isOperator) {

            var operatorRoles = await this.store.query('role', {
                filter: {
                    name: "Operator"
                }
            })

            roles.push(operatorRoles.firstObject)
        }

        if(this.isDash){
            
            var dashUserRoles = await this.store.query('role', {
                filter: {
                    name: "DashUser"
                }
            })

            roles.push(dashUserRoles.firstObject)
        }

        var registration = this.store.createRecord('user', {
            email: this.registerData.email,
            roles: roles,
            redirect: redirectURI,
            onboarding: true
        })

        await registration.save()

        if (this.isDash) {
            var claim = this.store.createRecord('claim', {
                claimType: 'eoid',
                claimValue: this.currentUser.eventOrganiser.id,
                userId: registration.id
            })

            await claim.save()
        }

        this.set('registered', true)
        this.set('registering', false)

        this.router.transitionTo('u.admin.team')

    }

    validatePassword(password) {
        var re = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}))/
        return re.test(String(password))
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }
}
