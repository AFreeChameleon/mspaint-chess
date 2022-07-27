import { combineReducers } from 'redux';
import chessReducer from './chess/reducer';

const rootReducer = combineReducers({
    chess: chessReducer
});

export default rootReducer;