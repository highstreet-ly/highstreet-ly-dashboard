import Component from "@ember/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import classic from "ember-classic-decorator";
import { isEmpty } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { sort } from "@ember/object/computed";
import { computed } from "@ember/object";

@classic
export default class FormsExtrasGroupComponent extends Component {
  @service store;
  @service router;
  @service notifications;

  @tracked editMode = false;
  @tracked reorderMode = false;
  @tracked loading = false;

  @tracked confirmDelete = false;
  @tracked added = [];
  @tracked deleted = [];

  displaySort = ["sortOrder:asc"];

  @sort("group.productExtras", "displaySort")
  sortedExtras;

  sortedLinks() {
    return this.group.productExtras.sortBy("order");
  }

  @computed("this.product.isNew")
  get isNew() {
    return this.product.isNew;
  }

  @action
  removeGroup(group) {
    this.loading = true;
    this.group.deleteRecord();
    this.group.save();
    this.loading = false;
  }

  @action
  removeExtra(extra) {
    this.deleted.pushObject(extra);
    this.group.productExtras.removeObject(extra);
  }

  @action
  addExtra(group) {
    let extra = this.store.createRecord("product-extra", {
      productExtraGroup: group,
      price: 0,
      itemCount: 0,
    });
    this.added.pushObject(extra);
  }

  @action
  async save() {
    // Basic validation
    if (isEmpty(this.group.name)) {
      this.notifications.error("Group name is required", { autoClear: true });
      return;
    }
    if (this.group.productExtras.length < 1) {
      this.notifications.error(
        `Product group ${this.group.name} must have some products before saving`,
        { autoClear: true }
      );
      return;
    }
    if (this.group.min > this.group.max) {
      this.notifications.error(
        `The minimum selectable cannot be higher than the maximum selectable`,
        { autoClear: true }
      );
      return;
    }

    // Set to loading
    this.loading = true;

    // Ensure the group is saved so we have an ID
    await this.group.save();

    // Filter a list of empty rows to remove
    let remove = this.group.productExtras.filter((item) => {
      return isEmpty(item.name);
    });

    // Inject any we marked as for deletion earlier
    this.deleted.forEach((extra) => remove.pushObject(extra));

    // Loop through and delete anything that needs deleting
    remove.forEach(async (productExtra) => {
      productExtra.deleteRecord();
      await productExtra.save();
    });

    // Filter a list of populated rows to add
    let save = this.group.productExtras.filter((item) => {
      return !isEmpty(item.name);
    });

    // Loop through and save the populated rows
    save.forEach(async (productExtra) => {
      productExtra.set("productExtraGroup", this.group);
      await productExtra.save();
    });

    // Save the group again because why not
    await this.group.save();

    // Reset and back to view mode
    this.added = [];
    this.deleted = [];
    this.loading = false;
    this.editMode = false;
  }

  @action
  cancelSave() {
    // Rollback the group data
    this.group.rollbackAttributes();

    // Remove any added
    this.added.forEach((extra) => {
      this.group.productExtras.removeObject(extra);
    });

    // Reinstate anything we marked as for deletion earlier
    this.deleted.forEach((extra) => {
      this.group.productExtras.pushObject(extra);
    });

    // Rollback any changes
    this.group.productExtras.forEach((extra) => {
      extra.rollbackAttributes();
    });

    // Reset and back to view mode
    this.added = [];
    this.deleted = [];
    this.editMode = false;
  }

  @action
  edit() {
    this.editMode = true;
  }

  @action
  reordered() {
    this.group.productExtras.forEach(function (extra, i) {
      extra.sortOrder = i;
    });
  }
}
