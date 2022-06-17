import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import Env from 'sonaticket-dashboard/config/environment';
import { action } from '@ember/object';

@classic
export default class LoginController extends Controller {
  @service
  session;

  @service
  ajax;

  email = null;
  password = null;
  env = Env;

  @action
  async resendConfirm() {

    let redirectURI = `${window.location.origin}/confirmemail`;

    await this.ajax.request(Env.sonatribe.DashApi + '/api/v1/users/resendconfirmemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: {
        email: this.email,
        redirect: redirectURI
      }
    });

    this.set('authError', false);
    this.set('authErrorReason', '');
    this.set('email', '');
    this.set('password', '');
    this.set('resetEmail', '');
    this.set('isResettingPassword', false);
    this.set('showResendConefirmEmail', false);
    this.set('showResetSent', true);
  }

  @action
  cancelReset() {
    this.set('isResettingPassword', false)
  }

  @action
  showReset() {
    this.set('isResettingPassword', true)
  }

  @action
  async login() {


    try {
      await this.ajax.request('/account/login', {
        method: 'POST',
        data: {
          email: this.email,
          password: this.password
        }
      });
    } catch (error) {
      this.set('authError', true);
      this.set('authErrorReason', error.payload.reason);

      if (error.payload.reason === 'Email not confirmed') {
        this.set('showResendConefirmEmail', true);
      }
      return;
    }

    this.set('authError', false);

    let randomString = function (length) {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    let clientId = "dashboard";
    let redirectURI = `${window.location.origin}/callback`;

    let responseType = `id_token token`;
    let nonce = randomString(32);
    let redirect = `${Env.sonatribe.authenticationURL}/connect/authorize?`
    + `client_id=${clientId}`
    + `&redirect_uri=${redirectURI}`
    + `&response_type=${responseType}&scope=${Env.sonatribe.requestedScopes}&nonce=${nonce}`;

    window.location.replace(redirect);
  }

  @action
  logOut() {
    this.session.invalidate();
  }
}
