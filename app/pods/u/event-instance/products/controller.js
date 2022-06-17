import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UEventInstanceController extends Controller {
  @service
  router;

  get tab() {
    if (this.router.currentRoute) {
      const segments = this.router.currentRoute.name.split('.');
      return (segments[3] === 'categories' ? 'categories' : 'products');
    }
    return null;
  }
}
