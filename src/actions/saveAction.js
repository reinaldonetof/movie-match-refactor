export const saveTime = (time) => {
  return {
    type: 'saveTime',
    payload: {
      savedTime: time
    }
  }
}

export const saveArray = (array) => {
  return {
    type: 'saveArray',
    payload: {
      savedArray: array
    }
  }
}

export const saveCompleteString = (string) => {
  return {
    type: 'saveCompleteString',
    payload: {
      savedCompletedString: string
    }
  }
}


export const stateButtons = (valueIn, valueEnd) => {
  return {
    type: 'stateButtons',
    payload: {
      buttonIn: valueIn,
      buttonEnd: valueEnd
    }
  }
}

export const saveVideo = (uriVideo) => {
  return {
    type: 'saveUriVideo',
    payload: {
      uriVideo: uriVideo
    }
  }
}


export const saveReset = () => {
  return {
    type: 'saveReset',
  }
}