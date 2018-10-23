import { INI_LISTPHOTO, LOADMORE_LISTPHOTO } from '../actions/types'

const initialState = [];

const listPhotoReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case INI_LISTPHOTO: {
            const { listPhoto } = action;
            return listPhoto;
        };
        case LOADMORE_LISTPHOTO: {
            const { listPhoto } = action;
            return [...prevState, ...listPhoto];
        };
        default:
            return prevState;
    }


}

export default listPhotoReducer;
