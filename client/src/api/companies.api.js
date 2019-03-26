import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    getCompanies () {
        return Axios.request({
            method: 'GET',
            url: 'http://localhost:3000/api/companies',
        })
    },
    getCompanyById (id) {
       return Axios.request({
            method: 'GET',
            url: '/api/companies/'+id,
        })
    },
    editCompany (formData) {
        return Axios.request({
            method: 'PUT',
            url: '/api/companies/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    },
    deleteCompany (formData) {
        return Axios.request({
            method: 'DELETE',
            url: '/api/companies/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    }
}