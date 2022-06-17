import Component from "@ember/component";
import classic from "ember-classic-decorator";
import { inject as service } from "@ember/service";
import { isEmpty } from "@ember/utils";
import { later } from "@ember/runloop";
import { action } from "@ember/object";

@classic
export default class FormsEventInstanceComponent extends Component {
  tagName = 'div';

  @service store;
  @service router;
  @service notifications;
  @service currentUser;
  @service eventInstancePublisher;
  @service quill;

  createDefaultCategory = false

  maxCharCount = 500;
  saving = false;

  heroImageOpts = {
    cropping: true,
    croppingAspectRatio: 2,
  };

  get showCancelButton() {
    return this._cancel;
  }

  get minDate() {
    return new Date();
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    later(
      this,
      () => {
        var delta = this.quill.instances[
          "event-instance-description-editor"
        ].clipboard.convert(this.eventInstance.description);
        this.set("delta", delta);
      },
      500
    );
  }

  @action
  didSelectBusinessType(bt) {
    this.set("eventInstance.businessType", bt);
  }

  @action
  updateText() {
    let len = this.quill.getLength("event-instance-description-editor");
    if (len > this.maxCharCount) {
      this.quill.deleteText("event-instance-description-editor", 499, len);
    }
  }

  @action
  async copyTimes(eventInstance) {
    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].forEach(function (day) {
      eventInstance.openingTimes[day].open =
        eventInstance.openingTimes.monday.open;
      eventInstance.openingTimes[day].close =
        eventInstance.openingTimes.monday.close;
    });

    // this is a hack to get the form to update
    // i appreciate it's terrible: WD
    await eventInstance.save();
    let newEi = await this.store.findRecord("event-instance", eventInstance.id);

    later(() => {
      this.router.transitionTo("u.event-instance", newEi.slug);
    }, 500);
  }

  @action
  hideDatePicker() { }

  @action
  cancelDatePicker() { }

  @action
  toggleWaitingList() {
    this.set(
      "eventInstance.showWaitingList",
      !this.eventInstance.showWaitingList
    );
  }

  @action
  toggleIsToTable() {
    this.set(
      "eventInstance.isToTable",
      !this.eventInstance.isToTable
    );
  }

  @action
  toggleIsClickAndCollect() {
    this.set(
      "eventInstance.isClickAndCollect",
      !this.eventInstance.isClickAndCollect
    );
  }

  @action
  toggleIsLocalDelivery() {
    this.set(
      "eventInstance.isLocalDelivery",
      !this.eventInstance.isLocalDelivery
    );
  }

  @action
  toggleIsNationalDelivery() {
    this.set(
      "eventInstance.isNationalDelivery",
      !this.eventInstance.isNationalDelivery
    );
  }

  @action
  cancel() {
    if (this.attrs.cancel) {
      this.attrs.cancel();
    }
  }

  @action
  replaceShopHeader(imageId) {
    this.eventInstance.heroImageId = imageId;
  }

  @action
  replaceShopImage(imageId) {
    this.eventInstance.mainImageId = imageId;
  }

  @action
  async save() {
    if (
      this.eventInstance.isLocalDelivery &&
      (isEmpty(this.eventInstance.postcode) ||
        isEmpty(this.eventInstance.deliveryRadiusMiles) ||
        this.eventInstance.deliveryRadiusMiles === 0)
    ) {
      this.notifications.warning(
        "Cannot save shop: to enable local delivery, you must set the postcode and delivery radius",
        {
          autoClear: true,
        }
      );
      return;
    }

    if (this.attrs.save) {
      await this.attrs.save(this.eventInstance);
      this.set("saving", false);
      return;
    }

    this.set("saving", true);

    if (!this.eventInstance.openingTimes) {
      this.set("eventInstance.openingTimes", {
        monday: {
          open: null,
          close: null,
        },
        tuesday: {
          open: null,
          close: null,
        },
        wednesday: {
          open: null,
          close: null,
        },
        thursday: {
          open: null,
          close: null,
        },
        friday: {
          open: null,
          close: null,
        },
        saturday: {
          open: null,
          close: null,
        },
        sunday: {
          open: null,
          close: null,
        },
      });
    }

    this.eventInstance.set(
      "description",
      this.quill.instances[
        "event-instance-description-editor"
      ].root.innerHTML.trim()
    );

    try {
      let result = await this.eventInstance.save();
    } catch (err) {
      err.errors.forEach(e => {

        this.notifications.error(
          e.detail,
          {
            autoClear: true,
          }
        );

      });
      this.set("saving", false);
      return

    }


    let newEi = await this.store.findRecord(
      "event-instance",
      this.eventInstance.id
    );

    if (this.createDefaultCategory) {
      let productCategory = this.store.createRecord('productCategory', {
        eventInstanceId: this.eventInstance.id,
        enabled: true,
        sortOrder: 0,
        name: 'General',
      });
      await productCategory.save();
    }

    this.set("saving", false);
    this.notifications.success("Shop settings saved", { autoClear: true });

    later(() => {
      this.router.transitionTo("u.event-instance", newEi.slug);
    }, 500);
  }
}
