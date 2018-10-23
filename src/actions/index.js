import {
    INI_LISTPHOTO, LOADMORE_LISTPHOTO,
    CHANGE_INFO_PHOTO, SET_DEFAULT_INFO_PHOTO,
    CHANGE_TAG_SEARCH
} from './types'

export const ini_listphoto = (listPhoto) => {
    return {
        type: INI_LISTPHOTO,
        listPhoto
    }
}
export const loadmore_listphoto = (listPhoto) => {
    return {
        type: LOADMORE_LISTPHOTO,
        listPhoto
    }
}

export const change_info_photo = (info) => {
    return {
        type: CHANGE_INFO_PHOTO,
        info
    }
}
export const set_default_info_photo = () => {
    return {
        type: SET_DEFAULT_INFO_PHOTO
    }
}

export const change_tag_search = (tag) => {
    return {
        type: CHANGE_TAG_SEARCH,
        tag
    }
}