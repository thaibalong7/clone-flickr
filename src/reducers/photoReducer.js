import { CHANGE_INFO_PHOTO, SET_DEFAULT_INFO_PHOTO } from '../actions/types'

const initialState = {
    source: 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif',
    title: 'loading',
    ownername: '...',
    views: 'views',
    description: 'description',
    tags: [],
    date: '...'
}

const photoReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case CHANGE_INFO_PHOTO: {
            const { info } = action;
            return info;
        };
        case SET_DEFAULT_INFO_PHOTO: {
            return initialState;
        }
        default:
            return prevState;
    }
}

export default photoReducer;