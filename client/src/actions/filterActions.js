import {
    CLEAR_FILTERS,
    SAVE_FILTER,
    CLEAR_FILTER
} from './actionTypes';

export const allFilterClear = () => ({
    type: CLEAR_FILTERS
})

export const saveFilter = (name, value) => ({
    type: SAVE_FILTER,
    payload: {
        name,
        value
    }
})

export const clearFilter = name => ({
    type: CLEAR_FILTER,
    payload: {
        name
    }
})