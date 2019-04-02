import {
    COMPANIES_LOAD_REQUEST,
    COMPANIES_LOAD_SUCCESS,
    COMPANY_LOAD_SUCCESS
} from './actionTypes';
import {CompanyService} from '../services';

export const loadCompaniesRequest = () => ({
    type: COMPANIES_LOAD_REQUEST
})

export const loadCompaniesSuccess = ({ docs,total,page,pages,limit}) => ({
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

export function asyncGetCompanies() {
    return function (dispatch) {
        dispatch(loadCompaniesRequest());
        return CompanyService.getCompanies()
            .then(response => {
                dispatch(loadCompaniesSuccess(response.data));
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
    }
}