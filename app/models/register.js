import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class RegisterModel extends Model {
    @attr('string')
    email;

    @attr('string')
    password;

    @attr('string')
    confirmPassword;

    @attr('string')
    redirect;

    @attr('string')
    firstName;

    @attr('string')
    lastName;

    @attr('string')
    createEventName;

    @attr('boolean')
    onboarding;
}

