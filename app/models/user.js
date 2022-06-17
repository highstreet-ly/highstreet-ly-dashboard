import Model,  { hasMany }  from '@ember-data/model';
import { attr } from '@ember-data/model';

export default Model.extend({
    email: attr('string'),
    normalizedEmail: attr('string'),
    emailConfirmed: attr('boolean'),
    userName: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    avatarType: attr('number'),
    uploadedAvatarId: attr('string'),
    claims: hasMany('claim'),
    roles: hasMany('role'),
    redirect: attr('string'),
    onboarding: attr('boolean'),
    currentEoid: attr('string'),
    linkTo: attr('string'),
})
