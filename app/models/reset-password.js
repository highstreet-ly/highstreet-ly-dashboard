import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class ResetPasswordModel extends Model {
    @attr('string')
    code;

    @attr('string')
    password;

    @attr('string')
    userId;
}
