import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import classic from 'ember-classic-decorator';

@classic
export default class IndexController extends Controller {
    @service
    currentUser;
  
    @service
    statsService;
}