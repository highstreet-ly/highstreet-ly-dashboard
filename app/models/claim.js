import Model, { belongsTo } from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class ClaimModel extends Model {
    
    @attr('string')
    claimType
    
    @attr('string')
    claimValue
 
    @belongsTo('user') user;
}
