import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {isEmpty} from '@ember/utils';

export default class FormsProductCategoryFormComponent extends Component {
  @service store;
  @service router;
  @service notifications;

  @tracked
  loading = false;

  @tracked
  confirmDelete = false;

  @action
  async save() {
    if (isEmpty(this.args.productCategory.name)) {
      this.notifications.error('Category name is required', {autoClear: true});
      return;
    }

    this.loading = true;
    await this.args.productCategory.save();
    this.loading = false;

    this.router.transitionTo('u.event-instance.products.categories.index', this.args.eventInstance.slug);
  }

  @action
  async deleteCategory(category) {
    this.loading = true;
    await category.deleteRecord();
    await category.save();
    this.loading = false;
    this.router.transitionTo('u.event-instance.products.categories', this.eventInstance);
  }
}
