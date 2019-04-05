import {
    CLEAR_FILTERS,
    SAVE_FILTER,
    CLEAR_FILTER
} from '../actions/actionTypes';

const clearFilter = (state, name) => {
    delete state[name];
    return state;
}

const companiesFilters = (state = {}, {type,payload}) =>{
    switch (type) {
        case SAVE_FILTER:{
            const {name, value}= payload;
            return {
                ...state,
                [name]: value
            }
        }
        case CLEAR_FILTER: 
            return clearFilter(state, payload.name)
        case CLEAR_FILTERS: 
            return {};
        default:
            return state;
    }
}

export default companiesFilters;