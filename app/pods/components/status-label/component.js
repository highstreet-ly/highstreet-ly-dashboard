import Component from "@glimmer/component";
import { isEmpty } from "@ember/utils";

export default class StatusLabelComponent extends Component {
  get badgeClass() {
    if (isEmpty(this.args.statusObject.status)) {
      return "badge-success";
    } else {
      switch (this.args.statusObject.status.toLowerCase()) {
        case "future":
          return "badge-secondary";

        case "in_trial":
          return "badge-warning";

        case "active":
          return "badge-success";

        case "non_renewing":
          return "badge-danger";

        case "paused":
          return "badge-info";

        case "cancelled":
          return "badge-danger";

        default:
          return "badge-success";
      }
    }
  }
}
