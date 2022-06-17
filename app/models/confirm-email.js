import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class ConfirmEmailModel extends Model {
    @attr('string')
    userId;

    @attr('string')
    code;
}
