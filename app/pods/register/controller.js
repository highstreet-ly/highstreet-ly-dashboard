import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import Env from 'sonaticket-dashboard/config/environment'
import { isEmpty } from '@ember/utils'

export default class RegisterController extends Controller {
    @service
    store

    registered = false
    registering = false

    constructor() {
        super(...arguments)
        this.registerData = {
            name: null,
            email: null,
            password: null,
            eventName: null,
            eventDate: null
        }

        this.dashUrl = window.location.origin
    }

    validatePassword(password) {
        var re = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}))/
        return re.test(String(password))
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    @action
    async register() {
        this.set('registering', true)

        this.set("eventDatePast", false)
        this.set("emailInvalid", false)
        this.set("emailExists", false)
        this.set("eventNameExists", false)

        // validate:

        if (isEmpty(this.registerData.businessName)) {
            this.set("eventNameMissing", true)
            this.set('registering', false)
            return
        } else {
            this.set("eventNameMissing", false)
        }

        if (isEmpty(this.registerData.firstName) || isEmpty(this.registerData.lastName)) {
            this.set("nameMissing", true)
            this.set('registering', false)
            return
        } else {
            this.set("nameMissing", false)
        }

        if (!this.validateEmail(this.registerData.email)) {
            this.set("emailInvalid", true)
            this.set('registering', false)
            return
        } else {
            this.set("emailInvalid", false)
        }

        if (!this.validatePassword(this.registerData.password)) {
            this.set("passwordInvalid", true)
            this.set('registering', false)
            return
        } else {
            this.set("passwordInvalid", false)
        }

       

        // - event name does not exist
        let existingEvent = await this.store.query('event-series', {
            filter: {
                name: this.registerData.businessName
            }
        })

        if (existingEvent.length > 0) {
            this.set("eventNameExists", true)
            this.set('registering', false)
            return
        }

        // when registering as an event organiser the redirect is
        // to the dashboard
        let redirectURI = `${window.location.origin}/confirmemail`

        var registration = this.store.createRecord('register', {
            email: this.registerData.email,
            password: this.registerData.password,
            confirmPassword: this.registerData.password,
            redirect: redirectURI,
            createEventName: this.registerData.businessName,
            firstName: this.registerData.firstName,
            lastName: this.registerData.lastName,
        })

        await registration.save()

        this.set('registered', true)
        this.set('registering', false)
    }
}
