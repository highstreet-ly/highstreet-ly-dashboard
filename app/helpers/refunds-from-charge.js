import { helper } from '@ember/component/helper';

export default helper(function refundsFromCharge(params/*, hash*/) {
  var charge =  params[0];

  var total = 0

  charge.refunds .forEach(refund => {
    total += refund.amount
  })

  return total
});
