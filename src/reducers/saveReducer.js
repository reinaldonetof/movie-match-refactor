const initialState = {
  saveTime: 0.0,
  saveArray: [],
  saveCompletedString:'',
  savedButtonIn: null ,
  savedButtonEnd: null,
  uriVideoSaved: ''
}

const saveReducer = (state = [], action) => {
  if (state.length == 0 || action.type == 'saveReset') {
    return initialState;
  }

  if (action.type == 'saveTime') {
    return { ...state, saveTime: action.payload.savedTime }
  }

  if (action.type == 'saveArray') {
    return { ...state, saveArray: action.payload.savedArray }
  }

  if (action.type == 'saveCompleteString') {
    return { ...state, saveCompleteString: action.payload.savedCompletedString }
  }

  if (action.type == 'stateButtons') {
    return { ...state, savedButtonIn: action.payload.buttonIn, savedButtonEnd: action.payload.buttonEnd }
  }
  
  if (action.type == 'saveUriVideo') {
    return { ...state, uriVideoSaved: action.payload.uriVideo }
  }

  return state;

};

export default saveReducer