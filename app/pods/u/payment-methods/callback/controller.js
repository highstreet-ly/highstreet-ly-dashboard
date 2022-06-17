import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class CallbackController extends Controller {
    queryParams = ['scope', 'state', 'error', 'code'];
    scope = null;
    state = null;
    error = null;
    code = null;
}
