import { CHANGE_TAG_SEARCH } from '../actions/types'

const initialState = '';

const tagSearchReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case CHANGE_TAG_SEARCH: {
            const { tag } = action;
            return tag;
        };
        default:
            return prevState;
    }
}

export default tagSearchReducer;