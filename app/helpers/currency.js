import { helper } from '@ember/component/helper';

var formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default helper(function currency(params/*, hash*/) {
    let num = params[0]
    let shortNumber = params[1]
    num = +num

    if (isNaN(num)) { return 0 } // You could set this to 0 if you wanted
    let formattedNum = formatter.format(num / 100);

    if (shortNumber) {
      formattedNum = formattedNum.replace(/[.,]00$/, "");
    }

    return formattedNum;
});
