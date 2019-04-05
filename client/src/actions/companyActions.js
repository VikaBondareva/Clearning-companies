import {
    COMPANIES_LOAD_SUCCESS,
    COMPANY_LOAD_SUCCESS,
    COMPANIES_LOAD_ERROR,
} from './actionTypes';
import {CompanyService} from '../services';
import {searchNameSave} from './filterActions';
// export const loadCompaniesRequest = () => ({
//     type: COMPANIES_LOAD_REQUEST
// })

export const loadedCompaniesListSuccess = ({ docs,total,page,pages,limit}) => ({
    type: COMPANIES_LOAD_SUCCESS,
    payload: {
        docs,
        total,
        page,
        pages,
        limit
    }
})

export const loadedCompanySuccess = (company) => ({
    type: COMPANY_LOAD_SUCCESS,
    payload: {
        company
    }
})

export const loadedCompaniesListError = () => ({
    type: COMPANIES_LOAD_ERROR
})

export const asyncGetCompanies = () => (dispatch, getState) => {
    const queries = getState().filters;
    return CompanyService.getCompanies(queries)
        .then(response => {
            dispatch(loadedCompaniesListSuccess(response.data));
        })
        .catch(error=>{
           dispatch(loadedCompaniesListError());
        })
}

export const asyncGetCompanyById = id => dispatch => {
    return CompanyService.getCompanyById(id)
        .then(response => {
            dispatch(loadedCompanySuccess(response.data));
        })
        .catch(error=>{
            dispatch(loadedCompaniesListError());
        })
}
