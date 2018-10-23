import { CHANGE_INFO_PHOTO } from '../actions/types'

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
            console.log(info)
            return info;
        };
        default:
            return prevState;
    }
}

export default photoReducer;