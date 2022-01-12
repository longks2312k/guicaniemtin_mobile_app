import { combineReducers } from "redux";
import itemReducer from '../redux/itemReducer';
import bossReducer from '../redux/bossReducer';
// định nghĩa các reducer khác ...

const rootReducer = combineReducers({
    itemReducer,
    bossReducer
});

export default rootReducer;
