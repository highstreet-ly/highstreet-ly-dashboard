import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class ConfirmemailController extends Controller {
    queryParams = ['code', 'userId'];
    code = null;
    userId = null;
}
