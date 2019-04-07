import {
    COMPANIES_LOADED_SUCCESS,
    COMPANY_LOADED_SUCCESS,
    COMPANIES_LOADED_ERROR,
    COMPANIES_LIST_CLEAR,
    COMPANIES_LOAD_REQUEST,
    COMPANY_LOADED_ERROR,
    COMPANY_LOAD_REQUEST
} from './actionTypes';
import {CompanyService} from '../services';

export const loadCompaniesRequest = () => ({
    type: COMPANIES_LOAD_REQUEST
})

export const loadCompanyRequest = () => ({
    type: COMPANY_LOAD_REQUEST
})

export const loadedCompaniesListSuccess = ({ docs,total,page,pages,limit}) => ({
    type: COMPANIES_LOADED_SUCCESS,
    payload: {
        docs,
        total,
        page,
        pages,
        limit
    }
})

export const loadedCompanySuccess = (company) => ({
    type: COMPANY_LOADED_SUCCESS,
    payload: {
        company
    }
})

export const loadedCompaniesListError = () => ({
    type: COMPANIES_LOADED_ERROR
})

export const loadedCompanyError = () => ({
    type: COMPANY_LOADED_ERROR
})

export const clearCompaniesList = () => ({
    type: COMPANIES_LIST_CLEAR
})

export const asyncGetCompanies = queries => (dispatch) => {
    dispatch(loadCompaniesRequest());
    return CompanyService.getCompanies(queries)
        .then(response => {
            dispatch(loadedCompaniesListSuccess(response.data));
        })
        .catch(error=>{
           dispatch(loadedCompaniesListError());
        })
}

export const asyncGetCompanyById = id => dispatch => {
    dispatch(loadCompanyRequest());
    return CompanyService.getCompanyById(id)
        .then(response => {
            dispatch(loadedCompanySuccess(response.data));
        })
        .catch(error=>{
            dispatch(loadedCompanyError());
        })
}
