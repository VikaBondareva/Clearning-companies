import {
    COMPANIES_LOAD_REQUEST,
    COMPANIES_LOAD_SUCCESS,
    COMPANY_LOAD_SUCCESS,
    COMPANIES_LOAD_ERROR,
    COMPANY_LOAD_ERROR
} from './actionTypes';
import {CompanyService} from '../services';
import  {returnErrors} from './errorActions'

export const loadCompaniesRequest = () => ({
    type: COMPANIES_LOAD_REQUEST
})

export const loadCompaniesListSuccess = ({ docs,total,page,pages,limit}) => ({
    type: COMPANIES_LOAD_SUCCESS,
    docs,
    total,
    page,
    pages,
    limit
})

export const loadCompanySuccess = (company) => ({
    type: COMPANY_LOAD_SUCCESS,
    company
})

export const loadCompaniesListError = () => ({
        type: COMPANIES_LOAD_ERROR
})

export function asyncGetCompanies() {
    return function (dispatch) {
        dispatch(loadCompaniesRequest());
        return CompanyService.getCompanies()
            .then(response => {
                dispatch(loadCompaniesListSuccess(response.data));
            })
            .catch(error=>{
               dispatch(loadCompaniesListError());
               if(error){
                    dispatch(returnErrors(error.response.data.message, error.response.status, COMPANY_LOAD_ERROR ));
                }
            })
    }
}

export function asyncGetCompanyById(id) {
    return function (dispatch) {
        dispatch(loadCompaniesRequest());
        return CompanyService.getCompanyById(id)
            .then(response => {
                dispatch(loadCompanySuccess(response.data));
            })
            .catch(error=>{
                dispatch(loadCompaniesListError());
                if(error){
                    dispatch(returnErrors(error.response.data.message, error.response.status, COMPANY_LOAD_ERROR ));
                }
            })
    }
}