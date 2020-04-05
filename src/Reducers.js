import { combineReducers } from 'redux';
import lyricsReducer from './reducers/lyricsReducer';
import introReducer from './reducers/introReducer';
import videoReducer from './reducers/videoReducer';
import saveReducer from './reducers/saveReducer';

const Reducers = combineReducers({
    lyrics: lyricsReducer,
    valueCBox: introReducer,
    video: videoReducer,
    save: saveReducer
});

export default Reducers;