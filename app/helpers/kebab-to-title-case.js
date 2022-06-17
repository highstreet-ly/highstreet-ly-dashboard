import { helper } from '@ember/component/helper';

export default helper(function kebabToTitleCase(params/*, hash*/) {
  return params[0].split('-')
  .map(word => {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  })
  .join(' ')
  
  //replace(/_|-/gi, ' ').toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase());
});
