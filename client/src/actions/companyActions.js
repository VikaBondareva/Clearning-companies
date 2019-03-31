import {
    COMPANIES_REQUEST,
    COMPANIES_SUCCESS,
    COMPANY_SUCCESS
} from './actionTypes';

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