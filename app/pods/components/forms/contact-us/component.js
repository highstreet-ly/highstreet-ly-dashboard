import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormsContactUsComponent extends Component {

  @tracked fields = {
    name: '',
    email: '',
    message: '',
    otherFields: [],
    hiddenFields: []
  }

  @tracked errors = {}

  constructor() {
    super(...arguments);

    if (this.args.name) {
      this.fields.name = this.args.name;
    }

    if (this.args.email) {
      this.fields.email = this.args.email;
    }

    if (this.args.otherFields) {
      this.fields.otherFields = this.args.otherFields;
    }
  }

  @action
  submit() {
    this.errors = {};

    if (!this.fields.name) {
      this.errors.name = 'Please enter your name';
    }

    if (!this.fields.email) {
      this.errors.email = 'Please enter your email';
    }

    if (!this.fields.message) {
      this.errors.message = 'Please enter a message';
    }

    if (Object.keys(this.errors).length === 0) {
      console.log("submitting");
    }
  }

}
