import DS from 'ember-data';
import { attr } from '@ember-data/model';

export default DS.Model.extend({
    email: attr('string'),
    eventInstanceId: attr('string'),
    created: attr('date'),
});
