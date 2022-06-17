import Model, { belongsTo } from "@ember-data/model";
import { attr } from "@ember-data/model";

export default class OrderTicketModel extends Model {
  @attr("raw")
  attendee;

  @belongsTo("ticketDetail", { async: true })
  ticketDetails;

  @belongsTo("ticketTypeConfiguration", { async: true })
  ticketTypeConfiguration;

  /* Helper attr for refunds */
  @attr("boolean")
  selected
}
