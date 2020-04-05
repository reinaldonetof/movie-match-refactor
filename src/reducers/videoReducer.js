const initialState = {
  uriVideoPath:'',
};

const videoReducer = (state = [], action) => {
  if(state.length == 0) {
      return initialState;
  }

  if(action.type == 'uriVideo') {
      return {...state, uriVideoPath:action.payload.uriVideoPath };
  }

  return state;
};

export default videoReducer;