const initialState = {
    inputLyric:[],
};

const lyricsReducer = (state = [], action) => {
    if(state.length == 0) {
        return initialState;
    }

    if(action.type == 'lyricsArray') {
        return {...state, inputLyric:action.payload.lyricsArray };
    }

    return state;
};

export default lyricsReducer;