import { helper } from '@ember/component/helper'

export default helper(function getPlanByIdx(params/*, hash*/) {
  let plans = params[0], idx = params[1]

  return plans.objectAt(idx-1).name
})
