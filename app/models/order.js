import Model, { hasMany, attr } from '@ember-data/model'
import { computed } from '@ember/object'

export default class ImageModel extends Model {
  @attr('string')
  eventInstanceId

  @attr('string')
  assignmentsId

  @attr('string')
  ownerId

  @attr('string')
  ownerName

  @attr('string')
  ownerEmail

  @attr('string')
  ownerPhone

  @attr('number')
  totalAmount

  @attr('string')
  status

  @attr('string')
  deliveryLine1

  @attr('string')
  deliveryPostcode

  @attr('string')
  tableInfo

  @attr('date')
  createdOn

  @attr('date')
  confirmedOn

  @attr('string')
  humanReadableId

  @attr('boolean')
  isClickAndCollect

  @attr('boolean')
  isToTable

  @attr('boolean')
  isLocalDelivery

  @attr('boolean')
  isNationalDelivery

  @attr('date')
  refundedDate

  @attr('string')
  refundedReason

  @attr('date')
  pricedDateTime

  @attr('date')
  paidDateTime

  @attr('number')
  platformFees

  @attr('number')
  paymentPlatformFees

  @attr('date')
  processingDateTime

  @attr('date')
  processingCompleteDateTime

  @attr('date')
  expiredDateTime

  @hasMany('order-ticket', { async: true })
  tickets

  @hasMany('payment', { async: true })
  payments

  @attr('string')
  paymentId

  @attr('string')
  customerDispatchAdvisory

  @attr('date')
  orderAdvisoryDate

  @attr('string')
  orderAdvisoryTimeOfDay

  @computed('status')
  get actionButton() {
    return `actions/order-${this.status}`.decamelize()
  }

  @computed('totalAmount')
  get totalAmountReal() {
    return (this.totalAmount ? this.totalAmount / 100 : 0)
  }

  @computed('status')
  get humanReadableStatus() {
    switch (this.status) {
      case 'Paid':
        return "Ready to start"
      case 'Processing':
        return 'In Progress'
      case 'ProcessingComplete':
        return 'Complete'
      case 'Refunded':
        return "Refunded"
      default:
        return 'Unknown'
    }
  }

  isRefundable() {
    switch (this.status) {
      case 'Pending':
        return false
      case 'Priced':
        return false
      case 'Paid':
        return true
      case 'Processing':
        return true
      case 'ProcessingComplete':
        return true
      case 'Refunded':
        return true
      default:
        return false
    }
  }

  @computed('isClickAndCollect', 'isLocalDelivery', 'isNationalDelivery', 'isToTable')
  get deliveryTypeString() {
    console.log("x", this.isClickAndCollect, "x")
    if (this.isClickAndCollect) {
      return 'Click and collect'
    }

    if (this.isLocalDelivery) {
      return 'Local delivery'
    }

    if (this.isNationalDelivery) {
      return 'National delivery'
    }

    if (this.isToTable) {
      return 'To-Table delivery'
    }

    return 'Unknown'
  }
}
