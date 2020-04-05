const initialState = {
  valueCheckBox:true,
};

const introReducer = (state = [], action) => {
  if(state.length == 0) {
      return initialState;
  }

  if(action.type == 'valueChange') {
      return {...state, valueCheckBox:action.payload.valueChange };
  }

  return state;
};

export default introReducer;