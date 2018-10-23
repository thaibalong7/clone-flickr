import { combineReducers } from 'redux';
import listPhotoReducer from './listPhotoReducer';
import photoReducer from './photoReducer'

export default combineReducers({
    listPhotoReducer: listPhotoReducer,
    photoReducer: photoReducer
});