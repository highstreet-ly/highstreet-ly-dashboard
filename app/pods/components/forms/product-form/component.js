import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import { computed } from "@ember/object";

@classic
export default class ProductForm extends Component {
  tagName = 'div';
  @tracked allProducts = [];

  scheduleRelease = false;
  freeTier = false;
  product = null;
  price = 0.00;
  productCategories = ['Chips', 'Burgers'];

  @tracked newQuantity = 0;

  @tracked
  selectedGroup = {
    value: ''
  }

  @service notifications;
  @service contextService;
  @service router;
  @service store;
  @service quill;

  constructor() {
    super(...arguments);
    this.product = this.getAttr('product');
    this.products = this.getAttr('products');
    this.allGroups = this.getAttr('allGroups');
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    later(this, () => {
      var delta = this.quill.instances['product-description-editor'].clipboard.convert(this.product.description);

      if (this.product.price) {
        this.set('price', this.product.price / 100);
      }

      this.set('delta', delta);
    }, 500);
  }

  // is this even used anywhere
  get categories() {
    let categories = [];
    this.allProducts.forEach(p => {
      if (!categories.includes(p.tags) && p.tags) {
        categories.push(p.tags);
      }
    });
    categories.sort();
    return categories;
  }

  @computed('contextService.eventInstance.features.[]')
  get isStockManaged() {
    return this.contextService.eventInstance.hasFeature()
  }

  @action
  updateText() {
    let len = this.quill.getLength('product-description-editor');
    if (len > this.maxCharCount) {
      this.quill.deleteText('product-description-editor', 499, len);
    }
  }

  @action
  async onUpdateImageComplete(i, id) {
    let image = this.product.images.filter(i => i.id == id)[0];
    image.set('externalImageId', i);
    await image.save();
  }

  @action
  async onUploadedImageComplete(image) {
    this.addProductImage();
    this.editingProductImage.set('externalImageId', image);
    this.editingProductImage.set('ticketTypeConfiguration', this.product);
    await this.editingProductImage.save();
    let images = this.product.images;
    images.pushObject(this.editingProductImage);
    this.product.set('images', images);
    this.set('addingProductImage', false);
  }

  @action
  async uploadedMainImage(imageId) {
    console.log("setting", imageId);
    this.product.set('mainImageId', imageId);
  }

  @action
  addProductImage() {
    let newImage = this.store.createRecord('image', {});

    this.set('addingProductImage', true);
    this.set('editingProductImage', newImage);
  }

  @action
  deleteMainImage() {
    this.product.set('mainImageId', '');
  }

  @action
  async deleteImage(image) {
    image.deleteRecord();
    image.save();
  }

  @action
  setDateRange(a, b, c) {
    this.set('product.scheduleEndDate', c.endDate.toDate());
    this.set('product.scheduleStartDate', c.startDate.toDate());
  }

  @action
  toggleScheduleRelease() {
    this.set('scheduleRelease', !this.scheduleRelease);
  }

  @action
  toggleFreeTier() {
    this.set('freeTier', !this.freeTier);
  }

  @action
  removeGroup(group) {
    group.deleteRecord();
    group.save();
  }

  @action checkIfFree() {
    this.set('product.freeTier', this.product.price < 0.01);
  }

  @action didSelectCategory(selected) {
    console.log(selected);
    this.set('product.productCategory', selected);
  }

  @action newCategoryEntered(text) {
    this.set('product.tags', text);
  }

  @action
  editGroup(group) {
    this.router.transitionTo('u.event-instance.products.extras-group.edit', this.product.id, group.id);
  }



  @action
  async save() {
    this.product.set('description', this.quill.instances['product-description-editor'].root.innerHTML.trim());

    this.product.set('price', Math.ceil(this.price * 100));

    let product = this.product;
    if (isEmpty(product.name)) {
      this.notifications.error('Name is required', { autoClear: true });
      return;
    }

    if (isEmpty(product.description)) {
      this.notifications.error('Description is required', { autoClear: true });
      return;
    }

    // if (isEmpty(product.tags)) {
    //   this.notifications.error('Category is required', {autoClear: true});
    //   return;
    // }

    if (!product.freeTier && (!product.price || product.price <= 0)) {
      this.notifications.error('Price must be greater than 0 unless you select "free tier"', { autoClear: true });
      return;
    }

    if (this.contextService.eventInstance.isStockManaged) {
      if (!product.quantity || product.quantity <= 0) {
        this.notifications.error('Quantity available must be greater than 0', { autoClear: true });
        return;
      }
    }


    this.set('loading', true);

    try {
      await product.save();

    } catch (err) {
      err.errors.forEach(e => {

        this.notifications.error(
          e.detail,
          {
            autoClear: true,
          }
        );

      });
      this.set('loading', false);
      return
    }


    if (product.productExtraGroups && product.productExtraGroups.length && product.productExtraGroups.length > 0) {

      for (const peg of product.productExtraGroups.toArray()) {

        let remove = peg.productExtras.filter((item) => {
          return isEmpty(item.name);
        });

        remove.forEach(async r => {
          console.log('pe rem: ' + r.name);
          r.deleteRecord();
          await r.save();
        });

        let save = peg.productExtras.filter((item) => {
          return !isEmpty(item.name);
        });

        await peg.save();

        save.forEach(async s => {
          console.log('pe save: ' + s.name);
          s.set('productExtraGroup', peg);
          await s.save();
        });
      }
    }

    later((async () => {


      try {
        await product.save();

      } catch (err) {
        err.errors.forEach(e => {

          this.notifications.error(
            e.detail,
            {
              autoClear: true,
            }
          );

        });
        this.set('loading', false);
        return
      }

      this.set('loading', false);
      this.notifications.success('Product saved', { autoClear: true });

      this.router.transitionTo('u.event-instance.products', this.contextService.eventInstance.slug);

    }), 2000);

    this.contextService.resetEditingProduct();
    //TODO move this to parent action

  }

  @action
  showAddSavedGroup() {
    this.set('addingSavedExtra', true)
  }

  @action
  didSelectSavedExtraGroup(selected) {
    this.set('selectedGroup', selected)
  }

  @action
  async addSavedGroup() {
    let group = this.store.createRecord('product-extra-group', {
      name: this.selectedGroup.name,
      description: this.selectedGroup.description,
      minSelectable: this.selectedGroup.minSelectable,
      maxSelectable: this.selectedGroup.maxSelectable,
      ticketTypeConfiguration: this.product
    });


    this.selectedGroup.productExtras.forEach(async pe => {
      let newPe = this.store.createRecord('product-extra', {
        name: pe.name,
        selected: pe.selected,
        itemCount: pe.itemCount,
        description: pe.description,
        productExtraGroup: group,
        price: pe.price
      });

    })

    this.set('selectedGroup', { value: '' })
    this.set('addingSavedExtra', false)
  }

  @action
  addGroup() {
    let group = this.store.createRecord('product-extra-group', {
      name: '',
      description: '',
      minSelectable: 0,
      maxSelectable: 0,
      ticketTypeConfiguration: this.product,
    });
    group.edit = true;
    this.product.productExtraGroups.pushObject(group);
  }
}
