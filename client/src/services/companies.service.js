import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'
import queryString from "query-string";

export const CompanyService = {
    getCompanies (queries) {
        const query = queryString.stringify(queries);
        return Axios.request({
            method: 'GET',
            url: '/companies'+ (query? "?"+query: ""),
        })
    },
    getCompanyById (id) {
       return Axios.request({
            method: 'GET',
            url: '/companies/'+id,
        })
    },
    editCompany (formData) {
        return Axios.request({
            method: 'PUT',
            url: '/companies/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    },
    deleteCompany (formData) {
        return Axios.request({
            method: 'DELETE',
            url: '/companies/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    }
}