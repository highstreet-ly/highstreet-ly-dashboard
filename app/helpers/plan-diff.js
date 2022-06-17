import { helper } from '@ember/component/helper'
import { setDiff } from '@ember/object/computed'
import { set } from '@ember/object';

class Differ {
    constructor(featues1, featues2) {
        set(this, 'featues1', featues1);
        set(this, 'featues2', featues2);
    }

    @setDiff('featues1', 'featues2') delta;
}

export default helper(function planDiff(params/*, hash*/) {
    let [plan, plans, idx] = params

    if (idx > 0) {

        let features = []

        if (idx > 1) {
            for (let i = idx-1; i >= 0; i--) {
                let p = plans.objectAt(i)

                console.log(`processing ${p.name}`)
                p.sortedFeatures.forEach(f => {
                    console.log(`adding ${f.name} to delta`)
                    features.push(f)
                });
            }

            let differ = new Differ(plan.sortedFeatures, features)
            return differ.delta
        }
        else {
            let differ = new Differ(plan.sortedFeatures, plans.objectAt(idx - 1).features)
            return differ.delta
        }
    }

    return plan.sortedFeatures
})
