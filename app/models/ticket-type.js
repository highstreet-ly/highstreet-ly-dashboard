import { attr } from '@ember-data/model';
import Model, { belongsTo } from '@ember-data/model'

export default class TicketTypeModel extends Model {
    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    description

    @attr('boolean', { defaultValue: true })
    freeTier

    @attr('number')
    price

    @attr('number')
    quantity

    @attr('number')
    availableQuantity

    @attr('string')
    eventSlug

    @attr('date')
    scheduleStartDate

    @attr('date')
    scheduleEndDate

    @attr('string')
    eventInstanceId

    @attr('string')
    mainImageId

    @attr('string')
    tags

    @attr('number', {
        defaultValue() { return 0 }
    })
    sortOrder

    @attr('boolean')
    isPublished

    @belongsTo('product-category')
    productCategory
}
