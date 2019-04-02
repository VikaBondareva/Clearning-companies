import {
    COMPANIES_REQUEST,
    COMPANIES_SUCCESS,
    COMPANY_SUCCESS
} from './actionTypes';
import {CompanyService} from '../services';

export const companiesRequest = () => ({
    type: COMPANIES_REQUEST
})

export const companiesSuccess = ({docs, total, page, pages, limit}) => ({
    type: COMPANIES_SUCCESS,
    docs,
    total,
    page,
    pages,
    limit
})

export const companySuccess = (company) => ({
    type: COMPANY_SUCCESS,
    company
})

export function asyncGetCompanies(){
    return function(dispatch){
        dispatch(companiesRequest());
            return CompanyService.getCompanies()
                .then(response=>{
                    console.log(response.data);
                    dispatch(companiesSuccess(response.data));
                })
    }
}

export function asyncGetCompanyById(id){
    return function(dispatch){
        dispatch(companiesRequest());
        return CompanyService.getCompanyById(id)
                .then(response=>{
                    console.log(response.data);
                    dispatch(companySuccess(response.data));
                })
    }
}