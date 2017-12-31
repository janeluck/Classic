// 比较值是否相等
// primitive类型直接比较
import { isValueObject } from 'immutable-js/src/Predicates';
export function is(valueA, valueB) {
  if (valueA === valueB) {
    return true
  }

  // NaN
  if (valueA !== valueA) {
    return valueB !== valueB
  }


  if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
    valueA = valueA.valueOf()
    valueB = valueB.valueOf()
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false
    }
  }

  return !!(
    isValueObject(valueA) &&
    isValueObject(valueB) &&
    valueA.equals(valueB)
  );

}
