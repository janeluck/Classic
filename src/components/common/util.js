export const preventDefault = function (nativeEvent) {
  if (!nativeEvent) {
    return
  }
  if (nativeEvent.preventDefault) {
    nativeEvent.preventDefault()
  } else if (typeof nativeEvent.returnValue !== 'unknown') {
    nativeEvent.returnValue = false
  }
}

export const stopPropagation = function (nativeEvent) {
  if (!nativeEvent) {
    return
  }
  if (nativeEvent.stopPropagation) {
    nativeEvent.stopPropagation()
  } else if (typeof nativeEvent.cancelBubble !== 'unknown') {
    // The ChangeEventPlugin registers a "propertychange" event for
    // IE. This event does not support bubbling or cancelling, and
    // any references to cancelBubble throw "Member not found".  A
    // typeof check of "unknown" circumvents this issue (and is also
    // IE specific).
    nativeEvent.cancelBubble = true
  }
}

var keyNameToModifer = {
  Alt: ['Alt', 'altKey'],
  Ctrl: ['Control', 'ctrlKey'],
  Meta: ['Meta', 'metaKey'],
  Shift: ['Shift', 'shiftKey']
}
// 获取modifiers为true的键集合数组
export const getEventModifiers = function (nativeEvent) {
  return _.filter(Object.keys(keyNameToModifer), (k) => {
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyNameToModifer[k][0]);
    }
    return !!nativeEvent[keyNameToModifer[k][1]]
  })
}

