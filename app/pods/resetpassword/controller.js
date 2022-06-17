import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class ResetpasswordController extends Controller {
  @service
  ajax;

  queryParams = ['code', 'userId'];
  code = null;
  userId = null;
  canLogin = false;
  env = Env;

  @action
  async resetPassword() {

    let request = this.store.createRecord('reset-password', {
      userId: this.userId,
      code: this.code,
      password: this.password
    });

    await request.save();

    this.set('canLogin', true);
  }
}
