import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import {action} from '@ember/object';
import BasePanel from '../../BasePanel';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class PanelsProductCategoriesPanelComponent extends BasePanel {
  @service router;

  @tracked reorderMode = false;
  @tracked loading = false;

  @tracked productCategories = [];

  modelName = 'productCategories'
  endpoint = 'product-category'
  searchProperty = 'name'

  productCategorySort = ['sortOrder'];
  @sort('productCategories', 'productCategorySort')
  sortedProductCategories;

  @action
  reordered() {
    this.productCategories.forEach(function (cat, i) {
      cat.sortOrder = i;
    });
  }

  @action
  async save() {
    this.saving = true

    await this.productCategories.forEach(async function (cat, i) {
      await cat.save();
    });

    this.saving = false;
    this.reorderMode = false;
  }

  @action
  async cancel() {
    await this.productCategories.forEach(async function (cat, i) {
      await cat.rollbackAttributes();
    });
    this.reorderMode = false;
  }
}
